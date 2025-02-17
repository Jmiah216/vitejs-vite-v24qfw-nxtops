import { MilitaryEvaluation } from '../types';

// Comprehensive military to civilian terminology mapping
const termMapping = {
  // Leadership and Management
  'commanded': 'directed',
  'led': 'managed',
  'supervised': 'oversaw',
  'platoon': 'team',
  'squad': 'group',
  'battalion': 'organization',
  'company': 'division',
  'detachment': 'unit',
  'troops': 'personnel',
  'subordinates': 'team members',
  'officer': 'manager',
  'enlisted': 'staff',
  'nco': 'supervisor',

  // Operations and Logistics
  'mission': 'project',
  'operation': 'initiative',
  'deployment': 'assignment',
  'logistics': 'supply chain',
  'convoy': 'transport',
  'supply': 'inventory',
  'requisition': 'procurement',
  'materiel': 'equipment',
  'ordnance': 'equipment',
  
  // Technical and Equipment
  'weapons': 'systems',
  'armament': 'equipment',
  'maintenance': 'upkeep',
  'repair': 'maintenance',
  'technical': 'specialized',
  'operator': 'specialist',
  'systems': 'equipment',
  'communications': 'telecommunications',
  
  // Training and Development
  'trained': 'instructed',
  'instructed': 'educated',
  'mentored': 'coached',
  'drill': 'training exercise',
  'qualification': 'certification',
  'proficiency': 'expertise',
  
  // Administrative
  'processed': 'administered',
  'coordinated': 'facilitated',
  'briefed': 'presented',
  'regulations': 'policies',
  'standard operating procedure': 'protocol',
  'personnel': 'staff',
  'roster': 'schedule',
  
  // Security and Operations
  'security clearance': 'confidential clearance',
  'classified': 'confidential',
  'tactical': 'strategic',
  'combat': 'operational',
  'field': 'on-site',
  'garrison': 'facility',
  
  // Performance and Achievement
  'commendation': 'recognition',
  'medal': 'award',
  'citation': 'recognition',
  'achievement': 'accomplishment',
  'distinguished': 'exceptional',
  'meritorious': 'outstanding'
};

// Skill category mapping for better organization
const skillCategories = {
  leadership: [
    'leadership',
    'supervision',
    'command',
    'management',
    'directing',
    'mentoring'
  ],
  technical: [
    'technical',
    'maintenance',
    'repair',
    'operation',
    'systems',
    'equipment'
  ],
  administrative: [
    'administration',
    'coordination',
    'planning',
    'organization',
    'documentation'
  ],
  communication: [
    'communication',
    'briefing',
    'presentation',
    'writing',
    'reporting'
  ],
  analytical: [
    'analysis',
    'assessment',
    'evaluation',
    'problem-solving',
    'decision-making'
  ]
};

export async function parseEvaluation(file: File): Promise<MilitaryEvaluation | null> {
  try {
    const text = await extractTextFromPDF(file);
    if (!text) return null;

    // Extract basic information
    const evaluation: MilitaryEvaluation = {
      rank: extractRank(text),
      branch: extractBranch(text),
      jobTitle: translateMilitaryJobTitle(extractJobTitle(text)),
      unit: extractUnit(text),
      startDate: extractDate(text, 'start'),
      endDate: extractDate(text, 'end'),
      responsibilities: [],
      awards: [],
      skills: [],
      selectedSkills: [],
      personalInfo: {
        name: extractName(text),
        email: '',
        phone: '',
        location: ''
      }
    };

    // Extract and translate responsibilities
    const rawResponsibilities = extractResponsibilities(text);
    evaluation.responsibilities = translateToCirculianTerms(rawResponsibilities);

    // Extract and translate awards
    const rawAwards = extractAwards(text);
    evaluation.awards = translateToCirculianTerms(rawAwards);

    // Extract and categorize skills
    const rawSkills = extractSkills(text);
    evaluation.skills = categorizeAndTranslateSkills(rawSkills);
    evaluation.selectedSkills = evaluation.skills;

    return evaluation;
  } catch (error) {
    console.error('Error parsing evaluation:', error);
    return null;
  }
}

async function extractTextFromPDF(file: File): Promise<string | null> {
  try {
    // This is a placeholder for PDF text extraction
    // In a real implementation, you would use a PDF parsing library
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return null;
  }
}

function translateToCirculianTerms(items: string[]): string[] {
  return items.map(item => {
    let translatedItem = item.toLowerCase();
    Object.entries(termMapping).forEach(([military, civilian]) => {
      const regex = new RegExp(`\\b${military}\\b`, 'gi');
      translatedItem = translatedItem.replace(regex, civilian);
    });
    // Capitalize first letter of each sentence
    return translatedItem.replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
  });
}

function categorizeAndTranslateSkills(skills: string[]): string[] {
  const categorizedSkills = new Set<string>();
  
  skills.forEach(skill => {
    const lowercaseSkill = skill.toLowerCase();
    
    // Check each category for matching skills
    Object.entries(skillCategories).forEach(([category, keywords]) => {
      if (keywords.some(keyword => lowercaseSkill.includes(keyword))) {
        // Add both specific and category-level skills
        categorizedSkills.add(translateToCirculianTerms([skill])[0]);
        categorizedSkills.add(
          category.charAt(0).toUpperCase() + category.slice(1) + ' Skills'
        );
      }
    });
  });

  return Array.from(categorizedSkills);
}

function translateMilitaryJobTitle(title: string): string {
  // Common military to civilian job title mappings
  const titleMappings: Record<string, string> = {
    'Infantry': 'Operations Manager',
    'Combat Arms': 'Operations Specialist',
    'Logistics Specialist': 'Supply Chain Manager',
    'Communications': 'IT Systems Manager',
    'Intelligence': 'Information Analysis Manager',
    'Medical': 'Healthcare Operations Manager',
    'Engineer': 'Project Engineer',
    'Supply': 'Logistics Manager',
    'Administrative': 'Operations Administrator',
    'Finance': 'Financial Operations Manager',
    'Maintenance': 'Maintenance Operations Manager'
  };

  // Try to match and translate the title
  for (const [military, civilian] of Object.entries(titleMappings)) {
    if (title.toLowerCase().includes(military.toLowerCase())) {
      return civilian;
    }
  }

  // If no match found, make it more civilian-friendly
  return title
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace(/\b(MOS|AFSC|NEC)\b/g, '')
    .replace(/\d+/g, '')
    .trim();
}

// Helper functions to extract specific information using regex patterns
function extractRank(text: string): string {
  const rankPatterns = [
    /\b(PVT|PFC|SPC|CPL|SGT|SSG|SFC|MSG|1SG|SGM|CSM|WO1|CW2|CW3|CW4|CW5|2LT|1LT|CPT|MAJ|LTC|COL|BG|MG|LTG|GEN)\b/i,
    /\b(SR|SA|SN|PO3|PO2|PO1|CPO|SCPO|MCPO|ENS|LTJG|LT|LCDR|CDR|CAPT|RDML|RADM|VADM|ADM)\b/i,
    /\b(AB|Amn|A1C|SrA|SSgt|TSgt|MSgt|SMSgt|CMSgt|2d Lt|1st Lt|Capt|Maj|Lt Col|Col|Brig Gen|Maj Gen|Lt Gen|Gen)\b/i
  ];

  for (const pattern of rankPatterns) {
    const match = text.match(pattern);
    if (match) return match[0];
  }
  return '';
}

function extractBranch(text: string): string {
  const branchPatterns = [
    /\b(Army|Navy|Air Force|Marine Corps|Marines|Coast Guard|Space Force)\b/i
  ];

  for (const pattern of branchPatterns) {
    const match = text.match(pattern);
    if (match) return match[0];
  }
  return '';
}

function extractJobTitle(text: string): string {
  const patterns = [
    /Military Occupational Specialty \(MOS\):\s*([^\n]+)/i,
    /Rating:\s*([^\n]+)/i,
    /Air Force Specialty Code \(AFSC\):\s*([^\n]+)/i,
    /Position Title:\s*([^\n]+)/i,
    /Duty Title:\s*([^\n]+)/i,
    /Primary Specialty:\s*([^\n]+)/i
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) return match[1].trim();
  }
  return '';
}

function extractUnit(text: string): string {
  const patterns = [
    /Unit:\s*([^\n]+)/i,
    /Organization:\s*([^\n]+)/i,
    /Command:\s*([^\n]+)/i,
    /Division:\s*([^\n]+)/i
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) return match[1].trim();
  }
  return '';
}

function extractDate(text: string, type: 'start' | 'end'): string {
  const patterns = type === 'start' 
    ? [/From:\s*(\d{2}[-/]\d{2}[-/]\d{4})/i, /Start Date:\s*(\d{2}[-/]\d{2}[-/]\d{4})/i]
    : [/To:\s*(\d{2}[-/]\d{2}[-/]\d{4})/i, /End Date:\s*(\d{2}[-/]\d{2}[-/]\d{4})/i];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) {
      // Convert to YYYY-MM format for input[type="month"]
      const [month, day, year] = match[1].split(/[-/]/);
      return `${year}-${month}`;
    }
  }
  return '';
}

function extractResponsibilities(text: string): string[] {
  const sections = [
    /Performance Narrative:(.*?)(?=\n\n|\[END\]|$)/is,
    /Specific Achievements:(.*?)(?=\n\n|\[END\]|$)/is,
    /Duties and Responsibilities:(.*?)(?=\n\n|\[END\]|$)/is,
    /Principal Duties:(.*?)(?=\n\n|\[END\]|$)/is,
    /Accomplishments:(.*?)(?=\n\n|\[END\]|$)/is
  ];

  const responsibilities: string[] = [];

  for (const pattern of sections) {
    const match = text.match(pattern);
    if (match?.[1]) {
      // Split by bullet points, dashes, or new lines
      const items = match[1]
        .split(/[•\-\*\n]/)
        .map(item => item.trim())
        .filter(item => item.length > 0);
      responsibilities.push(...items);
    }
  }

  return responsibilities;
}

function extractAwards(text: string): string[] {
  const sections = [
    /Awards and Decorations:(.*?)(?=\n\n|\[END\]|$)/is,
    /Medals and Commendations:(.*?)(?=\n\n|\[END\]|$)/is,
    /Recognition:(.*?)(?=\n\n|\[END\]|$)/is,
    /Honors:(.*?)(?=\n\n|\[END\]|$)/is
  ];

  const awards: string[] = [];

  for (const pattern of sections) {
    const match = text.match(pattern);
    if (match?.[1]) {
      const items = match[1]
        .split(/[•\-\*\n,]/)
        .map(item => item.trim())
        .filter(item => item.length > 0);
      awards.push(...items);
    }
  }

  return awards;
}

function extractSkills(text: string): string[] {
  const sections = [
    /Skills:(.*?)(?=\n\n|\[END\]|$)/is,
    /Qualifications:(.*?)(?=\n\n|\[END\]|$)/is,
    /Competencies:(.*?)(?=\n\n|\[END\]|$)/is,
    /Technical Proficiencies:(.*?)(?=\n\n|\[END\]|$)/is,
    /Core Capabilities:(.*?)(?=\n\n|\[END\]|$)/is
  ];

  const skills: string[] = [];

  for (const pattern of sections) {
    const match = text.match(pattern);
    if (match?.[1]) {
      const items = match[1]
        .split(/[•\-\*\n,]/)
        .map(item => item.trim())
        .filter(item => item.length > 0);
      skills.push(...items);
    }
  }

  return skills;
}

function extractName(text: string): string {
  const patterns = [
    /Name:\s*([^\n]+)/i,
    /Service Member:\s*([^\n]+)/i,
    /Rated Individual:\s*([^\n]+)/i,
    /Member Name:\s*([^\n]+)/i
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) return match[1].trim();
  }
  return '';
}