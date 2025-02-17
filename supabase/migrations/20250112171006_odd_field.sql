-- Update military_skills table with new categories
ALTER TABLE military_skills
DROP CONSTRAINT IF EXISTS military_skills_category_check;

ALTER TABLE military_skills
ADD CONSTRAINT military_skills_category_check
CHECK (category IN (
  'leadership_management',
  'technical',
  'operations',
  'communication',
  'analytical'
));

-- Update existing records to match new categories
UPDATE military_skills
SET category = 'leadership_management'
WHERE category = 'leadership';

-- Create index for faster category lookups
CREATE INDEX IF NOT EXISTS idx_military_skills_category
ON military_skills(category);