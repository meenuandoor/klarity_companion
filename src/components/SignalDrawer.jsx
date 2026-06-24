import Icon from './Icon'
import { useApp } from '../context/AppContext'
import { ALL_SIGNALS, colorForTag } from '../data/seed'

export default function SignalDrawer() {
  const { drawerSignalId, drawerIsTeam, closeDrawer, signalStatuses, submitSignal, discardSignal, unsubmitSignal } = useApp()

  if (!drawerSignalId) return null

  const signal = ALL_SIGNALS.find(s => s.id === drawerSignalId)
  if (!signal) return null

  const color = colorForTag(signal.tag)
  const status = signalStatuses[drawerSignalId]
  const ownInTeam = drawerIsTeam && signal.pinnedBy === 'Sarah Chen'
  const canModify = !drawerIsTeam || ownInTeam

  return (
    <>
      <div className="drawer-overlay open" onClick={closeDrawer} />
      <aside className="drawer open" id="signalDrawer">
        <div className="drawer-header">
          <button className="drawer-close" onClick={closeDrawer}>
            <Icon name="x" size={18} />
          </button>
          <span className={`badge c-${color}`}>{signal.tag}</span>
          <h2 className="drawer-title">{signal.title}</h2>
          <div className="drawer-metarow">
            {signal.sessionDate && (
              <div className="mi"><Icon name="calendar" size={16} /><span>{signal.sessionDate}</span></div>
            )}
            {signal.timestamp && (
              <div className="mi"><Icon name="clock" size={16} /><span>{signal.timestamp}</span></div>
            )}
            {signal.duration && <span>Duration: {signal.duration}</span>}
            <button className="btn btn-outline btn-sm" style={{ marginLeft: 'auto' }}>
              Send signal <Icon name="send" size={14} />
            </button>
          </div>
        </div>

        <div className="drawer-body">
          <div>
            <h4>Description</h4>
            <p>{signal.description}</p>
          </div>
          <div className="drawer-sep" />
          {signal.whyThisMatters && (
            <div>
              <h4 className="field-h"><Icon name="lightbulb" size={14} className="icon-amber" />Why This Matters</h4>
              <p>{signal.whyThisMatters}</p>
            </div>
          )}
          {signal.suggestedAction && (
            <div>
              <h4 className="field-h"><Icon name="arrow-right" size={14} className="icon-blue" />Suggested Action</h4>
              <p>{signal.suggestedAction}</p>
            </div>
          )}
          {signal.tools?.length > 0 && (
            <>
              <div className="drawer-sep" />
              <div>
                <h4>Tools Used</h4>
                <div className="sig-tools">
                  {signal.tools.map(t => <span key={t} className="badge badge-secondary">{t}</span>)}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="drawer-footer">
          <button className="btn btn-outline">
            <Icon name="external-link" size={14} />Go to Session
          </button>
          {status === 'shared' ? (
            <button
              className="btn btn-purple"
              onClick={() => unsubmitSignal(drawerSignalId)}
              disabled={!canModify}
              title={!canModify ? 'You can only unsubmit your own signals' : undefined}
            >
              <Icon name="message-square-share" size={14} />Unsubmit
            </button>
          ) : canModify ? (
            <>
              <button className="btn btn-purple" onClick={() => submitSignal(drawerSignalId)}>
                <Icon name="message-square-share" size={14} />Submit to admin
              </button>
              <button className="btn btn-destructive" onClick={() => discardSignal(drawerSignalId)}>
                <Icon name="trash-2" size={14} />Discard signal
              </button>
            </>
          ) : null}
        </div>
      </aside>
    </>
  )
}
