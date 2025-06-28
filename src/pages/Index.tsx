
import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { useWelcomeMessage } from '@/hooks/useWelcomeMessage';
import { usePageRenderer } from '@/hooks/usePageRenderer';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');

  // Custom hooks
  const { handleVoiceCommand } = useVoiceCommands(setCurrentPage);
  const { renderCurrentPage } = usePageRenderer(currentPage, setCurrentPage, handleVoiceCommand);
  
  // Initialize welcome message
  useWelcomeMessage();

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
