
import React from 'react';
import DailyBriefing from '@/components/DailyBriefing';
import EmergencyPanel from '@/components/EmergencyPanel';
import MedicationReminder from '@/components/MedicationReminder';
import CaregiverDashboard from '@/components/CaregiverDashboard';
import HomePage from '@/components/HomePage';
import LoginPage from '@/components/LoginPage';
import SignupPage from '@/components/SignupPage';
import QRDashboard from '@/components/QRDashboard';

export const usePageRenderer = (
  currentPage: string,
  onNavigate: (page: string) => void,
  onVoiceCommand: (command: string) => void,
  userData?: any,
  onLogin?: (email: string, password: string) => boolean,
  onSignup?: (userData: any) => void,
  onLogout?: () => void
) => {
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'daily':
        return <DailyBriefing />;
      case 'medicine':
        return <MedicationReminder />;
      case 'emergency':
        return <EmergencyPanel />;
      case 'caregiver':
        return <CaregiverDashboard />;
      case 'login':
        return (
          <LoginPage 
            onNavigate={onNavigate}
            onLogin={(email, password) => {
              if (onLogin && onLogin(email, password)) {
                onNavigate('qr-dashboard');
              }
            }}
          />
        );
      case 'signup':
        return (
          <SignupPage 
            onNavigate={onNavigate}
            onSignup={(data) => {
              if (onSignup) {
                onSignup(data);
                onNavigate('qr-dashboard');
              }
            }}
          />
        );
      case 'qr-dashboard':
        return userData && onLogout ? (
          <QRDashboard 
            userData={userData}
            onNavigate={onNavigate}
            onLogout={onLogout}
          />
        ) : null;
      default:
        return <HomePage onNavigate={onNavigate} onVoiceCommand={onVoiceCommand} />;
    }
  };

  return { renderCurrentPage };
};
