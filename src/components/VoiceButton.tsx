
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceButtonProps {
  onVoiceCommand: (command: string) => void;
  isListening?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ 
  onVoiceCommand, 
  isListening = false, 
  size = 'lg' 
}) => {
  const [listening, setListening] = useState(isListening);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const speechRecognition = new (window as any).webkitSpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = 'en-US';

      speechRecognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase();
        onVoiceCommand(command);
        setListening(false);
      };

      speechRecognition.onend = () => {
        setListening(false);
      };

      setRecognition(speechRecognition);
    }
  }, [onVoiceCommand]);

  const startListening = () => {
    if (recognition) {
      setListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setListening(false);
    }
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20', 
    lg: 'w-32 h-32'
  };

  return (
    <Button
      onClick={listening ? stopListening : startListening}
      className={`${sizeClasses[size]} rounded-full ${
        listening 
          ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
          : 'bg-green-600 hover:bg-green-700'
      } text-white shadow-2xl border-4 border-white transition-all duration-300`}
      aria-label={listening ? "Stop listening" : "Start voice command"}
    >
      {listening ? (
        <MicOff className="w-8 h-8" />
      ) : (
        <Mic className="w-8 h-8" />
      )}
    </Button>
  );
};

export default VoiceButton;
