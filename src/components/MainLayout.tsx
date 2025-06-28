
import React from 'react';
import SimpleNavigation from './SimpleNavigation';
import VoiceButton from './VoiceButton';

interface MainLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onVoiceCommand: (command: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  currentPage, 
  onNavigate, 
  onVoiceCommand 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="pb-32">
        {children}
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <SimpleNavigation currentPage={currentPage} onNavigate={onNavigate} />
      </div>

      {/* Floating Voice Button */}
      <div className="fixed bottom-40 right-6 z-40">
        <VoiceButton onVoiceCommand={onVoiceCommand} size="md" />
      </div>
    </div>
  );
};

export default MainLayout;
