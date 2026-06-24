import { createContext, useContext, useState, useEffect } from 'react'
import { ALL_SIGNALS, TIMELINE } from '../data/seed'

export const AppContext = createContext(null)

export function useApp() {
  return useContext(AppContext)
}

export function AppProvider({ children }) {
  const [route, setRoute] = useState('home')
  const [homeTab, setHomeTab] = useState('coach')
  const [sessionMode, setSessionMode] = useState('active')
  const [sessionTab, setSessionTab] = useState('timeline')
  const [paused, setPaused] = useState(false)
  const [muted, setMuted] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [sigFilter, setSigFilter] = useState('all')
  const [managerVisibility, setManagerVisibility] = useState(false)
  const [drawerSignalId, setDrawerSignalId] = useState(null)
  const [drawerIsTeam, setDrawerIsTeam] = useState(false)

  const [signalStatuses, setSignalStatuses] = useState(() =>
    Object.fromEntries(ALL_SIGNALS.map(s => [s.id, s.status || 'none']))
  )

  const [excluded, setExcluded] = useState(() =>
    Object.fromEntries(
      TIMELINE.flatMap(b => b.subs).map(s => [s.id, !s.selected])
    )
  )

  const [openBlocks, setOpenBlocks] = useState({})
  const [openSubs, setOpenSubs] = useState({})

  useEffect(() => {
    if (route !== 'session' || sessionMode !== 'active' || paused) return
    const id = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(id)
  }, [route, sessionMode, paused])

  function navigate(r) {
    setRoute(r)
  }

  function startSession() {
    setSessionMode('active')
    setSessionTab('timeline')
    setPaused(false)
    setMuted(false)
    setElapsed(0)
    setRoute('session')
  }

  function openReview(sessionId) {
    setSessionMode('completed')
    setSessionTab('timeline')
    setPaused(false)
    // Use session duration from data
    const s = { r1: 2820, r2: 3600, r3: 2280 }[sessionId] ?? 2820
    setElapsed(s)
    setRoute('session')
  }

  function endSession() {
    setSessionMode('completed')
    setSessionTab('timeline')
    setElapsed(e => Math.max(e, 2820))
  }

  function openDrawer(id, isTeam = false) {
    setDrawerSignalId(id)
    setDrawerIsTeam(isTeam)
  }

  function closeDrawer() {
    setDrawerSignalId(null)
  }

  function submitSignal(id) {
    setSignalStatuses(prev => ({ ...prev, [id]: 'shared' }))
  }

  function discardSignal(id) {
    setSignalStatuses(prev => ({ ...prev, [id]: 'discarded' }))
  }

  function unsubmitSignal(id) {
    setSignalStatuses(prev => ({ ...prev, [id]: 'none' }))
  }

  function getBlockState(block) {
    const total = block.subs.length
    const exCount = block.subs.filter(s => excluded[s.id]).length
    if (exCount === 0) return 'checked'
    if (exCount === total) return 'unchecked'
    return 'partial'
  }

  function toggleBlock(blockId) {
    const block = TIMELINE.find(b => b.id === blockId)
    if (!block) return
    const turnOn = getBlockState(block) !== 'checked'
    setExcluded(prev => {
      const next = { ...prev }
      block.subs.forEach(s => { next[s.id] = !turnOn })
      return next
    })
  }

  function toggleSub(subId) {
    setExcluded(prev => ({ ...prev, [subId]: !prev[subId] }))
  }

  function toggleOpenBlock(blockId) {
    setOpenBlocks(prev => ({ ...prev, [blockId]: !prev[blockId] }))
  }

  function toggleOpenSub(subId) {
    setOpenSubs(prev => ({ ...prev, [subId]: !prev[subId] }))
  }

  function toggleOpenSigSub(sigId) {
    setOpenSubs(prev => ({ ...prev, ['sig-' + sigId]: !prev['sig-' + sigId] }))
  }

  function isSigSubOpen(sigId) {
    return !!openSubs['sig-' + sigId]
  }

  const value = {
    route, navigate,
    homeTab, setHomeTab,
    sessionMode, sessionTab, setSessionTab,
    paused, setPaused,
    muted, setMuted,
    elapsed,
    sigFilter, setSigFilter,
    managerVisibility, setManagerVisibility,
    drawerSignalId, drawerIsTeam, openDrawer, closeDrawer,
    signalStatuses, submitSignal, discardSignal, unsubmitSignal,
    excluded, openBlocks, openSubs,
    getBlockState, toggleBlock, toggleSub,
    toggleOpenBlock, toggleOpenSub,
    setOpenBlocks, setOpenSubs,
    toggleOpenSigSub, isSigSubOpen,
    startSession, openReview, endSession,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
