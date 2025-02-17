// Re-export all API functions
export {
  getUserProfile,
  updateUserProfile
} from './users';

export {
  getUserResumes
} from './resumes';

export {
  createMilitaryService,
  getMilitaryService,
  saveMilitaryInfo
} from './military';

export {
  createEvaluation,
  saveJobMatches
} from './evaluations';