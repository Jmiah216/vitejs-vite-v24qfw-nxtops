export const militaryJobs = {
  "Army": [
    "11B - Infantry",
    "12B - Combat Engineer", 
    "25B - Information Technology Specialist",
    "25N - Nodal Network Systems Operator",
    "25S - Satellite Communication Systems Operator",
    "35T - Military Intelligence Systems Maintainer/Integrator",
    "17C - Cyber Operations Specialist",
    "25D - Cyber Network Defender",
    "35Q - Cryptologic Network Warfare Specialist",
    "255S - Information Protection Technician",
    "25U - Signal Support Systems Specialist",
    "25E - Electromagnetic Spectrum Manager",
    "25M - Multimedia Illustrator",
    "35L - Counter-Intelligence Agent",
    "35N - Signals Intelligence Analyst"
  ],
  "Navy": [
    "IT1 - Information Systems Technician (Surface)",
    "ITS - Information Systems Technician (Submarine)",
    "CTN - Cryptologic Technician Networks",
    "IS - Intelligence Specialist",
    "ET - Electronics Technician",
    "FC - Fire Controlman",
    "AG - Aerographer's Mate",
    "CTR - Cryptologic Technician",
    "CTT - Cryptologic Technician Technical",
    "OS - Operations Specialist",
    "CTI - Cryptologic Technician Interpretive",
    "CTM - Cryptologic Technician Maintenance",
    "ETN - Electronics Technician Navigation",
    "ETV - Electronics Technician Submarine Navigation"
  ],
  "Air Force": [
    "3D0X2 - Cyber Systems Operations",
    "3D0X3 - Cyber Surety",
    "3D0X4 - Computer Systems Programming",
    "1B4X1 - Cyber Warfare Operations",
    "1N4X1A - Network Intelligence Analyst",
    "3D0X1 - Knowledge Operations Management",
    "3D1X3 - RF Transmission Systems",
    "1C6X1 - Space Systems Operations",
    "3D1X1 - Client Systems",
    "3D1X2 - Cyber Transport Systems",
    "1N2X1 - Signals Intelligence Analyst",
    "1N3X1 - Cryptologic Language Analyst",
    "3D1X4 - Spectrum Operations"
  ],
  "Marine Corps": [
    "0671 - Data Systems Administrator",
    "0689 - Information Assurance Technician",
    "0651 - Cyber Network Operator",
    "0659 - Network Chief",
    "2611 - Cryptologic Digital Network Operator",
    "0631 - Network Administrator",
    "0639 - Network Chief",
    "0681 - Information Security Technician",
    "0699 - Communications Chief",
    "0211 - Counterintelligence/Human Intelligence Specialist",
    "0231 - Intelligence Specialist",
    "0241 - Imagery Analysis Specialist",
    "0261 - Geographic Intelligence Specialist",
    "0621 - Telecommunications Specialist",
    "0627 - Ground Mobile Forces Satellite Operator"
  ],
  "Space Force": [
    "3D0X2 - Cyber Systems Operations",
    "3D0X3 - Cyber Surety",
    "3D1X2 - Cyber Transport Systems",
    "1B4X1 - Cyber Warfare Operations",
    "1C6X1 - Space Systems Operations",
    "3D0X4 - Computer Systems Programming",
    "1N4X1A - Network Intelligence Analyst",
    "5C0X1 - Command and Control Operations",
    "3D1X1 - Client Systems",
    "1N2X1 - Signals Intelligence Analyst",
    "1N3X1 - Cryptologic Language Analyst",
    "3D1X4 - Spectrum Operations"
  ]
} as const;

export type MilitaryBranch = keyof typeof militaryJobs;
export type MilitaryJob = typeof militaryJobs[MilitaryBranch][number];