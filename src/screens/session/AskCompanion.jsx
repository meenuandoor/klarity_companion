import { useState, useEffect, useRef } from 'react'
import Icon from '../../components/Icon'
import { GUIDE } from '../../data/guide'

function answerFor(question) {
  return GUIDE.answers[question] || GUIDE.fallback
}

// Renders a Companion answer (lead + optional bullets + optional recommended action)
function BotAnswer({ answer }) {
  return (
    <div className="ask-answer">
      <p>{answer.lead}</p>
      {answer.bullets?.length > 0 && (
        <>
          {answer.foundLabel && <p className="ask-found">{answer.foundLabel}</p>}
          <ul>
            {answer.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </>
      )}
      {answer.recommended && (
        <div className="ask-rec">
          <Icon name="arrow-right" size={14} />
          <div>
            <div className="ask-rec-label">Recommended action</div>
            <div>{answer.recommended}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AskCompanion({ initialQuestion, onClose }) {
  const { similar } = GUIDE
  // Seed the clicked question as the opening user message via initial state so
  // it can never double-append (React StrictMode invokes effects twice in dev).
  const [messages, setMessages] = useState(() =>
    initialQuestion ? [{ role: 'user', text: initialQuestion }] : []
  )
  const [typing, setTyping] = useState(() => !!initialQuestion)
  const [draft, setDraft] = useState('')
  const bodyRef = useRef(null)

  function send(question) {
    const q = question.trim()
    if (!q || typing) return
    setDraft('')
    setMessages(m => [...m, { role: 'user', text: q }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(m => [...m, { role: 'bot', answer: answerFor(q) }])
    }, 750)
  }

  // Reply to the seeded question. The effect is idempotent under StrictMode:
  // the first run's timer is cleared before the second run reschedules it.
  useEffect(() => {
    if (!initialQuestion) return
    const t = setTimeout(() => {
      setTyping(false)
      setMessages(m => [...m, { role: 'bot', answer: answerFor(initialQuestion) }])
    }, 750)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep scrolled to the latest message.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, typing])

  return (
    <>
      <div className="drawer-overlay open" onClick={onClose} />
      <aside className="drawer ask-chat open">
        <div className="drawer-header">
          <button className="drawer-close" onClick={onClose}>
            <Icon name="x" size={18} />
          </button>
          <div className="ask-head-title">
            <span className="coach-ico"><Icon name="bot-message-square" size={16} /></span>
            <div>
              <div className="ask-head-name">Ask Companion</div>
              <div className="ask-head-sub muted">
                {similar.process} · {similar.completedAgo}
              </div>
            </div>
          </div>
        </div>

        <div className="ask-body" ref={bodyRef}>
          <div className="ask-trust">
            <Icon name="lock" size={13} />
            Answers come only from your previous work.
          </div>

          {messages.map((m, i) =>
            m.role === 'user' ? (
              <div key={i} className="ask-msg user">{m.text}</div>
            ) : (
              <div key={i} className="ask-msg bot">
                <div className="ask-msg-ico"><Icon name="sparkles" size={13} /></div>
                <BotAnswer answer={m.answer} />
              </div>
            )
          )}

          {typing && (
            <div className="ask-msg bot">
              <div className="ask-msg-ico"><Icon name="sparkles" size={13} /></div>
              <div className="ask-typing"><span /><span /><span /></div>
            </div>
          )}
        </div>

        <div className="ask-suggest">
          {GUIDE.quickQuestions.map(q => (
            <button key={q} className="guide-qq" onClick={() => send(q)} disabled={typing}>
              {q}
            </button>
          ))}
        </div>

        <form
          className="ask-input-row"
          onSubmit={e => { e.preventDefault(); send(draft) }}
        >
          <div className="ask-input">
            <Icon name="sparkles" size={16} />
            <input
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder="Ask about your previous work…"
              autoFocus
            />
          </div>
          <button type="submit" className="ctrl ctrl-indigo" title="Send" disabled={!draft.trim() || typing}>
            <Icon name="send" size={16} />
          </button>
        </form>
      </aside>
    </>
  )
}
