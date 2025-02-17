/*
  # Consolidate Policies Migration

  1. Changes
    - Combines policies from previous 0009 migrations
    - Adds missing policies for all tables
    - Ensures no duplicate policies
    
  2. Security
    - Maintains existing security model
    - Includes super admin access
*/

-- Add missing policies for resume_templates table
DO $$ 
BEGIN
    CREATE POLICY "resume_templates_insert_policy" ON resume_templates
      FOR INSERT TO authenticated
      WITH CHECK (is_super_admin(auth.uid()));

    CREATE POLICY "resume_templates_update_policy" ON resume_templates
      FOR UPDATE TO authenticated
      USING (is_super_admin(auth.uid()));

    CREATE POLICY "resume_templates_delete_policy" ON resume_templates
      FOR DELETE TO authenticated
      USING (is_super_admin(auth.uid()));

    -- Add missing policies for user_preferences table
    CREATE POLICY "user_preferences_insert_policy" ON user_preferences
      FOR INSERT TO authenticated
      WITH CHECK (user_id = auth.uid() OR is_super_admin(auth.uid()));

    CREATE POLICY "user_preferences_update_policy" ON user_preferences
      FOR UPDATE TO authenticated
      USING (user_id = auth.uid() OR is_super_admin(auth.uid()));

    CREATE POLICY "user_preferences_delete_policy" ON user_preferences
      FOR DELETE TO authenticated
      USING (user_id = auth.uid() OR is_super_admin(auth.uid()));

    -- Add missing policies for users table
    CREATE POLICY "users_delete_policy" ON users
      FOR DELETE TO authenticated
      USING (auth.uid() = id OR is_super_admin(auth.uid()));

    -- Add missing policies for military_service table
    CREATE POLICY "military_service_insert_policy" ON military_service
      FOR INSERT TO authenticated
      WITH CHECK (user_id = auth.uid() OR is_super_admin(auth.uid()));

    CREATE POLICY "military_service_update_policy" ON military_service
      FOR UPDATE TO authenticated
      USING (user_id = auth.uid() OR is_super_admin(auth.uid()));

    CREATE POLICY "military_service_delete_policy" ON military_service
      FOR DELETE TO authenticated
      USING (user_id = auth.uid() OR is_super_admin(auth.uid()));

    -- Add missing policies for evaluations table
    CREATE POLICY "evaluations_insert_policy" ON evaluations
      FOR INSERT TO authenticated
      WITH CHECK (EXISTS (
        SELECT 1 FROM military_service
        WHERE military_service.id = military_service_id
        AND military_service.user_id = auth.uid()
      ) OR is_super_admin(auth.uid()));

    CREATE POLICY "evaluations_update_policy" ON evaluations
      FOR UPDATE TO authenticated
      USING (EXISTS (
        SELECT 1 FROM military_service
        WHERE military_service.id = military_service_id
        AND military_service.user_id = auth.uid()
      ) OR is_super_admin(auth.uid()));

    CREATE POLICY "evaluations_delete_policy" ON evaluations
      FOR DELETE TO authenticated
      USING (EXISTS (
        SELECT 1 FROM military_service
        WHERE military_service.id = military_service_id
        AND military_service.user_id = auth.uid()
      ) OR is_super_admin(auth.uid()));

    -- Add missing policies for job_matches table
    CREATE POLICY "job_matches_insert_policy" ON job_matches
      FOR INSERT TO authenticated
      WITH CHECK (EXISTS (
        SELECT 1 FROM evaluations
        JOIN military_service ON evaluations.military_service_id = military_service.id
        WHERE evaluations.id = evaluation_id
        AND military_service.user_id = auth.uid()
      ) OR is_super_admin(auth.uid()));

    CREATE POLICY "job_matches_update_policy" ON job_matches
      FOR UPDATE TO authenticated
      USING (EXISTS (
        SELECT 1 FROM evaluations
        JOIN military_service ON evaluations.military_service_id = military_service.id
        WHERE evaluations.id = evaluation_id
        AND military_service.user_id = auth.uid()
      ) OR is_super_admin(auth.uid()));

    CREATE POLICY "job_matches_delete_policy" ON job_matches
      FOR DELETE TO authenticated
      USING (EXISTS (
        SELECT 1 FROM evaluations
        JOIN military_service ON evaluations.military_service_id = military_service.id
        WHERE evaluations.id = evaluation_id
        AND military_service.user_id = auth.uid()
      ) OR is_super_admin(auth.uid()));
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;