
import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { useWelcomeMessage } from '@/hooks/useWelcomeMessage';
import { usePageRenderer } from '@/hooks/usePageRenderer';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  
  // Auth hook
  const { user, login, signup, logout, isAuthenticated } = useAuth();

  // Custom hooks
  const { handleVoiceCommand } = useVoiceCommands(setCurrentPage);
  const { renderCurrentPage } = usePageRenderer(
    currentPage, 
    setCurrentPage, 
    handleVoiceCommand,
    user,
    login,
    signup,
    () => {
      logout();
      setCurrentPage('home');
    }
  );
  
  // Initialize welcome message
  useWelcomeMessage();

  // For auth pages, don't show the main layout
  if (['login', 'signup', 'qr-dashboard'].includes(currentPage)) {
    return renderCurrentPage();
  }

  return (
    <MainLayout 
      currentPage={currentPage} 
      onNavigate={setCurrentPage}
      onVoiceCommand={handleVoiceCommand}
    >
      {renderCurrentPage()}
    </MainLayout>
  );
};

export default Index;
