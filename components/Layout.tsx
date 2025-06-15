import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MoonIcon, SunIcon, ChartBarIcon, CogIcon, BookOpenIcon, MusicalNoteIcon, PencilSquareIcon, SparklesIcon } from '../constants';
import { useUser } from '../contexts/UserContext';

interface LayoutProps {
  children: ReactNode;
}

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  currentPath: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label, currentPath }) => {
  const isActive = currentPath === to || (to === "/" && currentPath.startsWith("/#")) || (to === "/" && currentPath === ""); // Adjusted for HashRouter empty path
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-night-blue/20 transition-colors duration-200 ${
        isActive ? 'bg-night-blue text-white shadow-md' : 'text-gray-700 hover:text-night-blue'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { apiKeyPresent } = useUser();

  const navItems = [
    { to: '/', icon: <SunIcon className="w-6 h-6" />, label: 'Dashboard' },
    { to: '/assessment', icon: <SparklesIcon className="w-6 h-6" />, label: 'Evaluación IA' },
    { to: '/my-plan', icon: <MoonIcon className="w-6 h-6" />, label: 'Mi Plan de Sueño' },
    { to: '/log-sleep', icon: <PencilSquareIcon className="w-6 h-6" />, label: 'Registrar Sueño' },
    { to: '/insights', icon: <ChartBarIcon className="w-6 h-6" />, label: 'Análisis' },
    { to: '/mindfulness', icon: <BookOpenIcon className="w-6 h-6" />, label: 'Mindfulness' },
    { to: '/sounds', icon: <MusicalNoteIcon className="w-6 h-6" />, label: 'Sonidos' },
    { to: '/learn', icon: <BookOpenIcon className="w-6 h-6" />, label: 'Aprender' },
    { to: '/settings', icon: <CogIcon className="w-6 h-6" />, label: 'Ajustes' },
  ];

  return (
    <div className="flex h-screen bg-muted-gray overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-light-lavender/80 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'} p-4 space-y-6 flex flex-col`}>
        <div className="flex items-center justify-between">
           <Link to="/" className={`text-3xl font-bold text-night-blue ${isSidebarOpen ? 'block' : 'hidden'}`}>
            Sereno<span className="text-sky-blue">IA</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md hover:bg-night-blue/10 text-night-blue">
            {isSidebarOpen ? 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
              </svg>
             : 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            }
          </button>
        </div>
        
        <nav className="flex-grow space-y-2">
          {navItems.map(item => (
            <NavLink 
              key={item.to} 
              to={item.to} 
              icon={React.cloneElement(item.icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, { className: `w-6 h-6 ${isSidebarOpen ? '' : 'mx-auto'}` })} 
              label={isSidebarOpen ? item.label : ''} 
              currentPath={location.pathname}
            />
          ))}
        </nav>

        {!apiKeyPresent && isSidebarOpen && (
          <div className="mt-auto p-2 bg-red-100 border border-red-300 rounded-md text-red-700 text-xs">
            <p className="font-semibold">Advertencia:</p>
            <p>La API Key de Gemini no está configurada. Las funciones de IA no estarán disponibles.</p>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md p-4">
          <h1 className="text-2xl font-semibold text-night-blue">
            {navItems.find(item => item.to === location.pathname)?.label || 'SerenoIA'}
          </h1>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 bg-gradient-to-br from-sky-blue/20 via-calm-green/10 to-light-lavender/20">
          {children}
        </main>
        <footer className="bg-white shadow-inner p-3 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} SerenoIA. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
};

export default Layout;