export const CATEGORY_COLOR = {
  collaboration: 'teal', decision: 'indigo', knowledge: 'amber', other: 'gray',
  personal: 'slate', process: 'blue', risk: 'red', scaling: 'green',
  strength: 'green', tooling: 'purple',
}

export function colorForTag(tag) {
  for (const w of tag.toLowerCase().split(/[\s_]+/)) {
    if (CATEGORY_COLOR[w]) return CATEGORY_COLOR[w]
  }
  return 'gray'
}

export const TYPE_TIP = {
  'Process Automation': 'Repetitive manual work that rules could handle',
  'Process Simplification': "Too many steps for what's needed",
  'Process Standardization': 'Same task done differently without good reason',
  'Process Elimination': 'Work producing no value that should stop',
  'Tooling Gap': 'No tool exists for needed capability',
  'Tooling Integration': "Systems that don't talk to each other",
  'Knowledge Documentation': 'Tribal knowledge that should be written down',
  'Knowledge Accessibility': 'Info exists but is hard to find',
  'Collaboration Handoff': 'Info lost or delayed between people',
  'Decision Criteria': 'Judgment calls that could follow clear rules',
  'Risk Mitigation': 'Problems preventable with proactive action',
  'Risk Compliance': 'Practices creating regulatory or policy exposure',
  'Best Practice': 'Better approach worth sharing with others',
}

export const SESSION_SIGNALS = [
  {
    id: 'g1', ts: '00:06', tag: 'Process Automation',
    title: 'Invoice GL codes are keyed by hand from PDFs',
    description: 'Vendor invoices are opened from the email queue and GL codes re-typed into the ledger. The same vendors map to the same codes every time, but nothing remembers the mapping.',
    tools: ['NetSuite', 'Outlook'], status: 'none',
    whatsHappening: 'You opened seven invoices and typed the same coding for recurring vendors.',
    whatStoodOut: 'Iron Mountain was coded identically four times in six minutes.',
    whyItMatters: '~90 minutes a day on a deterministic lookup; a mistyped code triggers a month-end reconciliation.',
  },
  {
    id: 'g2', ts: '00:14', tag: 'Tooling Gap',
    title: 'No shared view of POs awaiting approval',
    description: 'Approvers learn a PO is waiting only via a Slack ping. There is no queue, so urgent purchases sit behind an out-of-office.',
    tools: ['Slack'], status: 'none',
    whatsHappening: 'You pinged two approvers manually to chase pending POs.',
    whatStoodOut: 'One PO had been waiting three days with no visibility.',
    whyItMatters: 'Approval latency is invisible until a vendor escalates.',
  },
  {
    id: 'g3', ts: '00:22', tag: 'Knowledge Documentation',
    title: 'Close checklist is run from memory',
    description: 'The order accruals post in and which entities net last is recalled, not written down.',
    tools: ['Excel'], status: 'none',
    whatsHappening: 'You rebuilt last month’s journal sequence to remember the order.',
    whyItMatters: 'Single point of failure on a time-critical, audited process.',
  },
  {
    id: 'g4', ts: '00:31', tag: 'Risk Mitigation',
    title: 'Wire approvals rely on a single verbal callback',
    description: 'Large wires are verified by one analyst phoning the requester — no second approver, no logged confirmation.',
    tools: ['Bank Portal'], status: 'none',
    whyItMatters: 'A successful impersonation here is a direct, unrecoverable loss.',
  },
]

export const QUICK_TAKE = 'This session surfaced four signals concentrated in accounts payable: two are quick automation wins (invoice coding, PO visibility), one is a knowledge-capture gap (the close checklist), and one is a control risk worth raising (single-approver wires).'

export const MY_SIGNALS = [
  {
    id: 'm1', tag: 'Process Automation', title: 'Invoice GL codes are keyed by hand from PDFs',
    status: 'shared', sessionDate: 'May 28, 2025', timestamp: '00:06', duration: '6 min',
    tools: ['NetSuite', 'Outlook'],
    description: 'Vendor invoices are re-coded into the ledger by hand even though the mapping is stable.',
    whyThisMatters: '~90 minutes a day on a deterministic lookup.',
    suggestedAction: 'Auto-populate GL codes from a vendor mapping table; flag only new vendors.',
  },
  {
    id: 'm2', tag: 'Tooling Gap', title: 'No shared view of POs awaiting approval',
    status: 'saved', sessionDate: 'May 28, 2025', timestamp: '00:14', duration: '4 min',
    tools: ['Slack'],
    description: 'Approvers find out a PO is waiting only when pinged.',
    whyThisMatters: 'Two POs slipped past their discount window this month.',
    suggestedAction: 'Stand up an approvals queue with aging + delegate-while-away.',
  },
  {
    id: 'm3', tag: 'Knowledge Documentation', title: 'Close checklist is run from memory',
    status: 'saved', sessionDate: 'May 21, 2025', timestamp: '00:09', duration: '5 min',
    tools: ['Excel'],
    description: 'The month-end close sequence lives only in one analyst’s head.',
    whyThisMatters: 'Single point of failure on an audited process.',
    suggestedAction: 'Capture the close runbook as a versioned checklist with owners.',
  },
  {
    id: 'm4', tag: 'Process Simplification', title: 'Expense reports bounce between three approvers',
    status: 'shared', sessionDate: 'May 21, 2025', timestamp: '00:42', duration: '3 min',
    tools: ['Concur'],
    description: 'Every report routes through three approvers — even a $20 parking claim.',
    whyThisMatters: 'Low-value claims carry the same overhead as material ones.',
    suggestedAction: 'Add an auto-approve threshold for sub-$100 claims.',
  },
]

export const TEAM_SIGNALS = [
  {
    id: 't1', tag: 'Process Standardization', title: 'Each region formats the revenue pack differently',
    status: 'shared', pinnedBy: 'Marcus Webb', sessionDate: 'May 27, 2025', timestamp: '00:22', duration: '8 min',
    tools: ['Excel', 'PowerPoint'],
    description: 'EMEA, AMER and APAC each maintain their own revenue deck; consolidation is manual.',
    whyThisMatters: 'Three hours every Monday spent reconciling format, not performance.',
    suggestedAction: 'One templated pack with a shared definition of booked revenue.',
  },
  {
    id: 't2', tag: 'Tooling Integration', title: 'CRM and billing don’t share customer IDs',
    status: 'shared', pinnedBy: 'Priya Nair', sessionDate: 'May 26, 2025', timestamp: '00:11', duration: '6 min',
    tools: ['Salesforce', 'Zuora'],
    description: 'Account changes are re-keyed into billing by hand because IDs don’t match.',
    whyThisMatters: 'Every mismatch is a billing failure that hits the customer.',
    suggestedAction: 'Establish a shared customer key and a one-way sync.',
  },
  {
    id: 't3', tag: 'Risk Compliance', title: 'Vendor banking changes accepted over email',
    status: 'shared', pinnedBy: 'Marcus Webb', sessionDate: 'May 19, 2025', timestamp: '00:33', duration: '7 min',
    tools: ['Outlook', 'NetSuite'],
    description: 'Bank-account changes are actioned from an emailed letterhead with no out-of-band check.',
    whyThisMatters: 'High-likelihood invoice-redirection fraud vector.',
    suggestedAction: 'Require a verified callback before any banking detail change.',
  },
  {
    id: 't4', tag: 'Best Practice', title: 'London AP cut entry time with a vendor portal',
    status: 'shared', pinnedBy: 'Devon Clarke', sessionDate: 'May 20, 2025', timestamp: '00:09', duration: '5 min',
    tools: ['Tipalti'],
    description: 'The London team routed vendors through self-service submission, halving manual entry.',
    whyThisMatters: 'A proven local win the rest of the org hasn’t adopted.',
    suggestedAction: 'Roll the vendor portal out to AMER and APAC.',
  },
]

export const SESSIONS = [
  { id: 'r1', date: 'May 28, 2025', start: '09:14', duration: '47 min', status: 'COMPLETED', total: 9, shared: 4, contributions: 'link' },
  { id: 'r2', date: 'May 21, 2025', start: '14:02', duration: '1 hr', status: 'COMPLETED', total: 12, shared: 5, contributions: 'link' },
  { id: 'r3', date: 'May 19, 2025', start: '10:31', duration: '38 min', status: 'PROCESSING', total: 7, shared: 0, contributions: 'none' },
]

export const TIMELINE = [
  {
    id: 'b1', name: 'Accounts payable — invoice intake', start: '00:00:42', duration: '14 min', selected: true,
    subs: [
      {
        id: 's1', name: 'Triage vendor invoices from the email queue', start: '00:00:42', duration: '5 min', selected: true,
        tools: ['Outlook', 'NetSuite'],
        tasks: [
          { timestamp: '00:01:10', action: 'Opened invoice from Iron Mountain and matched it to an open PO' },
          { timestamp: '00:03:48', action: 'Keyed GL code 6420 by hand from the PDF line items' },
          { timestamp: '00:05:02', action: 'Flagged a duplicate invoice number for follow-up' },
        ],
      },
      {
        id: 's2', name: 'Code recurring vendors into the ledger', start: '00:05:42', duration: '9 min', selected: true,
        tools: ['NetSuite'],
        tasks: [
          { timestamp: '00:06:20', action: 'Re-entered the same coding used last month for 5 recurring vendors' },
          { timestamp: '00:11:30', action: 'Saved batch and moved invoices to "ready for approval"' },
        ],
      },
    ],
  },
  {
    id: 'b2', name: 'Purchase order approvals', start: '00:14:48', duration: '9 min', selected: true,
    subs: [
      {
        id: 's3', name: 'Chase pending PO approvals', start: '00:14:48', duration: '9 min', selected: true,
        tools: ['Slack', 'NetSuite'],
        tasks: [
          { timestamp: '00:15:05', action: 'Messaged two approvers to chase POs waiting on sign-off' },
          { timestamp: '00:19:40', action: 'Re-sent a PO that had been pending three days' },
        ],
      },
    ],
  },
  {
    id: 'b3', name: 'Month-end close prep', start: '00:24:10', duration: '12 min', selected: true,
    subs: [
      {
        id: 's4', name: 'Rebuild the accrual posting order', start: '00:24:10', duration: '7 min', selected: true,
        tools: ['Excel'],
        tasks: [
          { timestamp: '00:25:00', action: 'Opened last month’s journal to recall which accruals post first' },
          { timestamp: '00:29:30', action: 'Drafted this month’s accrual sequence from memory' },
        ],
      },
      {
        id: 's5', name: 'Reconcile a control account', start: '00:31:10', duration: '5 min', selected: true,
        tools: ['NetSuite', 'Excel'],
        tasks: [
          { timestamp: '00:31:45', action: 'Tied the sub-ledger balance to the GL' },
        ],
      },
    ],
  },
  {
    id: 'b4', name: 'Personal email & calendar', start: '00:37:00', duration: '4 min', selected: false,
    subs: [
      {
        id: 's6', name: 'Checked personal inbox', start: '00:37:00', duration: '4 min', selected: false,
        tools: ['Gmail'],
        tasks: [
          { timestamp: '00:37:20', action: 'Read non-work email — excluded from sharing' },
        ],
      },
    ],
  },
]

export const REPORT_HTML = `
  <h2>Session summary</h2>
  <p>Over a 47-minute session focused on accounts payable, Companion observed three core
  workflows — invoice intake, purchase-order approvals, and month-end close prep — plus a short
  stretch of personal activity that was automatically excluded from sharing.</p>
  <h3>What you worked on</h3>
  <ul>
    <li><strong>Invoice intake (14 min)</strong> — triaged the vendor queue and coded recurring vendors by hand.</li>
    <li><strong>PO approvals (9 min)</strong> — chased pending approvals over Slack.</li>
    <li><strong>Close prep (12 min)</strong> — rebuilt the accrual posting order and reconciled a control account.</li>
  </ul>
  <h3>Where time is going</h3>
  <p>Roughly a third of the session was deterministic data entry that already follows stable
  rules — the strongest candidate for automation. Approval chasing and the from-memory close
  sequence are smaller but recurring drags.</p>
  <h3>Suggested next steps</h3>
  <ul>
    <li>Pilot vendor&rarr;GL auto-coding for the top 40 recurring vendors.</li>
    <li>Give approvers a shared queue with aging so chasing isn’t manual.</li>
    <li>Capture the close checklist so it doesn’t depend on one person.</li>
  </ul>
  <p class="muted" style="font-size:12px;margin-top:16px">AI-generated from this session. Personal activity was excluded automatically.</p>
`

export const CAROUSEL = [
  {
    icon: 'monitor-smartphone',
    headline: "Just Work. We'll Handle the Rest.",
    body: 'Klarity Companion observes your screen in real time — no recordings saved, no interruptions. Insights surface as you go.',
  },
  {
    icon: 'arrow-right-left',
    headline: 'Switch Tasks. Companion Keeps Up.',
    body: 'Jump between tools, tabs, and tasks freely. Companion tracks multiple activities and keeps context across all of them.',
  },
  {
    icon: 'shield-check',
    headline: 'Your Work, Documented. Your Rules.',
    body: 'You choose what gets shared. PII is stripped automatically, and nothing leaves your session without your say-so.',
  },
]

export const ALL_SIGNALS = [...SESSION_SIGNALS, ...MY_SIGNALS, ...TEAM_SIGNALS]
