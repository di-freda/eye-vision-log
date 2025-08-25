import { Heart, Shield, Clock, Lightbulb, Monitor, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EyeCareScreen = () => {
  const healthTips = [
    {
      icon: Monitor,
      title: "20-20-20 Rule",
      description: "Every 20 minutes, look at something 20 feet away for 20 seconds",
      category: "Screen Time"
    },
    {
      icon: Lightbulb,
      title: "Proper Lighting",
      description: "Ensure adequate lighting when reading or working to reduce eye strain",
      category: "Environment"
    },
    {
      icon: Shield,
      title: "UV Protection",
      description: "Wear sunglasses with UV protection when outdoors",
      category: "Protection"
    },
    {
      icon: Droplets,
      title: "Stay Hydrated",
      description: "Drink plenty of water to keep your eyes naturally lubricated",
      category: "Hydration"
    }
  ];

  const commonConditions = [
    {
      name: "Myopia (Nearsightedness)",
      description: "Difficulty seeing distant objects clearly",
      prevalence: "Very Common"
    },
    {
      name: "Hyperopia (Farsightedness)",
      description: "Difficulty seeing close objects clearly",
      prevalence: "Common"
    },
    {
      name: "Astigmatism",
      description: "Blurred vision due to irregular cornea shape",
      prevalence: "Common"
    },
    {
      name: "Presbyopia",
      description: "Age-related difficulty reading small print",
      prevalence: "Age-related"
    }
  ];

  return (
    <div className="space-y-6 py-6">
      {/* Welcome Section */}
      <Card className="shadow-retro border-2 border-secondary bg-gradient-health text-white">
        <CardContent className="p-6 text-center">
          <div className="p-3 rounded-full bg-white/20 border-2 border-white/30 inline-block mb-4">
            <Heart className="h-12 w-12 opacity-90" />
          </div>
          <h2 className="text-xl font-bold mb-2 font-retro">Your Eye Health Matters</h2>
          <p className="text-white/90 text-sm">
            Regular eye care and healthy habits help maintain good vision throughout life
          </p>
        </CardContent>
      </Card>

      {/* Daily Reminders */}
      <Card className="shadow-retro border-2 border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-retro">
            <Clock className="h-5 w-5 text-primary" />
            Daily Eye Care Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {healthTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border-2 border-border hover:bg-muted/50 transition-colors">
                <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm font-retro">{tip.title}</h4>
                    <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full border border-border">
                      {tip.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Common Conditions */}
      <Card className="shadow-retro border-2 border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-retro">
            <Shield className="h-5 w-5 text-primary" />
            Common Eye Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {commonConditions.map((condition, index) => (
            <div key={index} className="p-3 border-2 border-border rounded-lg bg-muted/10">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-sm font-retro">{condition.name}</h4>
                <span className={`text-xs px-3 py-1 rounded-full border-2 ${
                  condition.prevalence === 'Very Common' 
                    ? 'bg-health-warning/10 text-health-warning border-health-warning/30'
                    : condition.prevalence === 'Common'
                    ? 'bg-primary/10 text-primary border-primary/30'
                    : 'bg-muted text-muted-foreground border-border'
                }`}>
                  {condition.prevalence}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{condition.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Reminder Section */}
      <Card className="shadow-retro border-2 border-secondary bg-secondary/10">
        <CardContent className="p-4 text-center">
          <div className="text-2xl mb-2">💡</div>
          <div className="text-sm text-muted-foreground mb-2 font-retro">Remember</div>
          <p className="text-sm font-medium">
            Schedule regular eye exams every 1-2 years, or as recommended by your optician
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EyeCareScreen;