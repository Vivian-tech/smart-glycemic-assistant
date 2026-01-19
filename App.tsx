
import React, { useState, useEffect } from 'react';
import { View, UserProfile } from './types';
import Dashboard from './components/Dashboard';
import Onboarding from './components/Onboarding';
import ChatAssistant from './components/ChatAssistant';
import FoodScanner from './components/FoodScanner';
import DoctorList from './components/DoctorList';
import RemoteMonitoring from './components/RemoteMonitoring';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [view, setView] = useState<View>('onboarding');
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Check local storage for existing session
    const savedUser = localStorage.getItem('glucocare_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setView('dashboard');
    }
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('glucocare_user', JSON.stringify(profile));
    setView('dashboard');
  };

  const renderView = () => {
    if (!user && view !== 'onboarding') {
      return <Onboarding onComplete={handleOnboardingComplete} />;
    }

    switch (view) {
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'dashboard':
        return <Dashboard user={user!} />;
      case 'chat':
        return <ChatAssistant />;
      case 'food':
        return <FoodScanner />;
      case 'doctors':
        return <DoctorList />;
      case 'monitoring':
        return <RemoteMonitoring />;
      default:
        return <Dashboard user={user!} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-lg mx-auto shadow-xl">
      <header className="bg-blue-600 text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <i className="fas fa-heartbeat"></i> GlucoCare AI
        </h1>
        {user && (
          <button 
            onClick={() => setView('monitoring')}
            className="bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded-full text-sm font-medium transition-colors"
          >
            <i className="fas fa-users mr-1"></i> Family
          </button>
        )}
      </header>

      <main className="flex-grow pb-24 overflow-y-auto">
        {renderView()}
      </main>

      {view !== 'onboarding' && <Navigation currentView={view} setView={setView} />}
    </div>
  );
};

export default App;
