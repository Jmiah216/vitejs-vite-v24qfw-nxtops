// Military to civilian job title mappings
const MOS_TO_CIVILIAN_TITLES = {
  // Army Information Technology
  "25B": {
    technical: "Information Systems Specialist",
    management: "IT Operations Manager",
    corporate: "Information Technology Professional"
  },
  "17C": {
    technical: "Cybersecurity Engineer",
    management: "Information Security Manager",
    corporate: "Information Security Professional"
  },
  "25N": {
    technical: "Network Systems Engineer",
    management: "Network Operations Manager",
    corporate: "Network Infrastructure Professional"
  },
  
  // Navy IT Ratings
  "IT": {
    technical: "Systems Administrator",
    management: "IT Operations Manager",
    corporate: "Information Technology Professional"
  },
  "CTN": {
    technical: "Network Security Engineer",
    management: "Cybersecurity Manager",
    corporate: "Information Security Professional"
  },
  
  // Air Force IT AFSCs
  "3D0X2": {
    technical: "Cyber Systems Engineer",
    management: "Cyber Operations Manager",
    corporate: "Information Systems Professional"
  },
  "3D0X3": {
    technical: "Information Security Engineer",
    management: "Security Operations Manager",
    corporate: "Cybersecurity Professional"
  },
  
  // Marine Corps IT MOSs
  "0671": {
    technical: "Systems Administrator",
    management: "IT Infrastructure Manager",
    corporate: "IT Operations Professional"
  },
  "0689": {
    technical: "Information Security Engineer",
    management: "Security Program Manager",
    corporate: "Information Assurance Professional"
  }
};

export function translateMilitaryJobTitle(
  mos: string,
  variant: 'technical' | 'management' | 'corporate' = 'technical'
): string {
  // Extract MOS code from full string (e.g., "25B - Information Technology Specialist" -> "25B")
  const mosCode = mos.split(' - ')[0].trim();
  
  // Check if we have a direct mapping
  if (MOS_TO_CIVILIAN_TITLES[mosCode]?.[variant]) {
    return MOS_TO_CIVILIAN_TITLES[mosCode][variant];
  }
  
  // If no direct mapping, try to extract and enhance the civilian title
  const fullTitle = mos.split(' - ')[1]?.trim();
  if (fullTitle) {
    // Remove military-specific terms and enhance based on variant
    const baseTitle = fullTitle
      .replace(/specialist/i, 'Professional')
      .replace(/sergeant/i, 'Manager')
      .replace(/chief/i, 'Director')
      .replace(/operator/i, 'Engineer')
      .replace(/technician/i, 'Specialist');

    switch (variant) {
      case 'technical':
        return baseTitle.includes('Engineer') || baseTitle.includes('Specialist') 
          ? baseTitle 
          : `Technical ${baseTitle}`;
      case 'management':
        return baseTitle.includes('Manager') || baseTitle.includes('Director')
          ? baseTitle
          : `${baseTitle} Manager`;
      case 'corporate':
        return baseTitle.includes('Professional')
          ? baseTitle
          : `${baseTitle} Professional`;
    }
  }
  
  // Default fallbacks based on variant
  return {
    technical: "IT Systems Engineer",
    management: "IT Operations Manager",
    corporate: "Information Technology Professional"
  }[variant];
}