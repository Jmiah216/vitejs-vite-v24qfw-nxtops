import { useState } from 'react';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import { Skills } from '../../../types/military';

interface Props {
  skills: Skills;
  onChange: (skills: Skills) => void;
}

const skillCategories = {
  'Leadership & Management': [
    'Team Leadership',
    'Personnel Management', 
    'Crisis Management',
    'Change Management',
    'Strategic Planning',
    'Decision Making',
    'Organizational Leadership',
    'Performance Evaluation'
  ],
  'Technical': [
    'System Administration',
    'Data Analysis',
    'Technical Documentation', 
    'Cybersecurity',
    'Network Security',
    'Equipment Maintenance',
    'Software Proficiency',
    'IT Infrastructure'
  ],
  'Operations': [
    'Project Management',
    'Supply Chain Management',
    'Risk Management',
    'Resource Allocation',
    'Operations Management', 
    'Quality Control',
    'Process Improvement',
    'Logistics Coordination'
  ],
  'Communication': [
    'Written Communication',
    'Public Speaking',
    'Training & Instruction',
    'Stakeholder Management',
    'Verbal Communication',
    'Report Writing',
    'Cross-functional Collaboration',
    'Technical Writing'
  ],
  'Analytical': [
    'Problem Solving',
    'Data Analysis',
    'Critical Thinking',
    'Strategic Planning',
    'Research & Analysis',
    'Performance Analysis',
    'Risk Assessment',
    'Decision Analysis'
  ]
};

export function SkillsSection({ skills = {
  leadership_management: [],
  technical: [],
  operations: [],
  communication: [],
  analytical: []
}, onChange }: Props) {
  const handleSkillToggle = (category: keyof Skills, skill: string, checked: boolean) => {
    const updatedSkills = { ...skills };
    if (checked) {
      updatedSkills[category] = [...(updatedSkills[category] || []), skill];
    } else {
      updatedSkills[category] = (updatedSkills[category] || []).filter(s => s !== skill);
    }
    onChange(updatedSkills);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold">Skills</h2>

      {Object.entries(skillCategories).map(([category, categorySkills]) => (
        <div key={category} className="space-y-4">
          <h3 className="font-medium text-gray-900">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categorySkills.map((skill) => (
              <label
                key={skill}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
              >
                <Checkbox
                  checked={skills[category.toLowerCase().replace(/ & /g, '_') as keyof Skills]?.includes(skill)}
                  onCheckedChange={(checked) => 
                    handleSkillToggle(
                      category.toLowerCase().replace(/ & /g, '_') as keyof Skills,
                      skill,
                      checked as boolean
                    )
                  }
                />
                <span className="text-sm text-gray-700">{skill}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}