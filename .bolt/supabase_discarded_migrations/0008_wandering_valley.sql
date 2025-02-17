/*
  # Database Schema Updates
  
  1. Security Policies
    - Drop and recreate user access policies
    - Ensure proper data access control
  
  2. Tables
    - Maintain existing table structures
    - Add necessary indexes
    - Set up RLS
*/

-- Drop existing policies safely
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can read own data" ON users;
    DROP POLICY IF EXISTS "Users can update own data" ON users;
    DROP POLICY IF EXISTS "Users can read own military service" ON military_service;
    DROP POLICY IF EXISTS "Users can insert own military service" ON military_service;
    DROP POLICY IF EXISTS "Users can update own military service" ON military_service;
    DROP POLICY IF EXISTS "Users can read own evaluations" ON evaluations;
    DROP POLICY IF EXISTS "Users can insert own evaluations" ON evaluations;
    DROP POLICY IF EXISTS "Users can read own job matches" ON job_matches;
    DROP POLICY IF EXISTS "Resume templates are viewable by all" ON resume_templates;
    DROP POLICY IF EXISTS "Users can manage own resumes" ON resumes;
    DROP POLICY IF EXISTS "Users can manage own resume versions" ON resume_versions;
    DROP POLICY IF EXISTS "Users can manage own preferences" ON user_preferences;
EXCEPTION
    WHEN undefined_table THEN null;
    WHEN undefined_object THEN null;
END $$;

-- Create or update policies
CREATE POLICY "Users can read own data" 
    ON users FOR SELECT 
    TO authenticated 
    USING (auth.uid() = id);

CREATE POLICY "Users can update own data" 
    ON users FOR UPDATE 
    TO authenticated 
    USING (auth.uid() = id);

CREATE POLICY "Users can read own military service" 
    ON military_service FOR SELECT 
    TO authenticated 
    USING (user_id = auth.uid());

CREATE POLICY "Users can insert own military service" 
    ON military_service FOR INSERT 
    TO authenticated 
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own military service" 
    ON military_service FOR UPDATE 
    TO authenticated 
    USING (user_id = auth.uid());

CREATE POLICY "Users can read own evaluations" 
    ON evaluations FOR SELECT 
    TO authenticated 
    USING (
        EXISTS (
            SELECT 1 FROM military_service 
            WHERE military_service.id = evaluations.military_service_id 
            AND military_service.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own evaluations" 
    ON evaluations FOR INSERT 
    TO authenticated 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM military_service 
            WHERE military_service.id = military_service_id 
            AND military_service.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can read own job matches" 
    ON job_matches FOR SELECT 
    TO authenticated 
    USING (
        EXISTS (
            SELECT 1 FROM evaluations 
            JOIN military_service ON evaluations.military_service_id = military_service.id 
            WHERE evaluations.id = job_matches.evaluation_id 
            AND military_service.user_id = auth.uid()
        )
    );

CREATE POLICY "Resume templates are viewable by all" 
    ON resume_templates FOR SELECT 
    TO authenticated 
    USING (true);

-- Create or replace indexes
CREATE INDEX IF NOT EXISTS idx_military_service_user_id 
    ON military_service(user_id);

CREATE INDEX IF NOT EXISTS idx_evaluations_military_service_id 
    ON evaluations(military_service_id);

CREATE INDEX IF NOT EXISTS idx_job_matches_evaluation_id 
    ON job_matches(evaluation_id);

-- Ensure RLS is enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE military_service ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_templates ENABLE ROW LEVEL SECURITY;