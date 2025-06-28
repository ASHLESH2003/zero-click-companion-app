
import React, { useState } from 'react';
import { Phone, Heart, Home, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  icon: any;
}

const EmergencyPanel: React.FC = () => {
  const [emergencyContacts] = useState<EmergencyContact[]>([
    { name: "Dr. Smith", relationship: "Doctor", phone: "555-0123", icon: Heart },
    { name: "Sarah Johnson", relationship: "Daughter", phone: "555-0456", icon: User },
    { name: "Emergency Services", relationship: "911", phone: "911", icon: Phone },
    { name: "Home Care", relationship: "Nurse", phone: "555-0789", icon: Home }
  ]);

  const [isEmergency, setIsEmergency] = useState(false);

  const handleEmergencyCall = (contact: EmergencyContact) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.speak(new SpeechSynthesisUtterance(`Calling ${contact.name}`));
    }
    
    // In a real app, this would initiate a phone call
    console.log(`Calling ${contact.name} at ${contact.phone}`);
    
    // Show confirmation
    alert(`Calling ${contact.name} at ${contact.phone}`);
  };

  const handleSOSPress = () => {
    setIsEmergency(true);
    if ('speechSynthesis' in window) {
      speechSynthesis.speak(new SpeechSynthesisUtterance("Emergency mode activated. Choose who to call."));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Emergency Contacts</h1>
          <p className="text-xl text-gray-600 mb-8">Tap or say "Call [Name]" to connect</p>
        </div>

        {/* SOS Button */}
        <div className="flex justify-center mb-12">
          <Button
            onClick={handleSOSPress}
            className={`w-48 h-48 rounded-full text-white text-3xl font-bold shadow-2xl transform transition-all duration-300 ${
              isEmergency 
                ? 'bg-red-600 animate-pulse scale-110' 
                : 'bg-red-500 hover:bg-red-600 hover:scale-105'
            }`}
          >
            SOS
            <br />
            HELP
          </Button>
        </div>

        {/* Emergency Contacts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {emergencyContacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <Card 
                key={index}
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  isEmergency ? 'ring-4 ring-red-400 animate-pulse' : ''
                }`}
                onClick={() => handleEmergencyCall(contact)}
              >
                <CardContent className="p-8 text-center">
                  <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{contact.name}</h3>
                  <p className="text-lg text-gray-600 mb-4">{contact.relationship}</p>
                  <p className="text-xl font-mono text-blue-600 mb-6">{contact.phone}</p>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold rounded-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEmergencyCall(contact);
                    }}
                  >
                    <Phone className="w-6 h-6 mr-2" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Voice Instructions */}
        <div className="mt-12 bg-blue-50 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Voice Commands:</h3>
          <ul className="text-lg text-gray-700 space-y-2">
            <li>"Call doctor" - Calls Dr. Smith</li>
            <li>"Call daughter" - Calls Sarah</li>
            <li>"Emergency" or "Help" - Activates SOS mode</li>
            <li>"Call 911" - Emergency services</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPanel;
