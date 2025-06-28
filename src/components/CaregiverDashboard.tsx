
import React, { useState } from 'react';
import { User, Heart, Activity, Calendar, Settings, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PatientData {
  name: string;
  lastActive: string;
  medicationCompliance: number;
  emergencyContacts: number;
  recentActivity: string[];
}

const CaregiverDashboard: React.FC = () => {
  const [patientData] = useState<PatientData>({
    name: "Robert Johnson",
    lastActive: "2 minutes ago",
    medicationCompliance: 85,
    emergencyContacts: 4,
    recentActivity: [
      "Took blood pressure medication at 8:00 AM",
      "Completed daily health check at 9:30 AM",
      "Listened to news briefing at 10:00 AM",
      "Emergency contact added: Dr. Smith"
    ]
  });

  const [remoteSettings, setRemoteSettings] = useState({
    voiceLanguage: 'en-US',
    speechRate: 0.8,
    reminderFrequency: 'hourly',
    emergencyMode: false
  });

  const handleRemoteSetup = () => {
    alert('QR Code generated! Show this to your loved one to set up their device.');
  };

  const handleEmergencyContact = () => {
    alert('Calling Robert Johnson...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Caregiver Dashboard</h1>
          <p className="text-xl text-gray-600">Monitor and manage care for {patientData.name}</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="setup">Remote Setup</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Patient Status */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-6 h-6" />
                    Patient Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{patientData.name}</h3>
                      <p className="text-gray-600">Last active: {patientData.lastActive}</p>
                    </div>
                    <Button 
                      onClick={handleEmergencyContact}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{patientData.medicationCompliance}%</div>
                      <div className="text-sm text-gray-600">Medication Compliance</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{patientData.emergencyContacts}</div>
                      <div className="text-sm text-gray-600">Emergency Contacts</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    <Settings className="w-5 h-5 mr-2" />
                    Remote Settings
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                    <Heart className="w-5 h-5 mr-2" />
                    Health Check
                  </Button>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Reminder
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-6 h-6" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {patientData.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="medications">
            <Card>
              <CardHeader>
                <CardTitle>Medication Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Today's Medications</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span>Blood pressure pill - 8:00 AM</span>
                          <span className="text-green-600 font-semibold">✓ Taken</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                          <span>Heart medication - 6:00 PM</span>
                          <span className="text-orange-600 font-semibold">Pending</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Compliance Report</h3>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-2">85%</div>
                        <div className="text-sm text-gray-600">7-day average compliance</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Remote Device Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Voice Settings</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-2">Language</label>
                          <select className="w-full p-2 border rounded-lg">
                            <option value="en-US">English (US)</option>
                            <option value="es-ES">Spanish</option>
                            <option value="fr-FR">French</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Speech Rate</label>
                          <input type="range" min="0.5" max="1.5" step="0.1" defaultValue="0.8" className="w-full" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Reminder Settings</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-2">Frequency</label>
                          <select className="w-full p-2 border rounded-lg">
                            <option value="hourly">Every Hour</option>
                            <option value="twice-daily">Twice Daily</option>
                            <option value="daily">Daily</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" id="emergency-mode" />
                          <label htmlFor="emergency-mode" className="text-sm font-medium">Emergency Mode</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="setup">
            <Card>
              <CardHeader>
                <CardTitle>Remote Device Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  <div className="bg-gray-100 w-64 h-64 mx-auto rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📱</div>
                      <p className="text-gray-600">QR Code will appear here</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Setup Instructions</h3>
                    <ol className="text-left space-y-2 max-w-md mx-auto">
                      <li>1. Open the ZeroClick app on your loved one's device</li>
                      <li>2. Tap "Caregiver Setup" or say "Setup"</li>
                      <li>3. Scan this QR code or enter setup code</li>
                      <li>4. Device will automatically configure</li>
                    </ol>
                  </div>

                  <Button 
                    onClick={handleRemoteSetup}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                  >
                    Generate Setup Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CaregiverDashboard;
