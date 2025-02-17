// Add this function to the existing militaryToCareer.ts file

export function translateMilitaryToCivilian(responsibility: string): string {
  const militaryTerms: Record<string, string> = {
    // Leadership terms
    'commanded': 'directed',
    'led': 'managed',
    'supervised': 'oversaw',
    'troops': 'personnel',
    'subordinates': 'team members',
    'platoon': 'team',
    'squad': 'group',
    'battalion': 'organization',
    'company': 'division',

    // Operation terms
    'mission': 'project',
    'operation': 'initiative',
    'deployment': 'assignment',
    'combat': 'critical',
    'tactical': 'strategic',
    'executed': 'implemented',

    // Technical terms
    'weapons': 'systems',
    'armament': 'equipment',
    'maintained': 'managed maintenance of',
    'operated': 'utilized',
    'communications': 'telecommunications',

    // Administrative terms
    'processed': 'administered',
    'coordinated': 'facilitated',
    'briefed': 'presented',
    'regulations': 'policies',
    'SOP': 'standard procedures',

    // Training terms
    'trained': 'instructed',
    'drilled': 'trained',
    'mentored': 'coached',
    'instructed': 'educated'
  };

  let civilianResponsibility = responsibility.toLowerCase();
  
  // Replace military terms with civilian equivalents
  Object.entries(militaryTerms).forEach(([military, civilian]) => {
    const regex = new RegExp(`\\b${military}\\b`, 'gi');
    civilianResponsibility = civilianResponsibility.replace(regex, civilian);
  });

  // Add quantifiable metrics if not present
  if (!civilianResponsibility.match(/\d+/)) {
    if (civilianResponsibility.includes('team') || civilianResponsibility.includes('personnel')) {
      civilianResponsibility = civilianResponsibility.replace(/(managed|led|oversaw) (team|personnel)/, '$1 team of 5-10 $2');
    }
    if (civilianResponsibility.includes('budget') || civilianResponsibility.includes('equipment')) {
      civilianResponsibility = civilianResponsibility.replace(/(managed|oversaw) (budget|equipment)/, '$1 $2 valued at $500K+');
    }
  }

  // Add action verbs at the beginning if missing
  if (!civilianResponsibility.match(/^(managed|implemented|developed|coordinated|established|led|created|designed|maintained|improved|reduced|increased)/i)) {
    civilianResponsibility = `Effectively ${civilianResponsibility}`;
  }

  // Add measurable outcomes if missing
  if (!civilianResponsibility.includes('resulting in') && !civilianResponsibility.includes('achieving')) {
    civilianResponsibility += ' resulting in improved operational efficiency';
  }

  // Capitalize first letter
  return civilianResponsibility.charAt(0).toUpperCase() + civilianResponsibility.slice(1);
}