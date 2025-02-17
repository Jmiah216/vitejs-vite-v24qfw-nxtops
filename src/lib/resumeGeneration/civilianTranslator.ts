// Dictionary of military to civilian term translations
export const militaryToCivilianTerms = {
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
  'SOP': 'standard procedures'
};

export function translateToCirculianTerms(text: string): string {
  let civilianText = text.toLowerCase();
  
  Object.entries(militaryToCivilianTerms).forEach(([military, civilian]) => {
    const regex = new RegExp(`\\b${military}\\b`, 'gi');
    civilianText = civilianText.replace(regex, civilian);
  });

  // Capitalize first letter of sentences
  return civilianText.replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
}

export function enhanceWithMetrics(responsibility: string): string {
  if (!responsibility.match(/\d+/)) {
    // Add team size metrics
    if (responsibility.match(/managed|led|oversaw/i)) {
      responsibility = responsibility.replace(
        /(managed|led|oversaw) (team|personnel)/i,
        '$1 team of 5-10 $2'
      );
    }
    
    // Add budget/equipment value metrics
    if (responsibility.match(/budget|equipment/i)) {
      responsibility = responsibility.replace(
        /(managed|oversaw) (budget|equipment)/i,
        '$1 $2 valued at $500K+'
      );
    }
  }
  
  return responsibility;
}