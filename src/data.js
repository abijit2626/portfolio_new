export const profile = {
  name: 'Abijit Arun',
  title: 'Cybersecurity student · Defensive security',
  status: 'Open to SOC analyst internships · 2026–2027',
  intro:
    'Third-year CS student on the defensive side of security. I build detection tools, analyze logs, and practice through CTFs — trying to understand attacker behavior well enough to catch it.',
  about: [
    'I am a third-year computer science student from Palakkad, India, focused on the blue side of security: SIEM operations, threat detection and log analysis.',
    'I build my own detection tools, document every investigation, and practice through CTFs to learn how attackers think — because you cannot catch what you do not understand.',
    'Right now I am looking for SOC analyst internships for 2026–2027, and I am open to collaborating on detection engineering projects.',
  ],
  location: 'Palakkad, India',
  github: 'https://github.com/abijit2626',
  githubHandle: '@abijit2626',
  linkedin: 'https://linkedin.com',
}

export const facts = [
  { label: 'Location', value: 'Palakkad, India' },
  { label: 'Education', value: 'B.Tech CS · 3rd year' },
  { label: 'Focus', value: 'SIEM · Detection · Log analysis' },
  { label: 'GitHub', value: '@abijit2626', href: 'https://github.com/abijit2626' },
]

export const skillGroups = [
  { title: 'Languages', items: ['Python', 'C', 'Bash'] },
  { title: 'Security', items: ['Wazuh SIEM', 'Wireshark', 'Nmap', 'Burp Suite'] },
  { title: 'Analysis', items: ['Log Analysis', 'Threat Detection', 'OSINT'] },
  { title: 'Tools', items: ['Git', 'VS Code', 'Linux', 'VirtualBox', 'HackerOne'] },
]

export const projects = [
  {
    name: 'SIEM-Project',
    tag: 'Python',
    status: 'Completed',
    description:
      'A stateful attack chain correlation engine and C2 beacon detector that tracks multi-stage intrusions and reduces alert fatigue using temporal analysis.',
    highlights: [
      'Stateful correlation across multi-stage attack chains',
      'Explainable C2 beacon detection via interval variance',
      'Time-window validation to cut false positives',
    ],
    href: 'https://github.com/abijit2626/SIEM-Project',
  },
  {
    name: 'keyboard-hook-behavioral-detector',
    tag: 'Python',
    status: 'Completed',
    description:
      'A behavioral analysis tool using low-level keyboard hooks to capture and analyze typing patterns — a step toward real endpoint telemetry.',
    highlights: [
      'Low-level keyboard hooks for behavioral capture',
      'Typing-pattern anomaly detection',
      'Models real endpoint telemetry pipelines',
    ],
    href: 'https://github.com/abijit2626/keyboard-hook-behavioral-detector',
  },
  {
    name: 'personal-recon-tool',
    tag: 'Python',
    status: 'Completed',
    description:
      'A custom reconnaissance tool built for practicing the information-gathering techniques used in security assessments and CTFs.',
    highlights: [
      'Custom recon workflows for OSINT and CTFs',
      'Practises real information-gathering techniques',
      "Built to understand the attacker's recon phase",
    ],
    href: 'https://github.com/abijit2626/personal-recon-tool',
  },
  {
    name: 'wazuh-investigations',
    tag: 'SIEM',
    status: 'In progress',
    description:
      'Hands-on Wazuh SIEM work — deployment notes, log analysis workflows, and threat detection writeups from simulated incidents.',
    highlights: [
      'Wazuh deployment and configuration notes',
      'Custom detection rules and hunting workflows',
      'Writeups from simulated investigations',
    ],
    href: 'https://github.com/abijit2626/wazuh-investigations',
  },
  {
    name: 'hackerone-ctf-writeups',
    tag: 'CTF',
    status: 'In progress',
    description:
      'Writeups from CTFs and bug bounty practice, covering the vulnerabilities found and the reasoning behind each exploit.',
    highlights: [
      'Detailed CTF and bug bounty writeups',
      'Explains the vulnerability and the reasoning',
      'Web, binary, OSINT and forensics categories',
    ],
    href: 'https://github.com/abijit2626/hackerone-ctf-writeups',
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
