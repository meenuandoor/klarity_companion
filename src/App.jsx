import { useContext } from 'react'
import { AppProvider, AppContext } from './context/AppContext'
import Sidebar from './components/Sidebar'
import SignalDrawer from './components/SignalDrawer'
import HomeScreen from './screens/HomeScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import PermissionsScreen from './screens/PermissionsScreen'
import PrivacyScreen from './screens/PrivacyScreen'
import SessionScreen from './screens/session/SessionScreen'

function AppShell() {
  const { route } = useContext(AppContext)

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        {route === 'onboarding' && <OnboardingScreen />}
        {route === 'permissions' && <PermissionsScreen />}
        {route === 'home' && <HomeScreen />}
        {route === 'session' && <SessionScreen />}
        {route === 'privacy' && <PrivacyScreen />}
      </main>
      <SignalDrawer />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
