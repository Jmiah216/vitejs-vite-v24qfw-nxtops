-- First ensure developer role exists
DO $$ 
BEGIN
    INSERT INTO roles (name, description)
    VALUES ('developer', 'Developer access for testing and development')
    ON CONFLICT (name) DO NOTHING;
END $$;

-- Recreate is_developer function
CREATE OR REPLACE FUNCTION is_developer(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = user_id
    AND r.name = 'developer'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Clean up existing policies
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "resume_templates_insert_policy" ON resume_templates;
    DROP POLICY IF EXISTS "resume_templates_update_policy" ON resume_templates;
    DROP POLICY IF EXISTS "resume_templates_delete_policy" ON resume_templates;
    DROP POLICY IF EXISTS "user_preferences_insert_policy" ON user_preferences;
    DROP POLICY IF EXISTS "user_preferences_update_policy" ON user_preferences;
    DROP POLICY IF EXISTS "user_preferences_delete_policy" ON user_preferences;
    DROP POLICY IF EXISTS "users_delete_policy" ON users;
    DROP POLICY IF EXISTS "military_service_insert_policy" ON military_service;
    DROP POLICY IF EXISTS "military_service_update_policy" ON military_service;
    DROP POLICY IF EXISTS "military_service_delete_policy" ON military_service;
    DROP POLICY IF EXISTS "evaluations_insert_policy" ON evaluations;
    DROP POLICY IF EXISTS "evaluations_update_policy" ON evaluations;
    DROP POLICY IF EXISTS "evaluations_delete_policy" ON evaluations;
    DROP POLICY IF EXISTS "job_matches_insert_policy" ON job_matches;
    DROP POLICY IF EXISTS "job_matches_update_policy" ON job_matches;
    DROP POLICY IF EXISTS "job_matches_delete_policy" ON job_matches;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

-- Create new policies with developer access
CREATE POLICY "resume_templates_insert_policy" ON resume_templates
  FOR INSERT TO authenticated
  WITH CHECK (is_super_admin(auth.uid()) OR is_developer(auth.uid()));

CREATE POLICY "resume_templates_update_policy" ON resume_templates
  FOR UPDATE TO authenticated
  USING (is_super_admin(auth.uid()) OR is_developer(auth.uid()));

CREATE POLICY "resume_templates_delete_policy" ON resume_templates
  FOR DELETE TO authenticated
  USING (is_super_admin(auth.uid()) OR is_developer(auth.uid()));

CREATE POLICY "user_preferences_insert_policy" ON user_preferences
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() OR is_super_admin(auth.uid()) OR is_developer(auth.uid()));

CREATE POLICY "user_preferences_update_policy" ON user_preferences
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR is_super_admin(auth.uid()) OR is_developer(auth.uid()));

CREATE POLICY "user_preferences_delete_policy" ON user_preferences
  FOR DELETE TO authenticated
  USING (user_id = auth.uid() OR is_super_admin(auth.uid()) OR is_developer(auth.uid()));

CREATE POLICY "users_delete_policy" ON users
  FOR DELETE TO authenticated
  USING (auth.uid() = id OR is_super_admin(auth.uid()) OR is_developer(auth.uid()));

CREATE POLICY "military_service_insert_policy" ON military_service
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() OR is_super_admin(auth.uid()) OR is_developer(auth.uid()));

CREATE POLICY "military_service_update_policy" ON military_service
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR is_super_admin(auth.uid()) OR is_developer(auth.uid()));

CREATE POLICY "military_service_delete_policy" ON military_service
  FOR DELETE TO authenticated
  USING (user_id = auth.uid() OR is_super_admin(auth.uid()) OR is_developer(auth.uid()));

CREATE POLICY "evaluations_insert_policy" ON evaluations
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM military_service
      WHERE military_service.id = military_service_id
      AND military_service.user_id = auth.uid()
    ) OR is_super_admin(auth.uid()) OR is_developer(auth.uid())
  );

CREATE POLICY "evaluations_update_policy" ON evaluations
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM military_service
      WHERE military_service.id = military_service_id
      AND military_service.user_id = auth.uid()
    ) OR is_super_admin(auth.uid()) OR is_developer(auth.uid())
  );

CREATE POLICY "evaluations_delete_policy" ON evaluations
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM military_service
      WHERE military_service.id = military_service_id
      AND military_service.user_id = auth.uid()
    ) OR is_super_admin(auth.uid()) OR is_developer(auth.uid())
  );

CREATE POLICY "job_matches_insert_policy" ON job_matches
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM evaluations
      JOIN military_service ON evaluations.military_service_id = military_service.id
      WHERE evaluations.id = evaluation_id
      AND military_service.user_id = auth.uid()
    ) OR is_super_admin(auth.uid()) OR is_developer(auth.uid())
  );

CREATE POLICY "job_matches_update_policy" ON job_matches
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM evaluations
      JOIN military_service ON evaluations.military_service_id = military_service.id
      WHERE evaluations.id = evaluation_id
      AND military_service.user_id = auth.uid()
    ) OR is_super_admin(auth.uid()) OR is_developer(auth.uid())
  );

CREATE POLICY "job_matches_delete_policy" ON job_matches
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM evaluations
      JOIN military_service ON evaluations.military_service_id = military_service.id
      WHERE evaluations.id = evaluation_id
      AND military_service.user_id = auth.uid()
    ) OR is_super_admin(auth.uid()) OR is_developer(auth.uid())
  );