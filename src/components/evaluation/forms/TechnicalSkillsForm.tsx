import { Checkbox } from '../../ui/checkbox';
import { technicalSkills } from '../../../lib/constants';

interface Props {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
}

export function TechnicalSkillsForm({ selectedSkills, onChange }: Props) {
  const handleSkillToggle = (skill: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedSkills, skill]);
    } else {
      onChange(selectedSkills.filter(s => s !== skill));
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
      <p className="text-sm text-gray-500 mb-4">
        Select the technical skills that best match your experience.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {technicalSkills.map(skill => (
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
  );
}