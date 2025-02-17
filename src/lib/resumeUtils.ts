export function capitalizeFullName(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

export function formatLocation(city: string, state: string): string {
  return `${city.trim()}, ${state.trim().toUpperCase()}`;
}

export function enhanceEducation(education: Education): Education {
  return {
    ...education,
    school: education.school.toUpperCase(),
    degree: education.degree?.toUpperCase(),
    field: education.field?.charAt(0).toUpperCase() + education.field?.slice(1).toLowerCase()
  };
}

export function formatCertification(certification: Certification): string {
  const parts = [certification.name];
  if (certification.fieldOfStudy) {
    parts.push(`- ${certification.fieldOfStudy}`);
  }
  if (certification.level) {
    parts.push(`(${certification.level})`);
  }
  return parts.join(' ');
}