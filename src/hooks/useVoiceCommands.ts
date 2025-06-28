
import { useCallback } from 'react';

export const useVoiceCommands = (setCurrentPage: (page: string) => void) => {
  const handleVoiceCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('daily') || lowerCommand.includes('briefing') || lowerCommand.includes('news')) {
      setCurrentPage('daily');
    } else if (lowerCommand.includes('medicine') || lowerCommand.includes('medication') || lowerCommand.includes('pills')) {
      setCurrentPage('medicine');
    } else if (lowerCommand.includes('emergency') || lowerCommand.includes('help') || lowerCommand.includes('call')) {
      setCurrentPage('emergency');
    } else if (lowerCommand.includes('caregiver') || lowerCommand.includes('family') || lowerCommand.includes('dashboard')) {
      setCurrentPage('caregiver');
    } else if (lowerCommand.includes('login') || lowerCommand.includes('sign in')) {
      setCurrentPage('login');
    } else if (lowerCommand.includes('signup') || lowerCommand.includes('sign up') || lowerCommand.includes('register')) {
      setCurrentPage('signup');
    } else if (lowerCommand.includes('home') || lowerCommand.includes('main')) {
      setCurrentPage('home');
    }
  }, [setCurrentPage]);

  return { handleVoiceCommand };
};
