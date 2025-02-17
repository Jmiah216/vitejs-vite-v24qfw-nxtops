/*
  # Additional RLS Policies
  
  1. Security
    - Adds policies for military service updates
    - Adds policies for evaluation inserts
    - Adds policies for job match inserts/updates
  
  2. Changes
    - Users can update their own military service records
    - Users can insert evaluations for their own military service
    - Users can insert and update job matches for their own evaluations
*/

DO $$ 
BEGIN
    CREATE POLICY "Users can update own military service"
        ON military_service FOR UPDATE
        TO authenticated
        USING (user_id = auth.uid());

    CREATE POLICY "Users can insert own evaluations"
        ON evaluations FOR INSERT
        TO authenticated
        WITH CHECK (EXISTS (
            SELECT 1 FROM military_service
            WHERE military_service.id = military_service_id
            AND military_service.user_id = auth.uid()
        ));

    CREATE POLICY "Users can insert own job matches"
        ON job_matches FOR INSERT
        TO authenticated
        WITH CHECK (EXISTS (
            SELECT 1 FROM evaluations
            JOIN military_service ON evaluations.military_service_id = military_service.id
            WHERE evaluations.id = evaluation_id
            AND military_service.user_id = auth.uid()
        ));

    CREATE POLICY "Users can update own job matches"
        ON job_matches FOR UPDATE
        TO authenticated
        USING (EXISTS (
            SELECT 1 FROM evaluations
            JOIN military_service ON evaluations.military_service_id = military_service.id
            WHERE evaluations.id = evaluation_id
            AND military_service.user_id = auth.uid()
        ));
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;