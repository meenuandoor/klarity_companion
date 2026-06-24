import { useState } from 'react'
import Icon from '../components/Icon'
import { useApp } from '../context/AppContext'

export default function PermissionsScreen() {
  const { startSession } = useApp()
  const [step, setStep] = useState('mic')
  const [selected, setSelected] = useState(false)

  if (step === 'mic') {
    return (
      <div className="screen">
        <div className="flow">
          <div className="flow-body">
            <div className="flow-card" style={{ maxWidth: 520, textAlign: 'center' }}>
              <div className="perm-circle"><Icon name="mic" size={30} /></div>
              <h2 className="h2" style={{ marginTop: 16 }}>Enable microphone</h2>
              <p className="muted" style={{ margin: '8px 0 24px' }}>
                Companion listens for your narration so it can label what you're doing. Audio is never stored.
              </p>
              <button
                className="btn btn-primary btn-lg"
                style={{ width: '100%', maxWidth: 320, margin: '0 auto', display: 'flex' }}
                onClick={() => setStep('screen')}
              >
                <Icon name="mic" size={14} />Allow Access
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function handleTileClick() {
    setSelected(true)
    setTimeout(() => startSession(), 500)
  }

  return (
    <div className="screen">
      <div className="flow">
        <div className="flow-body">
          <div className="flow-card" style={{ maxWidth: 620, textAlign: 'center' }}>
            <div className="robot"><Icon name="monitor" size={30} /></div>
            <div style={{ marginTop: 14 }}>
              <span className="step-pill">Screen 1 of 1</span>
            </div>
            <h2 className="h2" style={{ marginTop: 10 }}>Share your screen</h2>
            <p className="muted" style={{ margin: '8px 0 20px' }}>
              Pick the screen Companion should observe. You can pause or stop sharing at any time — and PII is stripped automatically.
            </p>
            <div style={{ maxWidth: 420, margin: '0 auto' }}>
              <div className={`screen-tile${selected ? ' sel' : ''}`} onClick={handleTileClick}>
                <Icon name={selected ? 'check' : 'monitor'} size={26} />
                <span>{selected ? 'Sharing "Display 1"' : 'Click to choose a screen to share'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
