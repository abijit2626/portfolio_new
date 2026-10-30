export const profile = {
  name: 'Abijit Arun',
  first: 'ABIJIT',
  last: 'ARUN',
  roles: [
    'Defensive Security',
    'SOC Analyst in the making',
    'Detection Engineering',
    'Log Analysis & SIEM',
    'CTF Player',
  ],
  intro:
    'Third-year CS student on the defensive side of security. I build detection tools, analyze logs, and practice through CTFs — trying to understand attacker behavior well enough to catch it.',
  about:
    'I am a third-year computer science student from Palakkad, India. I focus on the blue side of security: SIEM operations, threat detection and log analysis. I build my own detection tools, document every investigation, and grind CTFs to learn how attackers think — because you cannot catch what you do not understand. Right now I am looking for SOC analyst internships for 2026–2027.',
  location: 'Palakkad, India',
  github: 'https://github.com/abijit2626',
  githubHandle: '@abijit2626',
  linkedin: 'https://linkedin.com',
}

export const skills = [
  { name: 'Python', group: 'Languages', color: '#ffd43b' },
  { name: 'C', group: 'Languages', color: '#7aa2ff' },
  { name: 'Bash', group: 'Languages', color: '#7cff9b' },
  { name: 'Wazuh SIEM', group: 'Security', color: '#00f2ff' },
  { name: 'Wireshark', group: 'Security', color: '#4ea1ff' },
  { name: 'Nmap', group: 'Security', color: '#ff7a59' },
  { name: 'Burp Suite', group: 'Security', color: '#ff9f43' },
  { name: 'Log Analysis', group: 'Data', color: '#b794ff' },
  { name: 'Threat Detection', group: 'Data', color: '#ff3d8b' },
  { name: 'OSINT', group: 'Data', color: '#5ef0c0' },
  { name: 'Git', group: 'Tools', color: '#ff6b4a' },
  { name: 'VS Code', group: 'Tools', color: '#4dabf7' },
  { name: 'Linux', group: 'Tools', color: '#ffe066' },
  { name: 'VirtualBox', group: 'Tools', color: '#74c0fc' },
  { name: 'HackerOne', group: 'Tools', color: '#ff5d73' },
  { name: 'SIEM Ops', group: 'Security', color: '#00f2ff' },
  { name: 'CTFs', group: 'Data', color: '#ff3d8b' },
  { name: 'Detection Rules', group: 'Security', color: '#b794ff' },
  { name: 'Threat Hunting', group: 'Security', color: '#5ef0c0' },
  { name: 'Endpoint Telemetry', group: 'Data', color: '#7aa2ff' },
]

export const skillGroups = [
  { title: 'Languages', items: ['Python', 'C', 'Bash'] },
  { title: 'Security', items: ['Wazuh SIEM', 'Wireshark', 'Nmap', 'Burp Suite'] },
  { title: 'Data', items: ['Log Analysis', 'Threat Detection', 'OSINT'] },
  { title: 'Tools', items: ['Git', 'VS Code', 'Linux', 'VirtualBox', 'HackerOne'] },
]

export const projects = [
  {
    name: 'SIEM-Project',
    tag: 'Python · Completed',
    description:
      'A stateful attack chain correlation engine and C2 beacon detector that tracks multi-stage intrusions and reduces alert fatigue using temporal analysis.',
    highlights: [
      'Stateful correlation across multi-stage attack chains',
      'Explainable C2 beacon detection via interval variance',
      'Time-window validation to cut false positives',
    ],
    href: 'https://github.com/abijit2626/SIEM-Project',
    hue: '#8ec5ff',
  },
  {
    name: 'keyboard-hook-behavioral-detector',
    tag: 'Python · Completed',
    description:
      'A behavioral analysis tool using low-level keyboard hooks to capture and analyze typing patterns — a step toward real endpoint telemetry.',
    highlights: [
      'Low-level keyboard hooks for behavioral capture',
      'Typing-pattern anomaly detection',
      'Models real endpoint telemetry pipelines',
    ],
    href: 'https://github.com/abijit2626/keyboard-hook-behavioral-detector',
    hue: '#eaf2ff',
  },
  {
    name: 'personal-recon-tool',
    tag: 'Python · Completed',
    description:
      'A custom reconnaissance tool built for practicing the information-gathering techniques used in security assessments and CTFs.',
    highlights: [
      'Custom recon workflows for OSINT and CTFs',
      'Practises real information-gathering techniques',
      "Built to understand the attacker's recon phase",
    ],
    href: 'https://github.com/abijit2626/personal-recon-tool',
    hue: '#ffc86b',
  },
  {
    name: 'wazuh-investigations',
    tag: 'SIEM · In Progress',
    description:
      'Hands-on Wazuh SIEM work — deployment notes, log analysis workflows, and threat detection writeups from simulated incidents.',
    highlights: [
      'Wazuh deployment and configuration notes',
      'Custom detection rules and hunting workflows',
      'Writeups from simulated investigations',
    ],
    href: 'https://github.com/abijit2626/wazuh-investigations',
    hue: '#8ec5ff',
  },
  {
    name: 'hackerone-ctf-writeups',
    tag: 'CTF · In Progress',
    description:
      'Writeups from CTFs and bug bounty practice, covering the vulnerabilities found and the reasoning behind each exploit.',
    highlights: [
      'Detailed CTF and bug bounty writeups',
      'Explains the vulnerability and the reasoning',
      'Web, binary, OSINT and forensics categories',
    ],
    href: 'https://github.com/abijit2626/hackerone-ctf-writeups',
    hue: '#ffc86b',
  },
]

export const journey = [
  {
    when: '2024',
    title: 'Started building on GitHub',
    text: 'First public repositories — small Python tools to learn how security software really works.',
  },
  {
    when: 'Learning',
    title: 'SIEM operations with Wazuh',
    text: 'Deploying Wazuh, writing detection rules, and investigating simulated incidents end to end.',
  },
  {
    when: 'Building',
    title: 'Attack chain correlation engine',
    text: 'A stateful engine that links multi-stage intrusions and flags C2 beacons through timing analysis.',
  },
  {
    when: 'Practising',
    title: 'CTFs and bug bounty',
    text: 'Web, binary, OSINT and forensics challenges — documented with the reasoning behind every solve.',
  },
  {
    when: '2026–2027',
    title: 'Looking for a SOC analyst internship',
    text: 'Open to internships and to collaborating on detection engineering projects.',
  },
]

export const terminalLines = [
  { t: 'cmd', v: 'wazuh-agent --status' },
  { t: 'ok', v: '[ OK ] agent connected, 1 manager, 0 errors' },
  { t: 'cmd', v: 'correlate --window 300s --chain multi-stage' },
  { t: 'warn', v: '[WARN] 3 events linked: recon → exploit → persistence' },
  { t: 'cmd', v: 'beacon-detect --iface eth0' },
  { t: 'alert', v: '[ALERT] interval variance 0.02 → C2 beacon suspected' },
  { t: 'ok', v: '[ OK ] rule 100210 fired, incident opened' },
]
