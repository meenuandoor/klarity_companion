import Icon from '../../components/Icon'
import { GUIDE } from '../../data/guide'
import { colorForTag } from '../../data/seed'

export default function GuideSessionDrawer({ onClose, onAsk }) {
  const { similar, summary, signals, artifacts } = GUIDE

  const summaryCells = [
    { label: 'Inputs', value: summary.inputs, icon: 'arrow-right' },
    { label: 'Outputs', value: summary.outputs, icon: 'check-circle-2' },
    { label: 'Duration', value: summary.duration, icon: 'clock' },
    { label: 'Wait Time', value: summary.waitTime, icon: 'pause' },
    { label: 'Rework Count', value: summary.reworkCount, icon: 'refresh-cw' },
  ]

  return (
    <>
      <div className="drawer-overlay open" onClick={onClose} />
      <aside className="drawer guide-drawer open">
        <div className="drawer-header">
          <button className="drawer-close" onClick={onClose}>
            <Icon name="x" size={18} />
          </button>
          <span className="badge c-blue">Your previous session</span>
          <h2 className="drawer-title">{similar.process}</h2>
          <div className="drawer-metarow">
            <div className="mi"><Icon name="calendar" size={16} /><span>Completed {similar.completedAgo}</span></div>
            <div className="mi"><Icon name="clock" size={16} /><span>{similar.duration}</span></div>
            <button className="btn btn-outline btn-sm" style={{ marginLeft: 'auto' }} onClick={onAsk}>
              <Icon name="sparkles" size={14} />Ask Companion
            </button>
          </div>
        </div>

        <div className="drawer-body">
          {/* Process Summary */}
          <div>
            <h4 className="field-h"><Icon name="list" size={14} className="icon-blue" />Process Summary</h4>
            <div className="guide-summary-grid">
              {summaryCells.map(c => (
                <div className="guide-summary-cell" key={c.label}>
                  <div className="gsc-label"><Icon name={c.icon} size={13} />{c.label}</div>
                  <div className="gsc-value">{c.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="drawer-sep" />

          {/* Signals Generated */}
          <div>
            <h4 className="field-h"><Icon name="zap" size={14} className="icon-amber" />Signals Generated</h4>
            <div className="guide-signal-list">
              {signals.map(s => (
                <div className="guide-signal-card" key={s.id}>
                  <div className="gsig-top">
                    <h5>{s.title}</h5>
                    <span className={`badge c-${s.color || colorForTag(s.category)}`}>{s.category}</span>
                  </div>
                  <p className="gsig-desc">{s.description}</p>
                  <div className="gsig-action">
                    <Icon name="arrow-right" size={13} className="icon-blue" />
                    <span><strong>Suggested action:</strong> {s.suggestedAction}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="drawer-sep" />

          {/* Artifacts */}
          <div>
            <h4 className="field-h"><Icon name="file-text" size={14} className="icon-green" />Artifacts</h4>
            <div className="guide-artifact-list">
              {artifacts.map(a => (
                <button className="guide-artifact" key={a.id}>
                  <span className="ga-ico"><Icon name={a.icon} size={18} /></span>
                  <span className="ga-text">
                    <span className="ga-name">{a.name}</span>
                    <span className="ga-meta">{a.meta}</span>
                  </span>
                  <span className="badge badge-secondary">{a.type}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
