
import React, { useState, useEffect } from 'react';
import DailyBriefing from '@/components/DailyBriefing';
import EmergencyPanel from '@/components/EmergencyPanel';
import MedicationReminder from '@/components/MedicationReminder';
import CaregiverDashboard from '@/components/CaregiverDashboard';
import SimpleNavigation from '@/components/SimpleNavigation';
import VoiceButton from '@/components/VoiceButton';
import { Volume2 } from 'lucide-react';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isVoiceMode, setIsVoiceMode] = useState(false);

  useEffect(() => {
    // Welcome message on first load
    const hasWelcomed = localStorage.getItem('hasWelcomed');
    if (!hasWelcomed && 'speechSynthesis' in window) {
      setTimeout(() => {
        speechSynthesis.speak(new SpeechSynthesisUtterance(
          "Welcome to ZeroClick! Your voice-first assistant. Say 'daily briefing' to start, or use the big buttons below."
        ));
        localStorage.setItem('hasWelcomed', 'true');
      }, 1000);
    }
  }, []);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('daily') || lowerCommand.includes('briefing') || lowerCommand.includes('news')) {
      setCurrentPage('daily');
    } else if (lowerCommand.includes('medicine') || lowerCommand.includes('medication') || lowerCommand.includes('pills')) {
      setCurrentPage('medicine');
    } else if (lowerCommand.includes('emergency') || lowerCommand.includes('help') || lowerCommand.includes('call')) {
      setCurrentPage('emergency');
    } else if (lowerCommand.includes('caregiver') || lowerCommand.includes('family') || lowerCommand.includes('dashboard')) {
      setCurrentPage('caregiver');
    } else if (lowerCommand.includes('home') || lowerCommand.includes('main')) {
      setCurrentPage('home');
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'daily':
        return <DailyBriefing />;
      case 'medicine':
        return <MedicationReminder />;
      case 'emergency':
        return <EmergencyPanel />;
      case 'caregiver':
        return <CaregiverDashboard />;
      default:
        return <HomePage onNavigate={setCurrentPage} onVoiceCommand={handleVoiceCommand} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="pb-32">
        {renderCurrentPage()}
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <SimpleNavigation currentPage={currentPage} onNavigate={setCurrentPage} />
      </div>

      {/* Floating Voice Button */}
      <div className="fixed bottom-40 right-6 z-40">
        <VoiceButton onVoiceCommand={handleVoiceCommand} size="md" />
      </div>
    </div>
  );
};

// Home Page Component
const HomePage: React.FC<{ 
  onNavigate: (page: string) => void; 
  onVoiceCommand: (command: string) => void; 
}> = ({ onNavigate, onVoiceCommand }) => {
  const quickActions = [
    {
      id: 'daily',
      title: 'Daily Briefing',
      subtitle: 'News, weather, horoscope',
      color: 'bg-blue-500',
      icon: '📰',
      voice: 'daily briefing'
    },
    {
      id: 'medicine',
      title: 'My Medicines',
      subtitle: 'Reminders and tracking',
      color: 'bg-green-500',
      icon: '💊',
      voice: 'medicine'
    },
    {
      id: 'emergency',
      title: 'Emergency Help',
      subtitle: 'Quick contact family',
      color: 'bg-red-500',
      icon: '🚨',
      voice: 'emergency'
    },
    {
      id: 'caregiver',
      title: 'Family Dashboard',
      subtitle: 'Caregiver access',
      color: 'bg-purple-500',
      icon: '👥',
      voice: 'caregiver'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            ZeroClick Assistant
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Voice-first help for daily activities
          </p>
          
          {/* Current Time */}
          <div className="text-3xl font-semibold text-blue-600 mb-8">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onNavigate(action.id)}
              className={`${action.color} hover:opacity-90 text-white p-8 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 active:scale-95`}
            >
              <div className="text-6xl mb-4">{action.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{action.title}</h3>
              <p className="text-lg opacity-90">{action.subtitle}</p>
            </button>
          ))}
        </div>

        {/* Voice Instructions */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <Volume2 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Voice Commands</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Navigation:</h4>
              <ul className="space-y-2 text-gray-600">
                <li>"Daily briefing" - Get news & weather</li>
                <li>"Medicine" - Check medication</li>
                <li>"Emergency" - Quick help contacts</li>
                <li>"Caregiver" - Family dashboard</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3">General:</h4>
              <ul className="space-y-2 text-gray-600">
                <li>"Help" - Get assistance</li>
                <li>"Repeat" - Say that again</li>
                <li>"What time is it?" - Current time</li>
                <li>"Call [name]" - Emergency contact</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Accessibility Features */}
        <div className="mt-12 bg-green-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Designed for Easy Use
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-3">🎤</div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Voice First</h4>
              <p className="text-gray-600">No reading or typing required</p>
            </div>
            
            <div>
              <div className="text-4xl mb-3">👆</div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Large Buttons</h4>
              <p className="text-gray-600">Easy to see and touch</p>
            </div>
            
            <div>
              <div className="text-4xl mb-3">🌍</div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Any Language</h4>
              <p className="text-gray-600">Speak in your native language</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
