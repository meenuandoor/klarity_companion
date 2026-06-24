import Icon from '../components/Icon'
import { useApp } from '../context/AppContext'

export default function PrivacyScreen() {
  const { managerVisibility, setManagerVisibility } = useApp()

  return (
    <div className="screen">
      <div className="page-head">
        <div className="page-head-row">
          <div className="page-title">
            <span className="coach-ico"><Icon name="shield-check" size={16} /></span>
            Privacy &amp; controls
          </div>
        </div>
      </div>
      <div className="scroll">
        <div className="privacy-wrap">
          <p className="muted" style={{ marginBottom: 20 }}>
            How Companion handles your sessions. You decide what gets shared — these are the controls behind the "glass box."
          </p>

          <div className="pcard">
            <div className="pcard-head">
              <Icon name="lock" size={18} />
              <h3>Session visibility</h3>
            </div>
            <p>Sessions are private by default — only you can see them. Nothing is visible to your manager or workspace unless you choose to submit it.</p>
            <div className="prow">
              <div className="pr-text">
                <div className="pr-t">Let my manager see my sessions</div>
                <div className="muted">Off by default. When off, managers only ever see signals you explicitly submit.</div>
              </div>
              <button
                className={`switch${managerVisibility ? ' on' : ''}`}
                onClick={() => setManagerVisibility(v => !v)}
              />
            </div>
            <p className="syn-note">
              Synthesized control — repo enforces this via per-session private visibility + opt-in submission; there is no single toggle today.
            </p>
          </div>

          <div className="pcard">
            <div className="pcard-head">
              <Icon name="eraser" size={18} />
              <h3>PII scrubbing</h3>
            </div>
            <p>Personally identifiable information is stripped automatically before anything is extracted or shared. Nothing leaves your session without your say-so.</p>
            <div className="prow">
              <div className="pr-text">
                <div className="pr-t">Auto-strip PII</div>
                <div className="muted">Always on.</div>
              </div>
              <button className="switch on" disabled style={{ opacity: 0.6 }} />
            </div>
          </div>

          <div className="pcard">
            <div className="pcard-head">
              <Icon name="eye-off" size={18} />
              <h3>Sensitive apps &amp; sites</h3>
            </div>
            <p>Activity from these apps and sites is never captured. Add anything you don't want Companion to observe.</p>
            <div className="tag-list">
              {['1Password', 'Personal Gmail', 'Banking portals', 'Slack DMs', 'HR / Workday'].map(t => (
                <span key={t} className="tag-chip">
                  {t} <Icon name="x" size={13} />
                </span>
              ))}
              <button className="btn btn-outline btn-sm">
                <Icon name="plus" size={14} />Add
              </button>
            </div>
            <p className="syn-note">
              Synthesized panel — closest real equivalent to per-activity exclusion in the session timeline; no dedicated blacklist UI exists at this branch.
            </p>
          </div>

          <div className="pcard">
            <div className="pcard-head">
              <Icon name="history" size={18} />
              <h3>Data retention</h3>
            </div>
            <p>No screen recordings are ever saved. Companion keeps the extracted activity timeline and signals for the session; you can submit unsubmitted sessions to the Process Index for up to 30 days, after which they remain private to you.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
