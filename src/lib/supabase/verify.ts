import { supabase } from './client';

export async function verifyDatabaseSetup() {
  try {
    // Test connection with a simple query
    const { error: connectionError } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (connectionError) {
      throw new Error(`Connection error: ${connectionError.message}`);
    }

    // Check each required table
    const tables = ['users', 'military_service', 'evaluations', 'job_matches', 'resume_templates'];
    const counts: { [key: string]: number } = {};

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('count')
        .limit(1);

      if (error) {
        throw new Error(`Error accessing ${table} table: ${error.message}`);
      }

      counts[table] = data?.[0]?.count || 0;
    }

    // Verify resume templates exist
    const { data: templates, error: templatesError } = await supabase
      .from('resume_templates')
      .select('style');

    if (templatesError) {
      throw new Error(`Error checking templates: ${templatesError.message}`);
    }

    const requiredTemplates = ['technical', 'management', 'corporate'];
    const missingTemplates = requiredTemplates.filter(style => 
      !templates?.some(t => t.style === style)
    );

    if (missingTemplates.length > 0) {
      throw new Error(`Missing required templates: ${missingTemplates.join(', ')}`);
    }

    return {
      success: true,
      tables: counts
    };
  } catch (error) {
    console.error('Database verification failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown database error'
    };
  }
}