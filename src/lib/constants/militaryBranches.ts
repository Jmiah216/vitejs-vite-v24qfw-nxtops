export const militaryBranches = [
  "Army",
  "Navy",
  "Air Force",
  "Marine Corps",
  "Space Force"
] as const;

export type MilitaryBranch = typeof militaryBranches[number];