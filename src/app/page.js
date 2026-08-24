'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { Loader } from '@/components/Loader';
import LoginPage from '@/views/LoginPage';
import TimesheetsTablePage from '@/views/TimesheetsTablePage';
import TimesheetDetailPage from '@/views/TimesheetDetailPage';

export default function Home() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('TABLE');
  const [selectedTimesheetId, setSelectedTimesheetId] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const handleSelectTimesheet = (id) => {
    setSelectedTimesheetId(id);
    setCurrentView('DETAIL');
  };

  const handleNavigateHome = () => {
    setSelectedTimesheetId(null);
    setCurrentView('TABLE');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header onNavigateHome={handleNavigateHome} />
      
      {currentView === 'TABLE' ? (
        <TimesheetsTablePage onSelectTimesheet={handleSelectTimesheet} />
      ) : (
        <TimesheetDetailPage 
          timesheetId={selectedTimesheetId} 
          onBack={handleNavigateHome} 
        />
      )}
    </div>
  );
}
