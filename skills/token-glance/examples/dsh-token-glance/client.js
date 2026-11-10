/**
 * Token Glance — a Conversation View beside Chat and Trajectory.
 *
 * It reads the current session through the slot's standard `useSession`
 * selector hook (SessionSnapshot) and renders: lifecycle chips, key metrics,
 * the pending-submission queue, and the latest session errors.
 *
 * Everything is plain React + theme tokens; no Harness Client package is
 * imported, so a shape change degrades the panel instead of blanking the slot
 * (the local error boundary keeps the rest of the session usable).
 */
window.__ModuleLoader__.load({
  id: '@local/dsh-token-glance',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const NS = 'dsh-token-glance';
    const VIEW_ID = 'overview';

    const DICTS = {
      en: {
        'view.label': 'Overview',
        'view.title': 'Token Glance',
        'view.subtitle': 'Live state of this session, read from the session binding.',
        'status.running': 'Running',
        'status.idle': 'Idle',
        'status.blank': 'Blank',
        'status.awaiting': 'Awaiting first turn',
        'status.removed': 'Removed',
        'status.older': 'Older pages',
        'status.loadingOlder': 'Loading older',
        'status.subagent': 'Subagent',
        'metric.open': 'Open state',
        'metric.runningFor': 'Running for',
        'metric.pending': 'Pending submissions',
        'metric.window': 'Loaded window',
        'window.older': 'Older pages available',
        'window.latest': 'Latest page only',
        'section.pending': 'Pending submissions',
        'section.issues': 'Issues',
        'pending.empty': 'Nothing is queued or steering in this session.',
        'pending.queued': 'Queued',
        'pending.steering': 'Steering',
        'pending.transcript': 'Sending',
        'pending.attachments': 'attachments',
        'issue.open': 'Open error',
        'issue.prompt': 'Prompt error',
        'issue.agent': 'Last agent error',
        'action.copyId': 'Copy session id',
        'action.copyJson': 'Copy diagnostics',
        'action.copied': 'Copied',
        'action.failed': 'Copy failed',
        'crash': 'The session overview could not read this session.',
      },
      zh: {
        'view.label': '概览',
        'view.title': '会话概览',
        'view.subtitle': '当前会话的实时状态，数据取自会话绑定。',
        'status.running': '运行中',
        'status.idle': '空闲',
        'status.blank': '空白会话',
        'status.awaiting': '等待首轮',
        'status.removed': '已移除',
        'status.older': '有更早分页',
        'status.loadingOlder': '正在加载更早分页',
        'status.subagent': '子代理',
        'metric.open': '装载状态',
        'metric.runningFor': '已运行',
        'metric.pending': '待处理提交',
        'metric.window': '已载入窗口',
        'window.older': '仍有更早分页',
        'window.latest': '仅最新分页',
        'section.pending': '待处理提交',
        'section.issues': '异常',
        'pending.empty': '当前会话没有排队或引导中的提交。',
        'pending.queued': '排队',
        'pending.steering': '引导',
        'pending.transcript': '发送中',
        'pending.attachments': '个附件',
        'issue.open': '打开错误',
        'issue.prompt': '提交错误',
        'issue.agent': '最近一次模型错误',
        'action.copyId': '复制会话 ID',
        'action.copyJson': '复制诊断信息',
        'action.copied': '已复制',
        'action.failed': '复制失败',
        'crash': '会话概览无法读取当前会话。',
      },
    };

    const TONES = {
      success: 'var(--dsw-alias-state-success-primary)',
      warn: 'var(--dsw-alias-state-warn-primary)',
      error: 'var(--dsw-alias-state-error-primary)',
      idle: 'var(--dsw-alias-state-idle-primary)',
      brand: 'var(--dsw-alias-brand-primary)',
    };

    const STYLE = {
      root: {
        boxSizing: 'border-box',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '28px 24px 40px',
        background: 'var(--dsw-alias-bg-base)',
        color: 'var(--dsw-alias-label-primary)',
      },
      column: {
        width: '100%',
        maxWidth: '840px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      },
      title: {
        margin: 0,
        fontSize: '18px',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      subtitle: {
        margin: '4px 0 0',
        fontSize: '12px',
        lineHeight: 1.5,
        color: 'var(--dsw-alias-label-secondary)',
      },
      card: {
        border: '1px solid var(--dsw-alias-border-l1)',
        background: 'var(--dsw-alias-bg-layer-1)',
        borderRadius: '12px',
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      },
      sectionTitle: {
        margin: 0,
        fontSize: '13px',
        fontWeight: 600,
        color: 'var(--dsw-alias-label-primary)',
      },
      chipRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
      },
      chip: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        border: '1px solid var(--dsw-alias-border-l1)',
        borderRadius: '999px',
        padding: '3px 10px',
        fontSize: '12px',
        lineHeight: 1.6,
        color: 'var(--dsw-alias-label-secondary)',
        background: 'var(--dsw-alias-bg-layer-2)',
      },
      dot: {
        width: '6px',
        height: '6px',
        borderRadius: '999px',
        flex: 'none',
      },
      idRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap',
      },
      idText: {
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
        fontSize: '12px',
        lineHeight: 1.6,
        color: 'var(--dsw-alias-label-secondary)',
        background: 'var(--dsw-alias-bg-layer-2)',
        border: '1px solid var(--dsw-alias-border-l1)',
        borderRadius: '8px',
        padding: '4px 10px',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      metricRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '12px',
      },
      metric: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        minWidth: 0,
      },
      metricLabel: {
        fontSize: '11px',
        lineHeight: 1.5,
        color: 'var(--dsw-alias-label-secondary)',
      },
      metricValue: {
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: 1.5,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      button: {
        appearance: 'none',
        border: '1px solid var(--dsw-alias-border-l2)',
        background: 'transparent',
        color: 'var(--dsw-alias-label-secondary)',
        borderRadius: '8px',
        padding: '3px 10px',
        fontSize: '12px',
        lineHeight: 1.7,
        cursor: 'pointer',
        flex: 'none',
      },
      empty: {
        margin: 0,
        fontSize: '12px',
        lineHeight: 1.6,
        color: 'var(--dsw-alias-label-secondary)',
      },
      pendingList: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
      },
      pendingRow: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '10px 0',
        borderTop: '1px solid var(--dsw-alias-border-l1)',
      },
      pendingMeta: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '11px',
        color: 'var(--dsw-alias-label-secondary)',
      },
      pendingText: {
        fontSize: '13px',
        lineHeight: 1.6,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      issueRow: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
      },
      issueLabel: {
        fontSize: '11px',
        lineHeight: 1.5,
        color: 'var(--dsw-alias-label-secondary)',
      },
      issueText: {
        fontSize: '12px',
        lineHeight: 1.6,
        color: 'var(--dsw-alias-state-error-primary)',
        wordBreak: 'break-word',
      },
      crash: {
        padding: '28px 24px',
        fontSize: '13px',
        color: 'var(--dsw-alias-state-warn-primary)',
      },
    };

    const PLACEMENT_LABELS = {
      queued: 'pending.queued',
      steering: 'pending.steering',
      transcript: 'pending.transcript',
    };

    function selectSnapshot(snapshot) {
      return snapshot;
    }

    function formatDuration(ms) {
      if (!Number.isFinite(ms) || ms < 0) return '0s';
      const total = Math.floor(ms / 1000);
      const hours = Math.floor(total / 3600);
      const minutes = Math.floor((total % 3600) / 60);
      const seconds = total % 60;
      if (hours > 0) return hours + 'h ' + minutes + 'm';
      if (minutes > 0) return minutes + 'm ' + seconds + 's';
      return seconds + 's';
    }

    function formatClock(time) {
      if (!Number.isFinite(time)) return '';
      try {
        const date = new Date(time);
        if (Number.isNaN(date.getTime())) return '';
        return date.toLocaleTimeString();
      } catch {
        return '';
      }
    }

    function errorText(value) {
      if (value === null || value === undefined) return '';
      if (typeof value === 'string') return value;
      if (typeof value === 'object') {
        const message = typeof value.message === 'string' ? value.message : '';
        const code = typeof value.code === 'string' ? value.code : '';
        if (message) return code ? code + ': ' + message : message;
        try {
          return JSON.stringify(value);
        } catch {
          return String(value);
        }
      }
      return String(value);
    }

    function Chip(props) {
      return h(
        'span',
        { style: STYLE.chip },
        h('span', { style: Object.assign({}, STYLE.dot, { background: TONES[props.tone] || TONES.idle }) }),
        props.label,
      );
    }

    function Metric(props) {
      return h(
        'div',
        { style: STYLE.metric },
        h('span', { style: STYLE.metricLabel }, props.label),
        h('span', { style: STYLE.metricValue, title: typeof props.title === 'string' ? props.title : undefined }, props.value),
      );
    }

    class ViewBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { failed: false };
      }

      static getDerivedStateFromError() {
        return { failed: true };
      }

      render() {
        if (this.state.failed) return h('div', { style: STYLE.crash }, this.props.message);
        return this.props.children;
      }
    }

    function SessionOverview(props) {
      const t = props.t;
      const useSession = props.useSession;
      const snapshot = typeof useSession === 'function' ? useSession(selectSnapshot) : null;
      const safe = snapshot && typeof snapshot === 'object' ? snapshot : {};

      const running = safe.running === true;
      const blank = safe.blank === true;
      const removed = safe.removed === true;
      const awaiting = safe.awaitingFirstTurn === true;
      const hasMore = safe.hasMore === true;
      const loadingOlder = safe.loadingOlder === true;
      const openState = typeof safe.openState === 'string' ? safe.openState : 'unknown';
      const pending = Array.isArray(safe.pendingSubmissions) ? safe.pendingSubmissions : [];
      const subagent = safe.subagent && typeof safe.subagent === 'object' ? safe.subagent : null;

      const copiedState = React.useState('');
      const copied = copiedState[0];
      const setCopied = copiedState[1];
      React.useEffect(() => {
        if (!copied) return undefined;
        const id = window.setTimeout(() => setCopied(''), 1600);
        return () => window.clearTimeout(id);
      }, [copied]);

      const since = React.useRef(null);
      const tickState = React.useState(0);
      const setTick = tickState[1];
      React.useEffect(() => {
        if (!running) {
          since.current = null;
          return undefined;
        }
        if (since.current === null) since.current = Date.now();
        const id = window.setInterval(() => setTick((value) => value + 1), 1000);
        return () => window.clearInterval(id);
      }, [running]);

      const copy = (kind, text) => {
        try {
          if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
            setCopied('failed');
            return;
          }
          navigator.clipboard.writeText(text).then(
            () => setCopied(kind),
            () => setCopied('failed'),
          );
        } catch {
          setCopied('failed');
        }
      };

      const chips = [
        running
          ? { key: 'run', label: t('status.running'), tone: 'success' }
          : { key: 'run', label: t('status.idle'), tone: 'idle' },
      ];
      if (blank) chips.push({ key: 'blank', label: t('status.blank'), tone: 'idle' });
      if (awaiting) chips.push({ key: 'await', label: t('status.awaiting'), tone: 'warn' });
      if (removed) chips.push({ key: 'removed', label: t('status.removed'), tone: 'error' });
      if (subagent) chips.push({ key: 'subagent', label: t('status.subagent'), tone: 'brand' });
      if (loadingOlder) chips.push({ key: 'loading', label: t('status.loadingOlder'), tone: 'brand' });
      else if (hasMore) chips.push({ key: 'older', label: t('status.older'), tone: 'idle' });

      const metrics = [{ key: 'open', label: t('metric.open'), value: openState }];
      if (running && since.current !== null) {
        metrics.push({ key: 'runningFor', label: t('metric.runningFor'), value: formatDuration(Date.now() - since.current) });
      }
      metrics.push({ key: 'pending', label: t('metric.pending'), value: String(pending.length) });
      metrics.push({
        key: 'window',
        label: t('metric.window'),
        value: hasMore ? t('window.older') : t('window.latest'),
        title: hasMore ? t('window.older') : t('window.latest'),
      });

      const issues = [];
      if (safe.openError) issues.push({ key: 'open', label: t('issue.open'), text: errorText(safe.openError) });
      if (safe.promptError) {
        const promptError = safe.promptError;
        const op = promptError && typeof promptError.op === 'string' ? '[' + promptError.op + '] ' : '';
        issues.push({ key: 'prompt', label: t('issue.prompt'), text: op + errorText(promptError ? promptError.error : undefined) });
      }
      if (typeof safe.lastAgentError === 'string' && safe.lastAgentError) {
        issues.push({ key: 'agent', label: t('issue.agent'), text: safe.lastAgentError });
      }

      const diagnostics = () => {
        try {
          return JSON.stringify({ sessionId: props.sessionId, snapshot: safe }, null, 2);
        } catch {
          return JSON.stringify({ sessionId: props.sessionId, keys: Object.keys(safe) }, null, 2);
        }
      };

      const copyLabel = (kind, idleKey) => (copied === kind ? t('action.copied') : copied === 'failed' ? t('action.failed') : t(idleKey));

      const pendingNodes = pending.map((item, index) => {
        const entry = item && typeof item === 'object' ? item : {};
        const text = typeof entry.text === 'string' ? entry.text : '';
        const placement = PLACEMENT_LABELS[entry.placement] || 'pending.queued';
        const attachments = Array.isArray(entry.attachments) ? entry.attachments.length : 0;
        const clock = formatClock(entry.time);
        return h(
          'li',
          { key: String(entry.requestId || index), style: Object.assign({}, STYLE.pendingRow, index === 0 ? { borderTop: 'none' } : null) },
          h(
            'div',
            { style: STYLE.pendingMeta },
            h('span', null, t(placement)),
            clock ? h('span', null, clock) : null,
            attachments > 0 ? h('span', null, attachments + ' ' + t('pending.attachments')) : null,
          ),
          h(
            'div',
            { style: STYLE.pendingText, title: text },
            text || h('span', { style: { color: 'var(--dsw-alias-label-secondary)' } }, '—'),
          ),
        );
      });

      return h(
        'div',
        { style: STYLE.root },
        h(
          'div',
          { style: STYLE.column },
          h(
            'header',
            null,
            h('h1', { style: STYLE.title }, t('view.title')),
            h('p', { style: STYLE.subtitle }, t('view.subtitle')),
          ),
          h(
            'section',
            { style: STYLE.card },
            h('div', { style: STYLE.chipRow }, chips.map((chip) => h(Chip, { key: chip.key, label: chip.label, tone: chip.tone }))),
            h(
              'div',
              { style: STYLE.idRow },
              h('code', { style: STYLE.idText }, String(props.sessionId || '—')),
              h('button', { type: 'button', style: STYLE.button, onClick: () => copy('id', String(props.sessionId || '')) }, copyLabel('id', 'action.copyId')),
            ),
            h('div', { style: STYLE.metricRow }, metrics.map((metric) => h(Metric, { key: metric.key, label: metric.label, value: metric.value, title: metric.title }))),
          ),
          h(
            'section',
            { style: STYLE.card },
            h('h2', { style: STYLE.sectionTitle }, t('section.pending')),
            pending.length === 0
              ? h('p', { style: STYLE.empty }, t('pending.empty'))
              : h('ul', { style: STYLE.pendingList }, pendingNodes),
          ),
          issues.length === 0
            ? null
            : h(
                'section',
                { style: STYLE.card },
                h('h2', { style: STYLE.sectionTitle }, t('section.issues')),
                issues.map((issue) =>
                  h(
                    'div',
                    { key: issue.key, style: STYLE.issueRow },
                    h('span', { style: STYLE.issueLabel }, issue.label),
                    h('span', { style: STYLE.issueText }, issue.text),
                  ),
                ),
              ),
          h(
            'footer',
            { style: { display: 'flex', justifyContent: 'flex-end' } },
            h('button', { type: 'button', style: STYLE.button, onClick: () => copy('json', diagnostics()) }, copyLabel('json', 'action.copyJson')),
          ),
        ),
      );
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        const t = ctx.locale.bind(NS);
        ctx.effect(() => {
          const disposers = Object.keys(DICTS).map((locale) => ctx.locale.register(NS, locale, DICTS[locale]));
          return () => {
            for (const dispose of disposers) dispose();
          };
        });
        ctx.slots.inject('conversation.view', () =>
          ctx.slots.register(
            { name: 'conversation.view', id: VIEW_ID, order: 20, label: () => t('view.label') },
            (props) => h(ViewBoundary, { message: t('crash') }, h(SessionOverview, Object.assign({}, props, { t }))),
          ),
        );
      },
    };
  },
});
