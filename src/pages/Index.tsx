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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Stars */}
      <div className="fixed top-8 left-8 text-primary opacity-60 animate-pulse-soft pointer-events-none">
        ⭐
      </div>
      <div className="fixed top-32 right-12 text-accent opacity-50 animate-pulse-soft pointer-events-none" style={{ animationDelay: '0.5s' }}>
        ✨
      </div>
      <div className="fixed bottom-32 left-16 text-secondary opacity-40 animate-pulse-soft pointer-events-none" style={{ animationDelay: '1s' }}>
        ⭐
      </div>
      <div className="fixed bottom-16 right-8 text-primary opacity-50 animate-pulse-soft pointer-events-none" style={{ animationDelay: '1.5s' }}>
        ✨
      </div>

      {/* Header */}
      <header className="bg-gradient-retro border-b-2 border-border py-8 px-4 shadow-retro relative">
        <div className="max-w-md mx-auto">
          <div className="text-center">
            <div className="inline-block p-4 rounded-lg bg-card border-2 border-border shadow-retro mb-4">
              <Eye className="h-8 w-8 text-primary mx-auto" />
            </div>
            <h1 className="text-3xl font-retro font-bold text-foreground">EyeCare Tracker</h1>
            <p className="text-muted-foreground text-sm mt-2 font-retro">
              Track your vision health with style
            </p>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-card border-b-2 border-border sticky top-0 z-10 shadow-retro">
        <div className="max-w-md mx-auto px-4">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center gap-2 py-4 px-2 text-xs font-medium font-retro transition-all duration-300 relative border-2 border-transparent ${
                    isActive
                      ? 'text-primary bg-muted border-border shadow-retro rounded-lg m-1'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Screen Content */}
      <main className="max-w-md mx-auto px-4 pb-20 relative">
        <div className="animate-fade-in">
          {renderScreen()}
        </div>
      </main>
    </div>
  );
};

export default Index;