// Get API key from environment variable
export const ONET_API_KEY = import.meta.env.VITE_ONET_API_KEY;

// Validate API key is present
if (!ONET_API_KEY) {
  console.warn('VITE_ONET_API_KEY environment variable is not set. The application will use mock data for development.');
}