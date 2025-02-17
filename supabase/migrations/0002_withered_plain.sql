/*
  # Add Resume Templates and User Preferences

  1. New Tables
    - `resume_templates` - Stores different resume template styles
    - `user_preferences` - Stores user preferences for resume generation

  2. Changes
    - Add template_id to job_matches table
    - Add preferences column to users table

  3. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
*/

-- Resume templates table
CREATE TABLE IF NOT EXISTS resume_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  style text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  default_template_id uuid REFERENCES resume_templates(id),
  notification_settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add template reference to job matches
ALTER TABLE job_matches 
ADD COLUMN IF NOT EXISTS template_id uuid REFERENCES resume_templates(id);

-- Enable RLS
ALTER TABLE resume_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Resume templates are viewable by all authenticated users"
  ON resume_templates
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own preferences"
  ON user_preferences
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Insert default templates
INSERT INTO resume_templates (name, style) VALUES
  ('Technical', 'technical'),
  ('Management', 'management'),
  ('Corporate', 'corporate')
ON CONFLICT DO NOTHING;