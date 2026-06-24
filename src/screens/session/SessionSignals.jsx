import Icon from '../../components/Icon'
import { useApp } from '../../context/AppContext'
import { SESSION_SIGNALS, QUICK_TAKE, colorForTag, TYPE_TIP } from '../../data/seed'

export default function SessionSignals() {
  const { sigFilter, setSigFilter, signalStatuses, submitSignal, discardSignal, toggleOpenSigSub, isSigSubOpen } = useApp()

  const active = SESSION_SIGNALS.filter(s => signalStatuses[s.id] !== 'discarded')
  const submitted = SESSION_SIGNALS.filter(s => signalStatuses[s.id] === 'shared')
  const discarded = SESSION_SIGNALS.filter(s => signalStatuses[s.id] === 'discarded')

  const list = sigFilter === 'submitted' ? submitted
    : sigFilter === 'discarded' ? discarded
    : active

  return (
    <div className="signals-page" style={{ maxWidth: 760 }}>
      <div style={{ marginBottom: 8 }}>
        <h2 style={{ fontSize: 20 }}>Signals</h2>
        <p className="muted" style={{ fontSize: 14 }}>
          In-session insights: Submitting a signal sends it to your admin — it does not add it to the Process Index.
        </p>
      </div>

      <div className="quicktake">
        <div className="qt-ico"><Icon name="sparkles" size={14} /></div>
        <div>
          <h3>Quick Take</h3>
          <p>{QUICK_TAKE}</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border)', paddingBottom: 12, marginBottom: 16 }}>
        <Icon name="filter" size={16} />
        <span style={{ fontSize: 14, fontWeight: 500 }} className="muted">Filter:</span>
        <div style={{ flex: 1 }} />
        <button className={`pill pill-gray${sigFilter === 'all' ? ' active' : ''}`} onClick={() => setSigFilter('all')}>
          All {active.length}
        </button>
        <button className={`pill pill-purple${sigFilter === 'submitted' ? ' active' : ''}`} onClick={() => setSigFilter('submitted')}>
          Submitted {submitted.length}
        </button>
        <button className={`pill pill-gray${sigFilter === 'discarded' ? ' active' : ''}`} onClick={() => setSigFilter('discarded')}>
          Discarded {discarded.length}
        </button>
      </div>

      {list.length === 0 ? (
        <div className="empty-state">
          <Icon name="pin" size={48} />
          <p>No {sigFilter} signals</p>
        </div>
      ) : (
        list.map(s => (
          <ExpandedSignal
            key={s.id}
            signal={s}
            status={signalStatuses[s.id]}
            open={isSigSubOpen(s.id)}
            onToggle={() => toggleOpenSigSub(s.id)}
            onSubmit={() => submitSignal(s.id)}
            onDiscard={() => discardSignal(s.id)}
          />
        ))
      )}
    </div>
  )
}

function ExpandedSignal({ signal, status, open, onToggle, onSubmit, onDiscard }) {
  const color = colorForTag(signal.tag)
  const shared = status === 'shared'

  return (
    <div className="sig-group">
      <div className="ts">{signal.ts}</div>
      <div className="items">
        <div className={`exp-card${shared ? ' shared' : ''}`}>
          <div className="exp-head">
            <h3 className="sig-title">{signal.title}</h3>
            <span className={`badge c-${color}`} title={TYPE_TIP[signal.tag] || ''}>{signal.tag}</span>
          </div>
          <div className="exp-body">
            <p className="sig-desc" style={open ? { WebkitLineClamp: 'initial', display: 'block' } : {}}>
              {signal.description}
            </p>
            <div style={{ display: 'flex', justifyContent: signal.tools?.length ? 'space-between' : 'flex-end', alignItems: 'center', marginTop: 8 }}>
              {signal.tools?.length > 0 && (
                <div className="sig-tools">
                  {signal.tools.map(t => <span key={t} className="badge badge-secondary">{t}</span>)}
                </div>
              )}
              <button className="see-details" onClick={onToggle}>
                {open ? 'Show less' : 'See Details'}
                <Icon name={open ? 'chevron-up' : 'chevron-down'} size={14} />
              </button>
            </div>
            {open && <DetailFields signal={signal} />}
          </div>
          {!shared && status !== 'discarded' && (
            <div className="exp-actions">
              <button className="discard" onClick={onDiscard}>
                <Icon name="x" size={16} />Discard Signal
              </button>
              <button className="submit" onClick={onSubmit}>
                <Icon name="message-square-share" size={16} />Submit to admin
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function DetailFields({ signal }) {
  return (
    <div style={{ borderTop: '1px solid var(--border)', marginTop: 12, paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {signal.whatsHappening && (
        <div>
          <h4 className="field-h"><Icon name="eye" size={14} className="icon-blue" />What's Happening</h4>
          <p style={{ fontSize: 14, margin: 0 }}>{signal.whatsHappening}</p>
        </div>
      )}
      {signal.whatStoodOut && (
        <div>
          <h4 className="field-h"><Icon name="target" size={14} className="icon-green" />What Stood Out</h4>
          <p style={{ fontSize: 14, margin: 0 }}>{signal.whatStoodOut}</p>
        </div>
      )}
      {signal.whyItMatters && (
        <div>
          <h4 className="field-h"><Icon name="lightbulb" size={14} className="icon-amber" />Why It Matters</h4>
          <p style={{ fontSize: 14, margin: 0 }}>{signal.whyItMatters}</p>
        </div>
      )}
    </div>
  )
}
