import React, { useState } from 'react';
import { PersonalInfo, MilitaryService, Education } from '../../types';
import { Button } from '../ui/button';
import { PersonalInfoForm } from './PersonalInfoForm';
import { MilitaryServiceForm } from './MilitaryServiceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';

interface Props {
  personalInfo: PersonalInfo;
  militaryService: MilitaryService;
  education: Education[];
  skills: string[];
  onSave: (updates: {
    personalInfo: PersonalInfo;
    militaryService: MilitaryService;
    education: Education[];
    skills: string[];
  }) => void;
  onCancel: () => void;
}

export function ResumeEditor({
  personalInfo: initialPersonalInfo,
  militaryService: initialMilitaryService,
  education: initialEducation,
  skills: initialSkills,
  onSave,
  onCancel
}: Props) {
  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
  const [militaryService, setMilitaryService] = useState(initialMilitaryService);
  const [education, setEducation] = useState(initialEducation);
  const [skills, setSkills] = useState(initialSkills);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      personalInfo,
      militaryService,
      education,
      skills
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Edit Resume</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <PersonalInfoForm
            value={personalInfo}
            onChange={setPersonalInfo}
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <MilitaryServiceForm
            value={militaryService}
            onChange={setMilitaryService}
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <EducationForm
            value={education}
            onChange={setEducation}
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <SkillsForm
            selectedSkills={skills}
            onChange={setSkills}
          />
        </div>
      </form>
    </div>
  );
}