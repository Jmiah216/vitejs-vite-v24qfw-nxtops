import { Link } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthProvider';
import { Button } from '../ui/button';

export function Navbar() {
  const { user } = useAuthContext();

  return (
    <nav className="bg-military-dark shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/logo.svg" 
                alt="Next OPS"
                className="h-12 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-military-gold">NEXT OPS</span>
                <span className="text-sm text-military-green">MILITARY TRANSITIONING MEMBERS</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {user && (
              <>
                <Link to="/resumes">
                  <Button 
                    variant="outline" 
                    className="text-military-gold border-military-gold hover:bg-military-green hover:border-military-green hover:text-white"
                  >
                    My Resumes
                  </Button>
                </Link>
                <Link 
                  to="/profile" 
                  className="text-military-gold hover:text-military-green transition-colors"
                >
                  Profile
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}