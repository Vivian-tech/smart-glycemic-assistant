
import React from 'react';
import { View } from '../types';

interface Props {
  currentView: View;
  setView: (view: View) => void;
}

const Navigation: React.FC<Props> = ({ currentView, setView }) => {
  const navItems: { view: View; icon: string; label: string }[] = [
    { view: 'dashboard', icon: 'fa-home', label: 'Home' },
    { view: 'chat', icon: 'fa-comment-medical', label: 'Ask AI' },
    { view: 'food', icon: 'fa-camera', label: 'Scan' },
    { view: 'doctors', icon: 'fa-user-md', label: 'Care' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t border-gray-100 flex justify-around p-3 pb-6 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
      {navItems.map((item) => (
        <button
          key={item.view}
          onClick={() => setView(item.view)}
          className={`flex flex-col items-center gap-1 transition-all ${
            currentView === item.view ? 'text-blue-600 scale-110' : 'text-gray-400'
          }`}
        >
          <i className={`fas ${item.icon} text-xl`}></i>
          <span className="text-[10px] font-bold uppercase tracking-wide">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
