import { useState, useEffect } from 'react';
import { Plus, Eye, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import PrescriptionForm from './PrescriptionForm';
import { usePrescriptions } from '@/hooks/usePrescriptions';
import type { Prescription } from '@/types/prescription';

const PrescriptionScreen = () => {
  const [showForm, setShowForm] = useState(false);
  const { prescriptions, addPrescription } = usePrescriptions();

  const handleAddPrescription = (prescription: Omit<Prescription, 'id'>) => {
    addPrescription(prescription);
    setShowForm(false);
  };

  const getVisionTrend = () => {
    if (prescriptions.length < 2) return null;
    
    const latest = prescriptions[0];
    const previous = prescriptions[1];
    
    // Calculate average sphere power change
    const latestAvg = (Math.abs(latest.rightEye.sph) + Math.abs(latest.leftEye.sph)) / 2;
    const previousAvg = (Math.abs(previous.rightEye.sph) + Math.abs(previous.leftEye.sph)) / 2;
    
    const change = latestAvg - previousAvg;
    
    if (Math.abs(change) < 0.25) return 'stable';
    return change > 0 ? 'worsening' : 'improving';
  };

  const visionTrend = getVisionTrend();

  return (
    <div className="space-y-6 py-6">
      {/* Progress Section */}
      {prescriptions.length > 1 && (
        <Card className="shadow-card animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Vision Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              {visionTrend === 'improving' && (
                <>
                  <TrendingUp className="h-5 w-5 text-health-good" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-health-good">Improving</div>
                    <div className="text-xs text-muted-foreground">Your vision is getting better</div>
                  </div>
                  <Progress value={75} className="w-20" />
                </>
              )}
              {visionTrend === 'worsening' && (
                <>
                  <TrendingDown className="h-5 w-5 text-health-warning" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-health-warning">Worsening</div>
                    <div className="text-xs text-muted-foreground">Consider scheduling a checkup</div>
                  </div>
                  <Progress value={40} className="w-20" />
                </>
              )}
              {visionTrend === 'stable' && (
                <>
                  <Minus className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-primary">Stable</div>
                    <div className="text-xs text-muted-foreground">No significant changes</div>
                  </div>
                  <Progress value={60} className="w-20" />
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Prescriptions Grid */}
      <div className="space-y-4">
        {prescriptions.length === 0 ? (
          <Card className="shadow-soft">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Eye className="h-16 w-16 text-muted-foreground/40 mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No prescriptions yet
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Add your first prescription to start tracking your vision health
              </p>
            </CardContent>
          </Card>
        ) : (
          prescriptions.map((prescription) => (
            <Card key={prescription.id} className="shadow-card animate-fade-in hover:shadow-floating transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium">
                    {new Date(prescription.date).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                    {prescription.type}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Right Eye */}
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-muted-foreground">Right Eye</div>
                    <div className="space-y-1 text-sm">
                      <div>SPH: {prescription.rightEye.sph > 0 ? '+' : ''}{prescription.rightEye.sph}</div>
                      <div>CYL: {prescription.rightEye.cyl > 0 ? '+' : ''}{prescription.rightEye.cyl}</div>
                      <div>AXIS: {prescription.rightEye.axis}°</div>
                    </div>
                  </div>
                  
                  {/* Left Eye */}
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-muted-foreground">Left Eye</div>
                    <div className="space-y-1 text-sm">
                      <div>SPH: {prescription.leftEye.sph > 0 ? '+' : ''}{prescription.leftEye.sph}</div>
                      <div>CYL: {prescription.leftEye.cyl > 0 ? '+' : ''}{prescription.leftEye.cyl}</div>
                      <div>AXIS: {prescription.leftEye.axis}°</div>
                    </div>
                  </div>
                </div>
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
        <PrescriptionForm
          onSave={handleAddPrescription}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default PrescriptionScreen;