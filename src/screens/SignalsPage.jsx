import { useState } from 'react'
import Icon from '../components/Icon'
import SignalCard from '../components/SignalCard'
import { MY_SIGNALS, TEAM_SIGNALS } from '../data/seed'

export default function SignalsPage({ type }) {
  const isTeam = type === 'team'
  const list = isTeam ? TEAM_SIGNALS : MY_SIGNALS
  const [view, setView] = useState('grid')

  return (
    <div className="signals-page">
      <p className="signals-sub">AI companion insights you can save and share with your team</p>
      <div className="filter-bar">
        <div className="search-box">
          <Icon name="search" size={16} />
          <input placeholder="Search signals..." />
        </div>
        <button className="select-trigger">All Types <Icon name="chevron-down" size={16} /></button>
        <button className="select-trigger">
          <Icon name="calendar" size={16} /> All time <Icon name="chevron-down" size={16} />
        </button>
        {!isTeam && (
          <button className="btn btn-outline ml-auto">
            <Icon name="download" size={14} />Export Digest
          </button>
        )}
        <div className={`view-toggle${isTeam ? ' ml-auto' : ''}`}>
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>
            <Icon name="grid-3x3" size={16} />
          </button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>
            <Icon name="list" size={16} />
          </button>
        </div>
        {isTeam && (
          <button className="more-btn" style={{ border: '1px solid var(--border)', borderRadius: 8, width: 36, height: 36, justifyContent: 'center' }}>
            <Icon name="more-vertical" size={16} />
          </button>
        )}
      </div>
      <div className="signals-grid">
        {list.map(s => <SignalCard key={s.id} signal={s} isTeam={isTeam} />)}
      </div>
    </div>
  )
}
