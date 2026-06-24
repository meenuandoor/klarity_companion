import { useState, useEffect, useRef } from 'react'
import Icon from '../components/Icon'
import { useApp } from '../context/AppContext'
import { CAROUSEL, SESSIONS } from '../data/seed'

const STATUS_MAP = {
  COMPLETED: { cls: 'sb-completed', icon: 'check-circle-2', label: 'Completed' },
  PROCESSING: { cls: 'sb-processing', icon: 'loader-2', label: 'Processing' },
  DISCONNECTED: { cls: 'sb-paused', icon: 'pause', label: 'Paused' },
}

export default function CoachTab() {
  const { navigate, openReview } = useApp()
  const [idx, setIdx] = useState(0)
  const timerRef = useRef(null)

  function resetTimer(newIdx) {
    clearInterval(timerRef.current)
    setIdx(newIdx)
    timerRef.current = setInterval(() => {
      setIdx(i => (i + 1) % CAROUSEL.length)
    }, 6000)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIdx(i => (i + 1) % CAROUSEL.length)
    }, 6000)
    return () => clearInterval(timerRef.current)
  }, [])

  const slide = CAROUSEL[idx]

  return (
    <div className="coach-wrap">
      <div className="coach-center">
        <h1 className="h1">Start a Companion Session</h1>
      </div>

      <div className="carousel">
        <div className="carousel-card" id="cCard">
          <div className="carousel-icon">
            <Icon name={slide.icon} size={32} />
          </div>
          <h4 className="h4">{slide.headline}</h4>
          <p className="muted" style={{ fontSize: 14, lineHeight: 1.45 }}>{slide.body}</p>
        </div>
        <div className="carousel-dots">
          {CAROUSEL.map((_, i) => (
            <button
              key={i}
              className={`dot${i === idx ? ' active' : ''}`}
              onClick={() => resetTimer(i)}
            />
          ))}
        </div>
      </div>

      <div className="start-row">
        <button className="btn-start" onClick={() => navigate('permissions')}>
          <Icon name="bot-message-square" size={18} />Start a Session
        </button>
      </div>

      <div className="intro-link">
        <button onClick={() => navigate('onboarding')}>
          <Icon name="info" size={14} />A video to understand how Companion works
        </button>
      </div>

      <div className="recent">
        <div className="recent-sep" />
        <div className="recent-head">
          <h4 className="h4">Your Recent Sessions</h4>
          <Icon name="lock" size={16} />
        </div>
        <div className="sessions-grid">
          {SESSIONS.map(s => <SessionCard key={s.id} session={s} onOpen={openReview} />)}
        </div>
      </div>

      <div className="test-setup">
        <button onClick={() => navigate('permissions')}>
          <Icon name="stethoscope" size={14} />Something off? Test your setup
        </button>
      </div>
    </div>
  )
}

function SessionCard({ session, onOpen }) {
  const B = STATUS_MAP[session.status] || STATUS_MAP.DISCONNECTED

  return (
    <div className="session-card" onClick={() => onOpen(session.id)}>
      <div className="sc-top">
        <Icon name="bot-message-square" size={28} />
        <span className={`status-badge ${B.cls}`}>
          <Icon name={B.icon} size={14} /><span>{B.label}</span>
        </span>
      </div>
      <div className="sc-date">{session.date}</div>
      <div className="sc-meta">Started: {session.start}, Duration: {session.duration}</div>
      <div className="sc-contrib">
        {session.status === 'COMPLETED' && session.contributions === 'link' && (
          <button className="btn-link" style={{ fontSize: 12 }}>View process contributions</button>
        )}
      </div>
      <div className="sc-divider" />
      <div className="sc-signals">{session.shared} of {session.total} signals submitted</div>
    </div>
  )
}
