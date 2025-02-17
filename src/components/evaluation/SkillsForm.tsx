import React from 'react';
import { Checkbox } from '../ui/checkbox';

interface Props {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
}

const skillCategories = {
  Leadership: [
    'Team Leadership',
    'Strategic Planning',
    'Personnel Management',
    'Decision Making',
    'Crisis Management',
    'Change Management',
    'Performance Evaluation'
  ],
  Technical: [
    'System Administration',
    'Network Security',
    'Data Analysis',
    'Equipment Maintenance',
    'Technical Documentation',
    'Software Proficiency',
    'Cybersecurity'
  ],
  Operations: [
    'Project Management',
    'Operations Management',
    'Supply Chain Management',
    'Quality Control',
    'Risk Management',
    'Process Improvement',
    'Resource Allocation'
  ],
  Communication: [
    'Written Communication',
    'Verbal Communication',
    'Public Speaking',
    'Report Writing',
    'Training & Instruction',
    'Cross-functional Collaboration',
    'Technical Writing'
  ],
  Analytical: [
    'Problem Solving',
    'Critical Thinking',
    'Data Analysis',
    'Strategic Planning',
    'Risk Assessment',
    'Performance Analysis',
    'Research & Analysis'
  ]
};

export function SkillsForm({ selectedSkills, onChange }: Props) {
  const handleSkillToggle = (skill: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedSkills, skill]);
    } else {
      onChange(selectedSkills.filter(s => s !== skill));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Skills Selection</h3>
        <span className="text-sm text-gray-500">
          Selected: {selectedSkills.length} skills
        </span>
      </div>

      <div className="space-y-8">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category} className="space-y-4">
            <h4 className="font-medium text-gray-900">{category} Skills</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map(skill => (
                <label key={skill} className="flex items-center space-x-3">
                  <Checkbox
                    checked={selectedSkills.includes(skill)}
                    onCheckedChange={(checked) => handleSkillToggle(skill, checked as boolean)}
                  />
                  <span className="text-sm text-gray-700">{skill}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}