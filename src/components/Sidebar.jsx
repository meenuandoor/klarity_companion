import { useState } from 'react'
import Icon from './Icon'
import { useApp } from '../context/AppContext'

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect fill="#25325B" height="24" rx="3.7" width="24"/><path d="M17.6 5.5H15L11.3 10.8H9.4V5.5H7.4V12.5H11.2L15.6 18.5H18.3L13.1 11.7L17.6 5.5Z" fill="white"/><rect x="7.4" y="17" width="2" height="1.5" fill="white"/><rect x="7.4" y="14" width="3.5" height="1.5" fill="white"/></svg>`

export default function Sidebar() {
  const { route, navigate } = useApp()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`} id="sidebar">
      <div className="sb-top">
        <img
          className="sb-logo"
          src={`data:image/svg+xml;utf8,${encodeURIComponent(LOGO_SVG)}`}
          alt="Klarity"
          onClick={() => collapsed && setCollapsed(false)}
        />
        <div className="ws">
          <span className="ws-avatar">A</span>
          <span className="ws-name">Acme Operations</span>
        </div>
        <button className="sb-collapse" title="Collapse sidebar" onClick={() => setCollapsed(true)}>
          <Icon name="panel-left" size={15} />
        </button>
      </div>

      <nav className="nav-group">
        <a className="nav-item disabled" title="Not part of this mock">
          <Icon name="network" size={16} /><span>Process Index</span>
        </a>
        <a className="nav-item disabled" title="Not part of this mock">
          <Icon name="bot" size={16} /><span>Interviewer</span>
        </a>
        <a
          className={`nav-item${route === 'home' || route === 'session' || route === 'permissions' || route === 'onboarding' ? ' active' : ''}`}
          onClick={() => navigate('home')}
          style={{ cursor: 'pointer' }}
        >
          <Icon name="bot-message-square" size={16} /><span>Companion</span>
        </a>
        <a className="nav-item disabled" title="Not part of this mock">
          <Icon name="sparkles" size={16} /><span>Advisor</span>
        </a>
        <a className="nav-item disabled" title="Not part of this mock">
          <Icon name="layout-dashboard" size={16} /><span>Dashboards</span>
        </a>
      </nav>

      <div className="nav-spacer" />

      <nav className="nav-group">
        <a
          className={`nav-item${route === 'privacy' ? ' active' : ''}`}
          onClick={() => navigate('privacy')}
          style={{ cursor: 'pointer' }}
        >
          <Icon name="shield-check" size={16} /><span>Privacy &amp; controls</span>
        </a>
        <a className="nav-item disabled" title="Not part of this mock">
          <Icon name="settings" size={16} /><span>Settings</span>
        </a>
      </nav>

      <div className="sb-sep" />

      <div className="profile">
        <span className="pf-avatar">SC</span>
        <div>
          <div className="pf-name">Sarah Chen</div>
          <div className="pf-email">sarah.chen@acme.com</div>
        </div>
      </div>
    </aside>
  )
}
