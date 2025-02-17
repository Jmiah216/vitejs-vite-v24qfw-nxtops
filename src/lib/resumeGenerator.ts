import { Resume, MilitaryEvaluation } from '../types';

interface ResumeTemplate {
  variant: 'corporate' | 'technical' | 'management';
  skillsEmphasis: string[];
  responsibilityTransformers: Record<string, string>;
  summaryTemplate: string;
}

const templates: Record<string, ResumeTemplate> = {
  corporate: {
    variant: 'corporate',
    skillsEmphasis: [
      'leadership',
      'management',
      'communication',
      'strategy',
      'operations'
    ],
    responsibilityTransformers: {
      'led': 'managed',
      'commanded': 'directed',
      'trained': 'developed',
      'mission': 'project',
      'troops': 'team members'
    },
    summaryTemplate: 'Results-driven professional with {years} years of leadership experience transitioning from {militaryRole} to {civilianRole}. Demonstrated success in team management, strategic planning, and organizational effectiveness. Strong track record of delivering results while managing cross-functional teams and complex projects.'
  },
  technical: {
    variant: 'technical',
    skillsEmphasis: [
      'technical',
      'systems',
      'analysis',
      'maintenance',
      'operations'
    ],
    responsibilityTransformers: {
      'operated': 'engineered',
      'maintained': 'optimized',
      'monitored': 'analyzed',
      'combat': 'critical',
      'mission': 'system'
    },
    summaryTemplate: 'Technical professional with {years} years of hands-on experience transitioning from {militaryRole} to {civilianRole}. Proven expertise in implementing technical solutions, maintaining critical systems, and optimizing operational efficiency. Skilled in adapting military technical expertise to solve complex civilian challenges.'
  },
  management: {
    variant: 'management',
    skillsEmphasis: [
      'leadership',
      'strategic',
      'organizational',
      'project management',
      'team building'
    ],
    responsibilityTransformers: {
      'led': 'directed',
      'supervised': 'managed',
      'coordinated': 'orchestrated',
      'mission': 'initiative',
      'unit': 'organization'
    },
    summaryTemplate: 'Accomplished leader with {years} years of experience transitioning from {militaryRole} to {civilianRole}. Expert in personnel management, resource allocation, and strategic planning. Strong background in leading high-performance teams and delivering exceptional results.'
  }
};

export function generateResumes(evaluation: MilitaryEvaluation): Record<string, Resume> {
  const yearsOfService = evaluation.endDate && evaluation.startDate
    ? Math.floor((new Date(evaluation.endDate).getTime() - new Date(evaluation.startDate).getTime()) / (1000 * 60 * 60 * 24 * 365))
    : 0;

  const baseResume: Resume = {
    personalInfo: evaluation.personalInfo || {
      name: '',
      email: '',
      phone: '',
      location: ''
    },
    evaluations: [evaluation],
    selectedSkills: [
      ...(evaluation.selectedSkills || []),
      ...(evaluation.civilianSkills || [])
    ]
  };

  return Object.entries(templates).reduce((acc, [variant, template]) => {
    const summary = template.summaryTemplate
      .replace('{years}', yearsOfService.toString())
      .replace('{militaryRole}', evaluation.jobTitle)
      .replace('{civilianRole}', evaluation.civilianJobTitle || 'civilian role');

    acc[variant] = {
      ...baseResume,
      summary,
      selectedSkills: prioritizeSkills(baseResume.selectedSkills, template.skillsEmphasis),
      evaluations: [{
        ...evaluation,
        responsibilities: [
          ...transformResponsibilities(evaluation.responsibilities, template.responsibilityTransformers),
          ...(evaluation.civilianResponsibilities || []).map(resp => 
            transformResponsibility(resp, template.responsibilityTransformers)
          )
        ]
      }],
      salary: evaluation.salary,
      outlook: evaluation.outlook
    };
    return acc;
  }, {} as Record<string, Resume>);
}

function prioritizeSkills(skills: string[], emphasis: string[]): string[] {
  return [...new Set(skills)].sort((a, b) => {
    const aEmphasis = emphasis.findIndex(e => 
      a.toLowerCase().includes(e.toLowerCase())
    );
    const bEmphasis = emphasis.findIndex(e => 
      b.toLowerCase().includes(e.toLowerCase())
    );
    
    if (aEmphasis === -1 && bEmphasis === -1) return 0;
    if (aEmphasis === -1) return 1;
    if (bEmphasis === -1) return -1;
    return aEmphasis - bEmphasis;
  });
}

function transformResponsibilities(
  responsibilities: string[],
  transformers: Record<string, string>
): string[] {
  return responsibilities.map(resp => transformResponsibility(resp, transformers));
}

function transformResponsibility(
  responsibility: string,
  transformers: Record<string, string>
): string {
  let transformed = responsibility.toLowerCase();
  Object.entries(transformers).forEach(([military, civilian]) => {
    const regex = new RegExp(`\\b${military}\\b`, 'gi');
    transformed = transformed.replace(regex, civilian);
  });
  return transformed.charAt(0).toUpperCase() + transformed.slice(1);
}