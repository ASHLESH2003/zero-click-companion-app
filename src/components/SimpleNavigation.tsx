
import React from 'react';
import { Home, Calendar, Heart, Phone, User, Volume2 } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const SimpleNavigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', voice: 'home' },
    { id: 'daily', icon: Calendar, label: 'Daily', voice: 'daily briefing' },
    { id: 'medicine', icon: Heart, label: 'Medicine', voice: 'medicine' },
    { id: 'emergency', icon: Phone, label: 'Emergency', voice: 'emergency' },
    { id: 'caregiver', icon: User, label: 'Caregiver', voice: 'caregiver' }
  ];

  const handleVoiceNavigation = (command: string) => {
    const lowerCommand = command.toLowerCase();
    const navItem = navItems.find(item => 
      lowerCommand.includes(item.voice) || lowerCommand.includes(item.label.toLowerCase())
    );
    
    if (navItem) {
      onNavigate(navItem.id);
      if ('speechSynthesis' in window) {
        speechSynthesis.speak(new SpeechSynthesisUtterance(`Going to ${navItem.label}`));
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-t-3xl">
      {/* Voice Navigation Button */}
      <div className="flex justify-center pt-4 pb-2">
        <button
          onClick={() => {
            // This would trigger voice recognition for navigation
            if ('speechSynthesis' in window) {
              speechSynthesis.speak(new SpeechSynthesisUtterance("Say where you want to go: Home, Daily, Medicine, Emergency, or Caregiver"));
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-colors duration-200"
        >
          <Volume2 className="w-4 h-4" />
          Voice Navigation
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex justify-around items-center py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-100 text-blue-600 scale-110' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <Icon className="w-8 h-8" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Voice Commands Help */}
      <div className="bg-gray-50 px-4 py-3 text-center">
        <p className="text-xs text-gray-600">
          Say: "Go to [page name]" or tap the Voice Navigation button
        </p>
      </div>
    </div>
  );
};

export default SimpleNavigation;
