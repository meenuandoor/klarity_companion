import { useState, useEffect } from 'react'
import Icon from '../../components/Icon'
import { GUIDE } from '../../data/guide'
import GuideSessionDrawer from './GuideSessionDrawer'
import AskCompanion from './AskCompanion'

export default function CompanionGuide() {
  // Panel mounts collapsed, then "detects" the repeat process and slides in.
  const [open, setOpen] = useState(false)
  const [overlay, setOverlay] = useState(null) // 'view' | 'ask' | null
  const [askSeed, setAskSeed] = useState(null)
  const [empty, setEmpty] = useState(false) // demo toggle for the empty state

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 1400)
    return () => clearTimeout(t)
  }, [])

  function openAsk(question) {
    setAskSeed(question || null)
    setOverlay('ask')
  }

  const { similar, lessons, quickQuestions } = GUIDE

  return (
    <>
      {/* Collapsed rail — lets the user reopen the Guide */}
      {!open && (
        <button className="guide-rail" onClick={() => setOpen(true)} title="Open Companion Guide">
          <span className="guide-rail-ico"><Icon name="book-open" size={16} /></span>
          <span className="guide-rail-label">Companion Guide</span>
        </button>
      )}

      <aside className={`guide-panel${open ? ' open' : ''}`}>
        <div className="guide-head">
          <div className="guide-head-title">
            <span className="coach-ico"><Icon name="book-open" size={16} /></span>
            <div>
              <div className="guide-head-name">Companion Guide</div>
              <div className="guide-head-sub">Lessons From Last Time</div>
            </div>
          </div>
          <div className="guide-head-actions">
            <button
              className="guide-icon-btn"
              title={empty ? 'Show example' : 'Show empty state'}
              onClick={() => setEmpty(e => !e)}
            >
              <Icon name={empty ? 'eye' : 'eye-off'} size={15} />
            </button>
            <button className="guide-icon-btn" title="Collapse" onClick={() => setOpen(false)}>
              <Icon name="chevron-right" size={16} />
            </button>
          </div>
        </div>

        {empty ? (
          <EmptyState />
        ) : (
          <div className="guide-body">
            {/* Section 1 — Similar Process Found */}
            <section className="guide-section">
              <div className="guide-section-label">
                <Icon name="history" size={13} />Similar Process Found
              </div>
              <div className="guide-similar-card">
                <div className="gsc-head">
                  <span className="gsc-dot" />
                  <h3>{similar.process}</h3>
                </div>
                <div className="gsc-meta">
                  <span><Icon name="calendar" size={13} />Completed {similar.completedAgo}</span>
                  <span><Icon name="clock" size={13} />{similar.duration} duration</span>
                </div>
                <div className="gsc-actions">
                  <button className="btn btn-outline btn-sm" onClick={() => setOverlay('view')}>
                    <Icon name="external-link" size={14} />View Session
                  </button>
                  <button className="btn btn-purple btn-sm" onClick={() => openAsk(null)}>
                    <Icon name="sparkles" size={14} />Ask Companion
                  </button>
                </div>
              </div>
            </section>

            {/* Section 2 — Lessons From Last Time */}
            <section className="guide-section">
              <div className="guide-section-label">
                <Icon name="lightbulb" size={13} />Lessons From Last Time
              </div>
              {lessons.map(l => (
                <div className={`guide-lesson lesson-${l.color}`} key={l.id}>
                  <span className="gl-ico"><Icon name="alert-triangle" size={15} /></span>
                  <div className="gl-text">
                    <div className="gl-title">{l.title}</div>
                    <p className="gl-body">{l.body}</p>
                    <div className="gl-meta">
                      <span className="gl-meta-label">{l.metaLabel}</span>
                      <span className={`badge c-${l.color}`}>{l.meta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Section 3 — Quick Questions */}
            <section className="guide-section">
              <div className="guide-section-label">
                <Icon name="message-square" size={13} />Quick Questions
              </div>
              <div className="guide-qq-list">
                {quickQuestions.map(q => (
                  <button key={q} className="guide-qq" onClick={() => openAsk(q)}>
                    {q}
                    <Icon name="arrow-right" size={13} />
                  </button>
                ))}
              </div>
            </section>

            <div className="guide-trust">
              <Icon name="lock" size={13} />
              From your previous work — only your sessions, never shared.
            </div>
          </div>
        )}
      </aside>

      {overlay === 'view' && (
        <GuideSessionDrawer
          onClose={() => setOverlay(null)}
          onAsk={() => openAsk(null)}
        />
      )}
      {overlay === 'ask' && (
        <AskCompanion
          initialQuestion={askSeed}
          onClose={() => setOverlay(null)}
        />
      )}
    </>
  )
}

function EmptyState() {
  return (
    <div className="guide-empty">
      <span className="guide-empty-ico"><Icon name="history" size={28} /></span>
      <h3>No Related Sessions Yet</h3>
      <p>Keep Companion running to build your personal process history.</p>
    </div>
  )
}
