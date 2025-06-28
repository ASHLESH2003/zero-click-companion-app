
import React, { useState, useEffect } from 'react';
import { Calendar, Sun, Heart, Newspaper, Volume2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import VoiceButton from './VoiceButton';

interface BriefingData {
  date: string;
  weather: string;
  news: string[];
  horoscope: string;
  healthTip: string;
}

const DailyBriefing: React.FC = () => {
  const [briefingData, setBriefingData] = useState<BriefingData>({
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    weather: "Sunny, 75°F",
    news: [
      "Local community center hosting health screening",
      "New park opened in downtown area",
      "Library offering free computer classes"
    ],
    horoscope: "Today brings positive energy and opportunities for connection with loved ones.",
    healthTip: "Remember to drink 8 glasses of water throughout the day and take a 15-minute walk after meals."
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const sections = [
    { icon: Calendar, title: "Today's Date", content: briefingData.date },
    { icon: Sun, title: "Weather", content: briefingData.weather },
    { icon: Newspaper, title: "News", content: briefingData.news.join('. ') },
    { icon: Sun, title: "Horoscope", content: briefingData.horoscope },
    { icon: Heart, title: "Health Tip", content: briefingData.healthTip }
  ];

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const playDailyBriefing = () => {
    setIsPlaying(true);
    sections.forEach((section, index) => {
      setTimeout(() => {
        setCurrentSection(index);
        speakText(`${section.title}. ${section.content}`);
        if (index === sections.length - 1) {
          setTimeout(() => setIsPlaying(false), 3000);
        }
      }, index * 8000);
    });
  };

  const handleVoiceCommand = (command: string) => {
    if (command.includes('play') || command.includes('briefing') || command.includes('start')) {
      playDailyBriefing();
    } else if (command.includes('weather')) {
      speakText(`Weather: ${briefingData.weather}`);
    } else if (command.includes('news')) {
      speakText(`News: ${briefingData.news.join('. ')}`);
    } else if (command.includes('horoscope')) {
      speakText(`Horoscope: ${briefingData.horoscope}`);
    } else if (command.includes('health')) {
      speakText(`Health tip: ${briefingData.healthTip}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Good Morning!</h1>
          <p className="text-2xl text-gray-600 mb-6">Here's your daily briefing</p>
          
          <div className="flex justify-center mb-8">
            <VoiceButton 
              onVoiceCommand={handleVoiceCommand}
              size="lg"
            />
          </div>
          
          <button
            onClick={playDailyBriefing}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
            disabled={isPlaying}
          >
            {isPlaying ? 'Playing...' : 'Play Daily Briefing'}
          </button>
        </div>

        <div className="grid gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card 
                key={index}
                className={`transition-all duration-500 transform ${
                  currentSection === index && isPlaying 
                    ? 'scale-105 ring-4 ring-blue-400 bg-blue-50' 
                    : 'hover:scale-102'
                } shadow-lg`}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="bg-blue-100 p-4 rounded-full">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h3>
                      <p className="text-xl text-gray-700 leading-relaxed">{section.content}</p>
                    </div>
                    <button
                      onClick={() => speakText(`${section.title}. ${section.content}`)}
                      className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors duration-200"
                      aria-label={`Read ${section.title}`}
                    >
                      <Volume2 className="w-6 h-6" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyBriefing;
