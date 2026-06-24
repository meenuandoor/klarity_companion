import Icon from '../../components/Icon'
import { useApp } from '../../context/AppContext'
import { TIMELINE, SESSION_SIGNALS } from '../../data/seed'

export default function ActivityTimeline() {
  const {
    sessionMode, excluded, openBlocks, openSubs,
    getBlockState, toggleBlock, toggleSub, toggleOpenBlock, toggleOpenSub,
    setOpenBlocks, setOpenSubs,
  } = useApp()

  const completed = sessionMode === 'completed'
  const observed = TIMELINE.reduce((n, b) => n + b.subs.filter(s => !excluded[s.id]).length, 0)

  return (
    <div className="timeline-wrap">
      <div className="tl-head">
        <div>
          <div className="tl-title-row">
            <div style={{ fontSize: 20, fontWeight: 600 }}>Activity Timeline</div>
            <span className="muted" style={{ fontSize: 12 }}>{observed} activities observed</span>
          </div>
          <p className="muted" style={{ fontSize: 14, margin: '4px 0 0' }}>
            Review selected activities to contribute to the process index. Exclude activities that should not be shared.
          </p>
        </div>
        <div className="tl-actions">
          <div className="iconbtn" title="Expand all" onClick={() => {
            const blocks = {}; const subs = {}
            TIMELINE.forEach(b => { blocks[b.id] = true; b.subs.forEach(s => { subs[s.id] = true }) })
            setOpenBlocks(blocks); setOpenSubs(subs)
          }}>
            <Icon name="maximize-2" size={16} />
          </div>
          <div className="iconbtn" title="Collapse all" onClick={() => { setOpenBlocks({}); setOpenSubs({}) }}>
            <Icon name="minimize-2" size={16} />
          </div>
          {completed ? (
            <span className="badge c-gray" style={{ width: 32, height: 32, justifyContent: 'center' }} title="Private — not yet submitted">
              <Icon name="lock" size={14} />
            </span>
          ) : (
            <div className="iconbtn" title="Edit"><Icon name="pencil" size={16} /></div>
          )}
        </div>
      </div>

      <div className="tl-info">
        <Icon name="info" size={16} />
        <span>The AI uses this as guidance when building your process index — it may not follow the link exactly in all cases.</span>
      </div>

      {completed && <Receipt />}

      {TIMELINE.map(block => (
        <Block
          key={block.id}
          block={block}
          open={!!openBlocks[block.id]}
          openSubs={openSubs}
          excluded={excluded}
          getBlockState={getBlockState}
          toggleBlock={toggleBlock}
          toggleSub={toggleSub}
          toggleOpenBlock={toggleOpenBlock}
          toggleOpenSub={toggleOpenSub}
        />
      ))}
    </div>
  )
}

function Receipt() {
  let kept = 0, excl = 0
  const { excluded } = useApp()
  TIMELINE.forEach(b => b.subs.forEach(s => { excluded[s.id] ? excl++ : kept++ }))

  return (
    <div className="receipt">
      <div className="cell">
        <div className="num">{kept}</div>
        <div className="lbl"><Icon name="check" size={14} />Activities kept</div>
      </div>
      <div className="cell">
        <div className="num">{excl}</div>
        <div className="lbl"><Icon name="eye-off" size={14} />Excluded by you</div>
      </div>
      <div className="cell">
        <div className="num">{SESSION_SIGNALS.length}</div>
        <div className="lbl"><Icon name="sparkles" size={14} />Signals extracted</div>
      </div>
      <div className="cell">
        <div className="num">12</div>
        <div className="lbl"><Icon name="eraser" size={14} />PII items scrubbed</div>
      </div>
    </div>
  )
}

function Block({ block, open, openSubs, excluded, getBlockState, toggleBlock, toggleSub, toggleOpenBlock, toggleOpenSub }) {
  const state = getBlockState(block)
  const allExcl = state === 'unchecked'

  return (
    <div className={`block${open ? ' open' : ''}${allExcl ? ' excluded' : ''}`}>
      <div
        className="block-head"
        onClick={e => {
          if (e.target.closest('[data-blockck]')) return
          toggleOpenBlock(block.id)
        }}
      >
        <div className="block-row">
          <button
            className={`ck${state === 'checked' ? ' on' : state === 'partial' ? ' partial' : ''}`}
            data-blockck={block.id}
            onClick={e => { e.stopPropagation(); toggleBlock(block.id) }}
          >
            {state === 'checked' && <Icon name="check" size={13} />}
            {state === 'partial' && <Icon name="minus" size={13} />}
          </button>
          <span className="block-name">{block.name}</span>
        </div>
        <div className="block-meta">
          <span>{block.start}</span>
          <span style={{ color: '#cbd5e1' }}>·</span>
          <span>{block.duration}</span>
          <span className="badge badge-secondary" style={{ height: 20 }}>
            <Icon name="list" size={12} /> {block.subs.length} sub-{block.subs.length === 1 ? 'activity' : 'activities'}
          </span>
          <span className="chev"><Icon name="chevron-down" size={14} /></span>
        </div>
      </div>
      {open && (
        <div className="subs">
          {block.subs.map(sub => (
            <Sub
              key={sub.id}
              sub={sub}
              open={!!openSubs[sub.id]}
              excluded={excluded[sub.id]}
              toggleSub={toggleSub}
              toggleOpenSub={toggleOpenSub}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function Sub({ sub, open, excluded: isExcluded, toggleSub, toggleOpenSub }) {
  return (
    <div className={`sub${open ? ' open' : ''}`}>
      <div
        className="sub-head"
        onClick={e => {
          if (e.target.closest('[data-subck]')) return
          toggleOpenSub(sub.id)
        }}
      >
        <button
          className={`ck${!isExcluded ? ' on' : ''}`}
          data-subck={sub.id}
          onClick={e => { e.stopPropagation(); toggleSub(sub.id) }}
        >
          {!isExcluded && <Icon name="check" size={13} />}
        </button>
        <span className="sub-name">{sub.name}</span>
        <span className="sub-time">
          <span>{sub.start}</span>
          <span style={{ color: '#cbd5e1' }}>·</span>
          <span>{sub.duration}</span>
          <span className="chev"><Icon name="chevron-down" size={12} /></span>
        </span>
      </div>
      {open && (
        <div className="sub-detail">
          {sub.tools?.length > 0 && (
            <div>
              <div className="lbl">Tools</div>
              <div className="muted" style={{ fontSize: 12 }}>{sub.tools.join(', ')}</div>
            </div>
          )}
          {sub.tasks?.length > 0 && (
            <div>
              <div className="lbl">Tasks</div>
              <ul className="tasks">
                {sub.tasks.map((t, i) => (
                  <li key={i}><span className="ts">[{t.timestamp}]</span> {t.action}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
