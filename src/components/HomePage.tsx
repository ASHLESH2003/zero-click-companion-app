
import React from 'react';
import { Volume2 } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onVoiceCommand: (command: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onVoiceCommand }) => {
  const quickActions = [
    {
      id: 'daily',
      title: 'Daily Briefing',
      subtitle: 'News, weather, horoscope',
      color: '#50C2C9',
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-green-50 p-6">
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
          <div className="text-3xl font-semibold mb-8" style={{ color: '#50C2C9' }}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onNavigate(action.id)}
              className={`hover:opacity-90 text-white p-8 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 active:scale-95 ${
                action.id === 'daily' ? '' : action.color
              }`}
              style={action.id === 'daily' ? { backgroundColor: action.color } : {}}
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
            <div className="p-3 rounded-full" style={{ backgroundColor: '#50C2C920' }}>
              <Volume2 className="w-8 h-8" style={{ color: '#50C2C9' }} />
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

export default HomePage;
