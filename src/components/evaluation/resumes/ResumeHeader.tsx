import React from 'react';
import { PersonalInfo, MilitaryService } from '../../../types';
import { translateMilitaryJobTitle } from '../../../lib/utils/militaryTranslator';

interface Props {
  personalInfo: PersonalInfo;
  militaryService: MilitaryService;
  variant: 'technical' | 'management' | 'corporate';
}

export function ResumeHeader({ personalInfo, militaryService, variant }: Props) {
  const civilianTitle = translateMilitaryJobTitle(
    militaryService.primaryCommand.jobTitle,
    variant
  );

  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
      <h2 className="text-xl text-gray-700 mt-1">{civilianTitle}</h2>
      <div className="text-gray-600 mt-2">
        <p>{personalInfo.email} • {personalInfo.phone}</p>
        <p>{personalInfo.location}</p>
      </div>
    </div>
  );
}