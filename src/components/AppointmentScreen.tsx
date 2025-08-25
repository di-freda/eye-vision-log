import { useState } from 'react';
import { Plus, Calendar, MapPin, Clock, Check, X } from 'lucide-react';
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
          <Card className="shadow-soft">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground/40 mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No appointments yet
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Add your first appointment to keep track of your eye care visits
              </p>
            </CardContent>
          </Card>
        ) : (
          sortedAppointments.map((appointment) => (
            <Card key={appointment.id} className="shadow-card animate-fade-in hover:shadow-floating transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium">
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
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{appointment.optician}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.attended 
                      ? 'bg-health-good/10 text-health-good' 
                      : 'bg-muted text-muted-foreground'
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
                  <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                    <div className="text-xs font-medium text-muted-foreground mb-1">Notes</div>
                    <div className="text-sm">{appointment.notes}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <Button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-floating bg-gradient-primary hover:scale-105 transition-transform duration-200"
        size="icon"
      >
        <Plus className="h-6 w-6" />
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