import { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import type { Appointment } from '@/types/appointment';

interface AppointmentFormProps {
  onSave: (appointment: Omit<Appointment, 'id'>) => void;
  onClose: () => void;
}

const AppointmentForm = ({ onSave, onClose }: AppointmentFormProps) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 16), // datetime-local format
    optician: '',
    location: '',
    attended: false,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.optician.trim() || !formData.location.trim()) {
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-fade-in">
      <div className="w-full max-w-md mx-auto animate-slide-up">
        <Card className="rounded-t-3xl rounded-b-none shadow-floating">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              New Appointment
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="max-h-[80vh] overflow-y-auto pb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date & Time */}
              <div>
                <Label htmlFor="datetime">Date & Time</Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>

              {/* Optician */}
              <div>
                <Label htmlFor="optician">Optician</Label>
                <Input
                  id="optician"
                  value={formData.optician}
                  onChange={(e) => setFormData(prev => ({ ...prev, optician: e.target.value }))}
                  placeholder="Dr. Smith or Vision Center"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="123 Main St, City"
                  required
                />
              </div>

              {/* Attended */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="attended"
                  checked={formData.attended}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, attended: checked as boolean }))
                  }
                />
                <Label 
                  htmlFor="attended" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I have attended this appointment
                </Label>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Notes from the appointment, follow-up instructions, etc."
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:scale-[1.02] transition-transform"
                size="lg"
              >
                Save Appointment
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentForm;