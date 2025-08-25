import { useState } from 'react';
import { X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Prescription } from '@/types/prescription';

interface PrescriptionFormProps {
  onSave: (prescription: Omit<Prescription, 'id'>) => void;
  onClose: () => void;
}

const PrescriptionForm = ({ onSave, onClose }: PrescriptionFormProps) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'glasses' as 'glasses' | 'contacts',
    rightEye: { sph: 0, cyl: 0, axis: 0 },
    leftEye: { sph: 0, cyl: 0, axis: 0 },
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateEyeData = (eye: 'rightEye' | 'leftEye', field: 'sph' | 'cyl' | 'axis', value: number) => {
    setFormData(prev => ({
      ...prev,
      [eye]: {
        ...prev[eye],
        [field]: value,
      },
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-fade-in">
      <div className="w-full max-w-md mx-auto animate-slide-up">
        <Card className="rounded-t-3xl rounded-b-none shadow-floating">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              New Prescription
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="max-h-[80vh] overflow-y-auto pb-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value: 'glasses' | 'contacts') => 
                        setFormData(prev => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="glasses">Glasses</SelectItem>
                        <SelectItem value="contacts">Contacts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Right Eye */}
              <div className="space-y-3">
                <h3 className="font-medium text-primary flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  Right Eye
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="right-sph" className="text-xs">SPH</Label>
                    <Input
                      id="right-sph"
                      type="number"
                      step="0.25"
                      value={formData.rightEye.sph}
                      onChange={(e) => updateEyeData('rightEye', 'sph', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="right-cyl" className="text-xs">CYL</Label>
                    <Input
                      id="right-cyl"
                      type="number"
                      step="0.25"
                      value={formData.rightEye.cyl}
                      onChange={(e) => updateEyeData('rightEye', 'cyl', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="right-axis" className="text-xs">AXIS</Label>
                    <Input
                      id="right-axis"
                      type="number"
                      min="0"
                      max="180"
                      value={formData.rightEye.axis}
                      onChange={(e) => updateEyeData('rightEye', 'axis', parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Left Eye */}
              <div className="space-y-3">
                <h3 className="font-medium text-secondary flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  Left Eye
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="left-sph" className="text-xs">SPH</Label>
                    <Input
                      id="left-sph"
                      type="number"
                      step="0.25"
                      value={formData.leftEye.sph}
                      onChange={(e) => updateEyeData('leftEye', 'sph', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="left-cyl" className="text-xs">CYL</Label>
                    <Input
                      id="left-cyl"
                      type="number"
                      step="0.25"
                      value={formData.leftEye.cyl}
                      onChange={(e) => updateEyeData('leftEye', 'cyl', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="left-axis" className="text-xs">AXIS</Label>
                    <Input
                      id="left-axis"
                      type="number"
                      min="0"
                      max="180"
                      value={formData.leftEye.axis}
                      onChange={(e) => updateEyeData('leftEye', 'axis', parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional notes..."
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:scale-[1.02] transition-transform"
                size="lg"
              >
                Save Prescription
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrescriptionForm;