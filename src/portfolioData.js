export const profile = {
  name: "Abijit Arun",
  username: "abijit2626",
  title: "CS Student | Cybersecurity",
  bio: "Third-year CS student focused on defensive security — SIEM ops, threat detection, and log analysis. Building detection tools, grinding CTFs, and looking for SOC analyst internships for 2026–2027.",
  intro:
    "Third-year CS student on the defensive side of security. I build detection tools, analyze logs, and practice through CTFs — trying to understand attacker behavior well enough to catch it.",
  location: "Palakkad, India",
  accountCreated: "2024",
  lastUpdated: "August 2026",
  stats: [
    { label: "Public Repos", value: "4+" },
    { label: "Focus", value: "SOC / Blue Team" },
    { label: "CTFs", value: "Active" },
    { label: "Primary Focus", value: "Cybersecurity" },
  ],
  quickFacts: [
    { label: "Languages", value: "Python, Bash" },
    { label: "Approach", value: "Understand attacker behavior to catch it" },
    { label: "Currently", value: "SIEM ops, threat detection, log analysis, CTFs" },
    { label: "GitHub", value: "@abijit2626" },
  ],
  learning: [
    "SIEM operations and log analysis with Wazuh",
    "Threat detection and detection engineering",
    "CTF challenges and bug bounty practice",
    "Endpoint telemetry and behavioral analysis",
  ],
  techStack: {
    languages: ["Python", "C", "Bash"],
    security: ["Wazuh SIEM", "Wireshark", "Nmap", "Burp Suite"],
    data: ["Log Analysis", "Threat Detection", "OSINT"],
    tools: ["Git", "VS Code", "Linux", "VirtualBox", "HackerOne"],
  },
  links: [
    { label: "GitHub", href: "https://github.com/abijit2626", short: "@abijit2626" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      short: "Abijit Arun",
    },
  ],
};

export const projects = [
  {
    name: "SIEM-Project",
    description:
      "A stateful attack chain correlation engine and C2 beacon detector that tracks multi-stage intrusions and reduces alert fatigue using temporal analysis.",
    href: "https://github.com/abijit2626/SIEM-Project",
    repoMeta: ["Public", "Python", "Completed"],
    highlights: [
      "Stateful correlation across multi-stage attack chains",
      "Explainable C2 beacon detection via interval variance analysis",
      "Temporal time-window validation to eliminate false positives",
    ],
  },
  {
    name: "keyboard-hook-behavioral-detector",
    description:
      "A behavioral analysis tool using low-level keyboard hooks to capture and analyze typing patterns — exploring how user behavior can be fingerprinted or flagged as anomalous. A step toward real endpoint telemetry.",
    href: "https://github.com/abijit2626/keyboard-hook-behavioral-detector",
    repoMeta: ["Public", "Python", "Completed"],
    highlights: [
      "Low-level keyboard hook implementation for behavioral capture",
      "Analyzes typing patterns for anomaly detection",
      "Models the kind of endpoint telemetry used in real detection systems",
    ],
  },
  {
    name: "personal-recon-tool",
    description:
      "A custom reconnaissance tool built for practicing information-gathering techniques used in security assessments and CTFs.",
    href: "https://github.com/abijit2626/personal-recon-tool",
    repoMeta: ["Public", "Python", "Completed"],
    highlights: [
      "Custom recon workflows for OSINT and CTF use",
      "Practices real information-gathering techniques",
      "Built to understand the attacker's reconnaissance phase",
    ],
  },
  {
    name: "wazuh-investigations",
    description:
      "Documenting hands-on work with Wazuh SIEM — deployment notes, log analysis workflows, and threat detection writeups as I build detection rules and investigate simulated incidents.",
    href: "https://github.com/abijit2626/wazuh-investigations",
    repoMeta: ["Public", "In Progress", "SIEM"],
    highlights: [
      "Wazuh SIEM deployment and configuration notes",
      "Custom detection rules and threat hunting workflows",
      "Writeups from simulated incident investigations",
    ],
  },
  {
    name: "hackerone-ctf-writeups",
    description:
      "Writeups from CTFs and bug bounty practice, covering the vulnerabilities found and the reasoning behind each exploit.",
    href: "https://github.com/abijit2626/hackerone-ctf-writeups",
    repoMeta: ["Public", "In Progress", "CTF"],
    highlights: [
      "Detailed CTF and bug bounty writeups",
      "Explains the vulnerability and reasoning behind exploits",
      "Covers web, binary, OSINT, and forensics categories",
    ],
  },
];

export const contributionSummary = {
  headline: "Coming Soon — Open Source Security & Detection Engineering",
  notes: [
    "Open source contributions and community writeups are currently in active preparation.",
    "Looking for SOC analyst internships for 2026–2027 and open to collaborating on detection engineering projects.",
  ],
};
