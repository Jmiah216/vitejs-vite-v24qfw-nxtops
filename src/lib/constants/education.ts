import { degrees, Degree } from './degrees';
import { studyFields, StudyField } from './studyFields';

export interface EducationConstants {
  degrees: readonly Degree[];
  studyFields: readonly StudyField[];
}

export const educationConstants: EducationConstants = {
  degrees,
  studyFields
};

export type { Degree, StudyField };