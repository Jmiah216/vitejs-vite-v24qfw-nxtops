/*
  # Performance Indexes
  
  Adds indexes for foreign key columns to improve query performance
*/

DO $$
BEGIN
    CREATE INDEX IF NOT EXISTS idx_military_service_user_id 
        ON military_service(user_id);
    
    CREATE INDEX IF NOT EXISTS idx_evaluations_military_service_id 
        ON evaluations(military_service_id);
    
    CREATE INDEX IF NOT EXISTS idx_job_matches_evaluation_id 
        ON job_matches(evaluation_id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;