/*
  # Add Resume Storage Support

  1. New Tables
    - `resumes`
      - Stores user-generated resumes
      - Links to military service and job matches
      - Supports multiple versions and templates
    - `resume_versions`
      - Stores different versions of each resume
      - Tracks content and formatting changes
      - Maintains version history

  2. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
    - Restrict access to own resumes only

  3. Changes
    - Add resume reference to job_matches
    - Add version tracking fields
*/

-- Resumes table
CREATE TABLE IF NOT EXISTS resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  military_service_id uuid REFERENCES military_service(id) NOT NULL,
  title text NOT NULL,
  description text,
  template_style text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Resume versions table
CREATE TABLE IF NOT EXISTS resume_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id uuid REFERENCES resumes(id) NOT NULL,
  version_number integer NOT NULL,
  content jsonb NOT NULL,
  format_settings jsonb DEFAULT '{}',
  is_current boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(resume_id, version_number)
);

-- Add resume reference to job matches
ALTER TABLE job_matches
ADD COLUMN IF NOT EXISTS resume_id uuid REFERENCES resumes(id);

-- Enable Row Level Security
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_versions ENABLE ROW LEVEL SECURITY;

-- Create security policies for resumes
CREATE POLICY "Users can read own resumes"
  ON resumes FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own resumes"
  ON resumes FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own resumes"
  ON resumes FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own resumes"
  ON resumes FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create security policies for resume versions
CREATE POLICY "Users can read own resume versions"
  ON resume_versions FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM resumes
    WHERE resumes.id = resume_versions.resume_id
    AND resumes.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own resume versions"
  ON resume_versions FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM resumes
    WHERE resumes.id = resume_versions.resume_id
    AND resumes.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own resume versions"
  ON resume_versions FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM resumes
    WHERE resumes.id = resume_versions.resume_id
    AND resumes.user_id = auth.uid()
  ));

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resume_versions_resume_id ON resume_versions(resume_id);
CREATE INDEX IF NOT EXISTS idx_job_matches_resume_id ON job_matches(resume_id);

-- Add trigger to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_resumes_updated_at
    BEFORE UPDATE ON resumes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resume_versions_updated_at
    BEFORE UPDATE ON resume_versions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();