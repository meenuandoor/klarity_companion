// Companion Guide — "Lessons From Last Time"
// All content is the CURRENT user's own prior work. No cross-user / org data.

export const GUIDE = {
  // The prior session Companion matched the current work to.
  similar: {
    process: 'Customer Onboarding',
    completedAgo: '18 days ago',
    date: 'June 6, 2026',
    duration: '34 min',
  },

  // Three lessons distilled from prior Signals + Process Observations.
  lessons: [
    {
      id: 'l1',
      title: 'Missing Documentation',
      body: 'Required onboarding instructions were difficult to locate.',
      metaLabel: 'Signal Type',
      meta: 'Knowledge: Documentation',
      color: 'amber',
    },
    {
      id: 'l2',
      title: 'Rework Detected',
      body: 'CRM configuration step was repeated 3 times.',
      metaLabel: 'Source',
      meta: 'Process Observation',
      color: 'blue',
    },
    {
      id: 'l3',
      title: 'Tool Configuration Issue',
      body: 'Permission mapping required manual correction.',
      metaLabel: 'Signal Type',
      meta: 'Tooling: Configuration',
      color: 'purple',
    },
  ],

  quickQuestions: [
    'What went wrong last time?',
    'Why was rework required?',
    'Show process steps',
    'Generate a summary',
  ],

  // View Session — process summary
  summary: {
    inputs: 'Customer account information',
    outputs: 'Provisioned workspace',
    duration: '34 minutes',
    waitTime: '8 minutes',
    reworkCount: '3',
  },

  // View Session — signals generated during the prior session
  signals: [
    {
      id: 'gs1',
      title: 'Onboarding instructions were hard to locate',
      description:
        'You spent several minutes searching across the wiki and shared drive for the current onboarding runbook before starting setup.',
      suggestedAction:
        'Pin the latest onboarding runbook to the workspace so the next run starts from the right document.',
      category: 'Knowledge: Documentation',
      color: 'amber',
    },
    {
      id: 'gs2',
      title: 'Permission mapping required manual correction',
      description:
        'The default role template applied the wrong access scope, so permissions were re-mapped by hand before the workspace could be provisioned.',
      suggestedAction:
        'Validate the permission mapping against the role template before beginning CRM setup.',
      category: 'Tooling: Configuration',
      color: 'purple',
    },
    {
      id: 'gs3',
      title: 'CRM configuration was repeated multiple times',
      description:
        'The CRM configuration step ran three times because earlier attempts were saved before the permission mapping was correct.',
      suggestedAction:
        'Confirm prerequisites are in place once, then configure CRM in a single pass.',
      category: 'Process Standardization',
      color: 'blue',
    },
  ],

  // View Session — generated artifacts
  artifacts: [
    {
      id: 'a1',
      name: 'Customer Onboarding — Process Documentation',
      type: 'Document',
      meta: 'Markdown · 4 pages · AI-generated',
      icon: 'file-text',
    },
    {
      id: 'a2',
      name: 'Customer Onboarding — Process Diagram',
      type: 'Diagram',
      meta: '6 steps · AI-generated',
      icon: 'workflow',
    },
    {
      id: 'a3',
      name: 'Session Summary',
      type: 'Document',
      meta: 'PDF · 1 page · AI-generated',
      icon: 'file-bar-chart',
    },
  ],

  // Ask Companion — canned responses keyed by question.
  answers: {
    'What went wrong last time?': {
      lead: 'The onboarding process required rework during CRM configuration.',
      foundLabel: 'Companion identified:',
      bullets: [
        'Missing onboarding documentation',
        'Incorrect permission mapping',
        'Duplicate configuration attempts',
      ],
      recommended:
        'Review permission mapping before beginning CRM setup.',
    },
    'Why was rework required?': {
      lead:
        'CRM configuration was repeated three times because permission mappings weren’t validated before setup.',
      bullets: [
        'The first pass saved before the role template was corrected',
        'Each failed mapping forced the configuration step to restart',
        'No prerequisite check existed to catch it earlier',
      ],
      recommended:
        'Confirm the permission mapping is correct once, then configure CRM in a single pass.',
    },
    'Show process steps': {
      lead: 'Here are the steps Companion observed last time:',
      bullets: [
        'Gather customer account information',
        'Locate the onboarding runbook',
        'Map permissions to the role template',
        'Configure CRM (repeated 3×)',
        'Provision the workspace',
        'Confirm access and hand off',
      ],
    },
    'Generate a summary': {
      lead:
        'Customer Onboarding took 34 minutes with 8 minutes of wait time and 3 reworks.',
      bullets: [
        'Most time was lost re-running CRM configuration',
        'Documentation was hard to find at the start',
        'Permission mapping needed a manual fix before provisioning',
      ],
      recommended:
        'Validate documentation and permissions up front to avoid the rework you hit last time.',
    },
  },

  fallback: {
    lead:
      'Drawing on your Customer Onboarding session from 18 days ago — that run took 34 minutes and needed rework during CRM configuration.',
    bullets: [
      'Onboarding documentation was difficult to locate',
      'Permission mapping required a manual correction',
      'CRM configuration was repeated 3 times',
    ],
    recommended:
      'Review permission mapping before beginning CRM setup.',
  },
}
