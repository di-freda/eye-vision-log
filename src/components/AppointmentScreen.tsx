import { useState } from 'react';
import { Disc3, Calendar, MapPin, Clock, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppointmentForm from './AppointmentForm';
import { useAppointments } from '@/hooks/useAppointments';
import type { Appointment } from '@/types/appointment';

const AppointmentScreen = () => {
  const [showForm, setShowForm] = useState(false);
  const { appointments, addAppointment } = useAppointments();

  const handleAddAppointment = (appointment: Omit<Appointment, 'id'>) => {
    addAppointment(appointment);
    setShowForm(false);
  };

  const sortedAppointments = appointments.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6 py-6">
      {/* Appointments Grid */}
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <Card className="shadow-retro border-2 border-border bg-card">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="p-4 rounded-lg bg-muted/30 border-2 border-border mb-4">
                <Calendar className="h-16 w-16 text-muted-foreground/40" />
              </div>
              <h3 className="text-lg font-medium text-muted-foreground mb-2 font-retro">
                No appointments yet
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Add your first appointment to keep track of your eye care visits
              </p>
            </CardContent>
          </Card>
        ) : (
          sortedAppointments.map((appointment) => (
            <Card key={appointment.id} className="shadow-retro border-2 border-border bg-card animate-fade-in hover:shadow-card transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 p-2 bg-muted/20 rounded-lg border border-border">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium font-retro">
                        {new Date(appointment.date).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(appointment.date).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center gap-2 text-sm p-2 bg-muted/10 rounded border border-border">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{appointment.optician}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-muted/10 rounded border border-border">
                        <MapPin className="h-4 w-4" />
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium border-2 ${
                    appointment.attended 
                      ? 'bg-health-good/10 text-health-good border-health-good/30' 
                      : 'bg-muted text-muted-foreground border-border'
                  }`}>
                    {appointment.attended ? (
                      <>
                        <Check className="h-3 w-3" />
                        Attended
                      </>
                    ) : (
                      <>
                        <X className="h-3 w-3" />
                        Pending
                      </>
                    )}
                  </div>
                </div>
                
                {appointment.notes && (
                  <div className="mt-3 p-3 bg-muted/30 rounded-lg border-2 border-border">
                    <div className="text-xs font-medium text-muted-foreground mb-1 font-retro">Notes</div>
                    <div className="text-sm">{appointment.notes}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Floating Add Button - Retro Record Style */}
      <Button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-retro bg-primary hover:bg-primary-dark border-2 border-border hover:scale-105 transition-all duration-200"
        size="icon"
      >
        <Disc3 className="h-8 w-8 text-primary-foreground" />
      </Button>

      {/* Form Modal */}
      {showForm && (
        <AppointmentForm
          onSave={handleAddAppointment}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default AppointmentScreen;