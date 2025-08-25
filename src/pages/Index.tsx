import { useState } from 'react';
import { Eye, Calendar, Heart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PrescriptionScreen from '@/components/PrescriptionScreen';
import AppointmentScreen from '@/components/AppointmentScreen';
import EyeCareScreen from '@/components/EyeCareScreen';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'prescriptions' | 'appointments' | 'eyecare'>('prescriptions');

  const tabs = [
    { id: 'prescriptions', label: 'Prescriptions', icon: Eye },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'eyecare', label: 'Eye Care', icon: Heart },
  ] as const;

  const renderScreen = () => {
    switch (activeTab) {
      case 'prescriptions':
        return <PrescriptionScreen />;
      case 'appointments':
        return <AppointmentScreen />;
      case 'eyecare':
        return <EyeCareScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground py-6 px-4 shadow-soft">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center">EyeCare Tracker</h1>
          <p className="text-center text-primary-foreground/80 text-sm mt-1">
            Track your vision health
          </p>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-card border-b border-border sticky top-0 z-10 shadow-soft">
        <div className="max-w-md mx-auto px-4">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 text-xs font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Screen Content */}
      <main className="max-w-md mx-auto px-4 pb-20">
        <div className="animate-fade-in">
          {renderScreen()}
        </div>
      </main>
    </div>
  );
};

export default Index;