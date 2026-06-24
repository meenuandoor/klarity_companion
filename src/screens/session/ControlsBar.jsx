import Icon from '../../components/Icon'
import { useApp } from '../../context/AppContext'

export default function ControlsBar() {
  const { paused, setPaused, muted, setMuted, endSession } = useApp()

  return (
    <div className="controls-bar">
      {(paused || muted) && (
        <div className="banner">
          <Icon name="info" size={16} />
          {paused ? (
            <>
              <span className="grow"><strong>Session paused</strong> — Hit Resume to continue.</span>
              <button className="btn btn-outline btn-sm" onClick={() => setPaused(false)}>Resume</button>
            </>
          ) : (
            <span className="grow">
              <strong>Mic muted</strong> — Unmute so <span className="banner-blue">Companion</span> can capture your workflow.
            </span>
          )}
        </div>
      )}
      <div className="ask-input">
        <Icon name="sparkles" size={16} />
        <input
          placeholder="Ask Companion anything about what you're doing…"
          disabled={paused}
        />
      </div>
      <div className="ctrl ctrl-reshare" title="Select new screen to share">
        <Icon name="screen-share" size={16} />
      </div>
      <div
        className={`ctrl ${muted ? 'ctrl-orange' : 'ctrl-indigo'}`}
        title={muted ? 'Unmute Mic' : 'Mute Mic'}
        onClick={() => setMuted(m => !m)}
      >
        <Icon name={muted ? 'mic-off' : 'mic'} size={16} />
      </div>
      <div
        className={`ctrl ${paused ? 'ctrl-green' : 'ctrl-indigo'}`}
        title={paused ? 'Resume' : 'Pause'}
        onClick={() => setPaused(p => !p)}
      >
        <Icon name={paused ? 'play' : 'pause'} size={16} />
      </div>
      <div className="ctrl ctrl-stop" title="End Session" onClick={endSession}>
        <Icon name="square" size={16} />
      </div>
    </div>
  )
}
