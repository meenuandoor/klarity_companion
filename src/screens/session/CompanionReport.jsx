import { useRef } from 'react'
import Icon from '../../components/Icon'
import { REPORT_HTML } from '../../data/seed'

export default function CompanionReport() {
  const ref = useRef(null)

  function handleCopy() {
    if (ref.current) {
      navigator.clipboard.writeText(ref.current.innerText).catch(() => {})
    }
  }

  return (
    <div className="report">
      <div className="report-card" style={{ position: 'relative' }}>
        <button className="report-copy" title="Copy report" onClick={handleCopy}>
          <Icon name="copy" size={16} />
        </button>
        <div ref={ref} dangerouslySetInnerHTML={{ __html: REPORT_HTML }} />
      </div>
    </div>
  )
}
