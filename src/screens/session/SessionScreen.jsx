import Icon from '../../components/Icon'
import { useApp } from '../../context/AppContext'
import ControlsBar from './ControlsBar'
import ActivityTimeline from './ActivityTimeline'
import CompanionReport from './CompanionReport'
import SessionSignals from './SessionSignals'
import CompanionGuide from './CompanionGuide'

function fmt(sec) {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  const mm = String(m).padStart(2, '0')
  const ss = String(s).padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}

function StatusPill({ sessionMode, paused, elapsed }) {
  if (sessionMode === 'completed') {
    return <span className="tabular-nums">Session length: {fmt(elapsed)}</span>
  }
  if (paused) {
    return <span>Session Paused · {fmt(elapsed)}</span>
  }
  const next = Math.max(0, 45 - (elapsed % 45))
  return (
    <>
      <span className="countdown">{next}s till next activities</span>
      <span style={{ color: '#cbd5e1' }}>•</span>
      <span className="live-dot" />
      <span className="tabular-nums">Session In Progress: {fmt(elapsed)}</span>
    </>
  )
}

export default function SessionScreen() {
  const { navigate, sessionMode, sessionTab, setSessionTab, paused, elapsed, endSession } = useApp()
  const completed = sessionMode === 'completed'

  const tabs = completed
    ? [
        { key: 'timeline', label: 'Activity Timeline', disabled: false },
        { key: 'report', label: 'Companion Report', disabled: false },
        { key: 'pa', label: 'Process Alignment Report', disabled: true },
      ]
    : [
        { key: 'timeline', label: 'Activity Timeline', disabled: false },
        { key: 'signals', label: 'Signals', disabled: false },
      ]

  return (
    <div className="screen">
      <div className="sess-head">
        <div className="sess-head-left">
          <div className="icon-box" title="Back to Companion" onClick={() => navigate('home')}>
            <Icon name="arrow-left" size={18} />
          </div>
          <div className="icon-box coach">
            <Icon name="bot-message-square" size={18} />
          </div>
          <span style={{ fontWeight: 600 }}>Companion</span>
        </div>

        <div className="sess-tabs">
          {tabs.map(({ key, label, disabled }) => (
            <button
              key={key}
              className={`sess-tab${sessionTab === key ? ' active' : ''}`}
              disabled={disabled}
              onClick={() => !disabled && setSessionTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="status-pill" id="statusPill">
          <StatusPill sessionMode={sessionMode} paused={paused} elapsed={elapsed} />
        </div>
      </div>

      <div className="sess-body">
        <div className="sess-main">
          <div className="sess-tabcontent">
            {sessionTab === 'timeline' && <ActivityTimeline />}
            {sessionTab === 'report' && <CompanionReport />}
            {sessionTab === 'signals' && !completed && <SessionSignals />}
          </div>
          {!completed && <ControlsBar />}
        </div>
        {!completed && <CompanionGuide />}
      </div>
    </div>
  )
}
