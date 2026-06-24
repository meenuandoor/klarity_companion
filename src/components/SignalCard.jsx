import Icon from './Icon'
import { useApp } from '../context/AppContext'
import { colorForTag, TYPE_TIP } from '../data/seed'

export default function SignalCard({ signal, isTeam = false }) {
  const { signalStatuses, openDrawer } = useApp()
  const status = signalStatuses[signal.id]
  const submitted = status === 'shared'
  const color = colorForTag(signal.tag)

  const meta = [signal.sessionDate]
  if (submitted) meta.push('• Submitted to admin')
  if (isTeam && signal.pinnedBy) meta.push(`• Saved by ${signal.pinnedBy}`)

  return (
    <div className="sig-card" onClick={() => openDrawer(signal.id, isTeam)}>
      <div className="sig-card-top">
        <span className={`badge c-${color}`} title={TYPE_TIP[signal.tag] || ''}>{signal.tag}</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {submitted && (
            <button className="more-btn" style={{ color: '#9333ea' }} onClick={e => e.stopPropagation()}>
              <Icon name="message-square-share" size={16} />
            </button>
          )}
          <button className="more-btn" onClick={e => e.stopPropagation()}>
            <Icon name="more-vertical" size={16} />
          </button>
        </div>
      </div>
      <h3 className="sig-title">{signal.title}</h3>
      <p className="sig-desc">{signal.description}</p>
      <div className="sig-meta">
        {meta.map((m, i) => (
          <span key={i} className={m.includes('Submitted') ? 'submitted' : undefined}>{m}</span>
        ))}
      </div>
      {signal.tools?.length > 0 && (
        <div className="sig-tools">
          {signal.tools.map(t => <span key={t} className="badge badge-secondary">{t}</span>)}
        </div>
      )}
    </div>
  )
}
