import React from 'react';
import { Checkbox } from './ui/checkbox';

interface Props {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

// Comprehensive list of transferable military skills
const skillsList = {
  'Leadership & Management': [
    'Team Leadership',
    'Strategic Planning',
    'Personnel Management',
    'Decision Making',
    'Crisis Management',
    'Organizational Leadership',
    'Change Management',
    'Performance Evaluation'
  ],
  'Technical': [
    'System Administration',
    'Network Security',
    'Data Analysis',
    'Equipment Maintenance',
    'Technical Documentation',
    'Software Proficiency',
    'Cybersecurity',
    'IT Infrastructure'
  ],
  'Operations': [
    'Project Management',
    'Operations Management',
    'Supply Chain Management',
    'Quality Control',
    'Risk Management',
    'Process Improvement',
    'Resource Allocation',
    'Logistics Coordination'
  ],
  'Communication': [
    'Written Communication',
    'Verbal Communication',
    'Public Speaking',
    'Report Writing',
    'Training & Instruction',
    'Cross-functional Collaboration',
    'Stakeholder Management',
    'Technical Writing'
  ],
  'Analytical': [
    'Problem Solving',
    'Critical Thinking',
    'Data Analysis',
    'Strategic Planning',
    'Risk Assessment',
    'Performance Analysis',
    'Research & Analysis',
    'Decision Analysis'
  ]
};

export function SkillsSelector({ selectedSkills, onSkillsChange }: Props) {
  const handleSkillToggle = (skill: string, checked: boolean) => {
    if (checked) {
      onSkillsChange([...selectedSkills, skill]);
    } else {
      onSkillsChange(selectedSkills.filter(s => s !== skill));
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Select Your Skills</h3>
      <p className="text-sm text-gray-600">
        Choose the skills that best match your military experience
      </p>

      {Object.entries(skillsList).map(([category, skills]) => (
        <div key={category} className="space-y-3">
          <h4 className="font-medium text-gray-700">{category}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {skills.map(skill => (
              <label key={skill} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedSkills.includes(skill)}
                  onCheckedChange={(checked) => handleSkillToggle(skill, checked as boolean)}
                />
                <span className="text-sm">{skill}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-4 text-sm text-gray-600">
        Selected: {selectedSkills.length} skills
      </div>
    </div>
  );
}