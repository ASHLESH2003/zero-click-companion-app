
import React, { useState, useEffect } from 'react';
import { Clock, Pill, Bell, BellOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
  color: string;
}

const MedicationReminder: React.FC = () => {
  const [medications] = useState<Medication[]>([
    { id: '1', name: 'Blood pressure pill', dosage: '1 tablet', time: '8:00 AM', taken: false, color: 'bg-blue-500' },
    { id: '2', name: 'Vitamin D', dosage: '2 tablets', time: '12:00 PM', taken: true, color: 'bg-yellow-500' },
    { id: '3', name: 'Heart medication', dosage: '1 tablet', time: '6:00 PM', taken: false, color: 'bg-red-500' },
    { id: '4', name: 'Sleep aid', dosage: '1 tablet', time: '9:00 PM', taken: false, color: 'bg-purple-500' }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeReminder, setActiveReminder] = useState<Medication | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const markAsTaken = (medicationId: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.speak(new SpeechSynthesisUtterance("Medication marked as taken. Good job!"));
    }
    console.log(`Marked medication ${medicationId} as taken`);
  };

  const handleVoiceCommand = (command: string) => {
    if (command.includes('taken') || command.includes('done')) {
      const pendingMed = medications.find(med => !med.taken);
      if (pendingMed) {
        markAsTaken(pendingMed.id);
      }
    }
  };

  const speakReminder = (medication: Medication) => {
    if ('speechSynthesis' in window) {
      const message = `Time to take your ${medication.name}. Take ${medication.dosage} now.`;
      speechSynthesis.speak(new SpeechSynthesisUtterance(message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Medication Reminder</h1>
          <div className="text-2xl text-gray-600 mb-6">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="grid gap-6 mb-8">
          {medications.map((medication) => (
            <Card 
              key={medication.id}
              className={`transition-all duration-300 transform hover:scale-102 shadow-lg ${
                medication.taken ? 'opacity-60 bg-green-50' : ''
              }`}
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-full ${medication.color} flex items-center justify-center`}>
                    <Pill className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{medication.name}</h3>
                    <p className="text-lg text-gray-600 mb-2">Dosage: {medication.dosage}</p>
                    <div className="flex items-center gap-2 text-lg text-gray-700">
                      <Clock className="w-5 h-5" />
                      <span>{medication.time}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {medication.taken ? (
                      <div className="bg-green-500 text-white px-6 py-3 rounded-xl text-lg font-semibold">
                        ✓ Taken
                      </div>
                    ) : (
                      <>
                        <Button
                          onClick={() => markAsTaken(medication.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-semibold rounded-xl"
                        >
                          Mark as Taken
                        </Button>
                        <Button
                          onClick={() => speakReminder(medication)}
                          variant="outline"
                          className="px-6 py-3 text-lg rounded-xl"
                        >
                          <Bell className="w-5 h-5 mr-2" />
                          Remind Me
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {medications.filter(med => med.taken).length}
              </div>
              <div className="text-lg text-gray-700">Taken Today</div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {medications.filter(med => !med.taken).length}
              </div>
              <div className="text-lg text-gray-700">Remaining</div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {medications.length}
              </div>
              <div className="text-lg text-gray-700">Total Today</div>
            </CardContent>
          </Card>
        </div>

        {/* Voice Instructions */}
        <div className="bg-blue-50 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Voice Commands:</h3>
          <ul className="text-lg text-gray-700 space-y-2">
            <li>"Taken" or "Done" - Mark current medication as taken</li>
            <li>"Remind me" - Repeat current medication reminder</li>
            <li>"What's next" - Tell me about next medication</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MedicationReminder;
