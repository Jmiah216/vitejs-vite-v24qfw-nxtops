import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function Layout() {
  return (
    <div className="min-h-screen bg-military-lightest">
      <Navbar />
      <main className="pt-6">
        <Outlet />
      </main>
      <footer className="bg-military-dark text-military-gold py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img 
                src="/logo.svg" 
                alt="Next OPS"
                className="h-10 w-auto"
              />
              <div>
                <p className="font-bold text-military-gold">NEXT OPS</p>
                <p className="text-sm text-military-green">MILITARY TRANSITIONING MEMBERS</p>
              </div>
            </div>
            <div className="text-sm text-military-gold">
              © {new Date().getFullYear()} Next OPS. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}