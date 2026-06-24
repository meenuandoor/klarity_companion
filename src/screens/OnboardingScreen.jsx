import { useState, useEffect, useRef } from 'react'
import Icon from '../components/Icon'
import { useApp } from '../context/AppContext'
import { CAROUSEL } from '../data/seed'

export default function OnboardingScreen() {
  const { navigate } = useApp()
  const [step, setStep] = useState('video')
  const [playing, setPlaying] = useState(false)
  const [carouselIdx, setCarouselIdx] = useState(0)
  const timerRef = useRef(null)

  // Only run carousel auto-advance on the role step (shown during video step as bg)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCarouselIdx(i => (i + 1) % CAROUSEL.length)
    }, 6000)
    return () => clearInterval(timerRef.current)
  }, [])

  if (step === 'video') {
    return (
      <div className="screen">
        <div className="page-head">
          <div className="page-head-row">
            <div className="page-title">
              <span className="coach-ico"><Icon name="bot-message-square" size={16} /></span>
              Companion
            </div>
          </div>
        </div>
        <div className="flow">
          <div className="flow-body">
            <div className="flow-card" style={{ maxWidth: 900 }}>
              <h1 className="h1" style={{ textAlign: 'center' }}>Welcome to Companion</h1>
              <p className="muted" style={{ textAlign: 'center', margin: '8px 0 24px' }}>
                Watch this quick video to understand how Companion works.
              </p>
              <div className="video-card">
                <div className="video-frame">
                  <div className="play" onClick={() => setPlaying(p => !p)}>
                    <Icon name={playing ? 'pause' : 'play'} size={30} />
                  </div>
                  <span className="vlabel">How Companion works · 1:42</span>
                </div>
                <div className="flow-actions">
                  <button className="btn btn-outline btn-lg" onClick={() => setStep('role')}>
                    Skip video
                  </button>
                  <button className="btn btn-primary btn-lg" onClick={() => setStep('role')}>
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="page-head">
        <div className="page-head-row">
          <div className="page-title">
            <span className="coach-ico"><Icon name="bot-message-square" size={16} /></span>
            Companion
          </div>
        </div>
      </div>
      <div className="flow">
        <div className="flow-body">
          <div className="flow-card">
            <div className="robot"><Icon name="bot" size={30} /></div>
            <h1 className="h1" style={{ textAlign: 'center', marginTop: 16 }}>Set Up Your Role</h1>
            <p className="muted" style={{ textAlign: 'center' }}>
              This is a one-time setup. Tell us about your role so Companion can personalize your experience.
            </p>
            <p className="muted" style={{ textAlign: 'center', fontSize: 12, marginTop: 2 }}>
              Your profile is saved to the Context Store and used across all future sessions.
            </p>
            <div className="video-card" style={{ marginTop: 20 }}>
              <div className="role-grid">
                <div className="field">
                  <label>Your role</label>
                  <input defaultValue="Senior AP Accountant" placeholder="Eg: Senior AP Accountant" />
                </div>
                <div className="field">
                  <label>Your responsibilities</label>
                  <textarea defaultValue="I work in the Accounting department keeping accurate financial records and ensuring compliance. On a regular day I prepare and post journal entries, reconcile accounts, process invoices, and review expense reports." />
                </div>
              </div>
              <div className="privacy-alert">
                <Icon name="info" size={18} />
                <div>
                  <div className="pa-title">Your Privacy</div>
                  <p>This information is used only for personalizing your companion session and remains confidential only to you.</p>
                </div>
              </div>
            </div>
            <div className="flow-actions" style={{ marginTop: 16 }}>
              <button className="btn btn-outline btn-lg" onClick={() => setStep('video')}>Back</button>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('permissions')}>Save Context</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
