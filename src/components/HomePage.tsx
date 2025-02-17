import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export function HomePage() {
  const navigate = useNavigate();
  
  const benefits = [
    {
      title: "Military Skills Translation",
      description: "Convert your military experience into recognized IT qualifications that civilian employers value",
      icon: "🎖️"
    },
    {
      title: "Security Clearance Leverage",
      description: "Learn how your security clearance opens doors to specialized IT positions in defense and government sectors",
      icon: "🔐"
    },
    {
      title: "Veteran-Focused Career Paths",
      description: "Discover IT career paths that specifically value your military background and training",
      icon: "💼"
    }
  ];

  const militaryBranches = [
    {
      name: 'Army',
      motto: 'This We\'ll Defend',
      color: 'from-army-dark to-army-light',
      image: '/flags/army.svg'
    },
    {
      name: 'Navy',
      motto: 'Semper Fortis',
      color: 'from-navy-dark to-navy-light',
      image: '/flags/navy.svg'
    },
    {
      name: 'Air Force',
      motto: 'Aim High... Fly-Fight-Win',
      color: 'from-airforce-dark to-airforce-light',
      image: '/flags/airforce.svg'
    },
    {
      name: 'Marines',
      motto: 'Semper Fidelis',
      color: 'from-marines-dark to-marines-light',
      image: '/flags/marines.svg'
    },
    {
      name: 'Space Force',
      motto: 'Semper Supra',
      color: 'from-spaceforce-dark to-spaceforce-light',
      image: '/flags/spaceforce.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-military-dark to-military-darker py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Mission: Civilian IT Career
          </h1>
          <p className="text-xl text-military-light mb-8 max-w-3xl mx-auto">
            Your military service has equipped you with invaluable skills. We'll help you translate your military expertise into a successful civilian IT career, maintaining the same level of excellence you demonstrated in uniform.
          </p>
          <Button
            onClick={() => navigate('/evaluation')}
            className="bg-military-accent text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-military-accent-dark transition-colors shadow-lg"
          >
            Start Your IT Career Mission
          </Button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-military-dark text-center mb-4">
          Strategic Advantages for Service Members
        </h2>
        <p className="text-military-text text-center mb-12 max-w-3xl mx-auto">
          Your military background provides unique advantages in the IT sector. We'll help you leverage these strengths for mission success in the civilian workforce.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-military-accent">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-military-dark mb-2">{benefit.title}</h3>
              <p className="text-military-text">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Service Branches */}
      <div className="bg-military-lightest py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-military-dark text-center mb-4">
            All Branches, One Mission
          </h2>
          <p className="text-military-text text-center mb-12 max-w-3xl mx-auto">
            Whether you served in the Army, Navy, Air Force, Marines, or Space Force, your experience has prepared you for success in the IT field.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {militaryBranches.map((branch) => (
              <div
                key={branch.name}
                className="relative overflow-hidden rounded-lg shadow-lg group h-64 bg-white"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${branch.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                <img
                  src={branch.image}
                  alt={`${branch.name} insignia`}
                  className="absolute top-4 right-4 h-16 w-16 opacity-50"
                />
                <div className="relative h-full p-8 flex flex-col justify-between">
                  <h3 className="text-2xl font-bold text-white">{branch.name}</h3>
                  <p className="text-lg italic text-white/90">{branch.motto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action - Without Button */}
      <div className="bg-military-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Deploy Your IT Career?
          </h2>
          <p className="text-xl text-military-light max-w-3xl mx-auto">
            Let's apply your military discipline, leadership, and technical expertise to launch your civilian IT career. Our mission is to ensure your successful transition.
          </p>
        </div>
      </div>
    </div>
  );
}