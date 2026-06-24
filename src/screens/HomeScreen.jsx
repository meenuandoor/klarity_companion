import Icon from '../components/Icon'
import { useApp } from '../context/AppContext'
import CoachTab from './CoachTab'
import SignalsPage from './SignalsPage'

export default function HomeScreen() {
  const { homeTab, setHomeTab } = useApp()

  return (
    <div className="screen">
      <div className="page-head">
        <div className="page-head-row">
          <div className="page-title">
            <span className="coach-ico"><Icon name="bot-message-square" size={16} /></span>
            Companion
          </div>
          <div className="nav-tabs">
            {['coach', 'my', 'team'].map(tab => (
              <button
                key={tab}
                className={`nav-tab${homeTab === tab ? ' active' : ''}`}
                onClick={() => setHomeTab(tab)}
              >
                {tab === 'coach' ? 'Companion' : tab === 'my' ? 'My Signals' : 'Team Signals'}
              </button>
            ))}
          </div>
          <div className="head-actions">
            <button className="btn btn-outline btn-sm">
              <Icon name="user" size={14} />My Role
            </button>
            <button className="btn btn-outline btn-sm">
              <Icon name="brain" size={14} />Companion Context
            </button>
          </div>
        </div>
      </div>
      <div className="scroll">
        {homeTab === 'coach' && <CoachTab />}
        {homeTab === 'my' && <SignalsPage type="my" />}
        {homeTab === 'team' && <SignalsPage type="team" />}
      </div>
    </div>
  )
}
