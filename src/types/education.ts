export interface Education {
  type: 'College' | 'High School' | 'Vocational';
  school: string;
  degree?: string;
  field?: string;
  startDate: string;
  endDate: string;
}