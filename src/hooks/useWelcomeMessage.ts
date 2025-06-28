
import { useEffect } from 'react';

export const useWelcomeMessage = () => {
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
};
