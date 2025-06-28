
import React from 'react';
import DailyBriefing from '@/components/DailyBriefing';
import EmergencyPanel from '@/components/EmergencyPanel';
import MedicationReminder from '@/components/MedicationReminder';
import CaregiverDashboard from '@/components/CaregiverDashboard';
import HomePage from '@/components/HomePage';

export const usePageRenderer = (
  currentPage: string,
  onNavigate: (page: string) => void,
  onVoiceCommand: (command: string) => void
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
      default:
        return <HomePage onNavigate={onNavigate} onVoiceCommand={onVoiceCommand} />;
    }
  };

  return { renderCurrentPage };
};
