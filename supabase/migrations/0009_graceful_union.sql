/*
  # Template and Preferences Policies

  1. Security
    - Add CRUD policies for resume templates table
    - Add CRUD policies for user preferences table
    
  2. Changes
    - Restrict template management to super admins
    - Allow users to manage their preferences
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
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add missing policies for user_preferences table
DO $$ 
BEGIN
    CREATE POLICY "user_preferences_insert_policy" ON user_preferences
      FOR INSERT TO authenticated
      WITH CHECK (user_id = auth.uid() OR is_super_admin(auth.uid()));

    CREATE POLICY "user_preferences_update_policy" ON user_preferences
      FOR UPDATE TO authenticated
      USING (user_id = auth.uid() OR is_super_admin(auth.uid()));

    CREATE POLICY "user_preferences_delete_policy" ON user_preferences
      FOR DELETE TO authenticated
      USING (user_id = auth.uid() OR is_super_admin(auth.uid()));
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;