import { useState, useEffect } from 'react';
import { verifyDatabaseSetup } from '../lib/supabase/verify';
import { Button } from './ui/button';

export function DatabaseStatus() {
  const [status, setStatus] = useState<{
    success: boolean;
    tables?: { [key: string]: number };
    error?: string;
  } | null>(null);
  const [checking, setChecking] = useState(true);

  const checkConnection = async () => {
    setChecking(true);
    try {
      const result = await verifyDatabaseSetup();
      setStatus(result);
    } catch (error) {
      setStatus({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  if (checking) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
          <span>Checking database connection...</span>
        </div>
      </div>
    );
  }

  if (!status?.success) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold">Database Connection Error</h3>
          <p>{status?.error || 'Failed to connect to database'}</p>
          <Button 
            onClick={checkConnection}
            variant="outline" 
            className="self-start"
          >
            Retry Connection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-50 text-green-700 rounded-lg">
      <div className="flex flex-col space-y-2">
        <h3 className="font-semibold">Database Connected Successfully</h3>
        <ul className="mt-2 space-y-1">
          <li>Users: {status.tables?.users || 0}</li>
          <li>Military Service Records: {status.tables?.military_service || 0}</li>
          <li>Resume Templates: {status.tables?.templates || 0}</li>
        </ul>
        <Button 
          onClick={checkConnection}
          variant="outline" 
          className="self-start"
        >
          Refresh Status
        </Button>
      </div>
    </div>
  );
}