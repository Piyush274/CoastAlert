import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Camera, 
  Upload, 
  Send, 
  AlertTriangle, 
  Clock,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { HazardService } from "@/services/hazardService";
import { HazardReportFormData } from "@/types/hazard";

const ReportHazard = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [formData, setFormData] = useState<HazardReportFormData>({
    reporterName: '',
    reporterRole: '',
    hazardType: '',
    severity: '',
    location: { lat: 0, lng: 0 },
    description: '',
    mediaFiles: []
  });
  const { toast } = useToast();
  const { currentUser } = useAuth();

  const hazardTypes = [
    "Tsunami Warning",
    "High Waves",
    "Storm Surge",
    "Coastal Flooding",
    "Unusual Tide Patterns",
    "Strong Currents",
    "Debris in Water",
    "Other"
  ];

  const severityLevels = [
    { value: "low", label: "Low", color: "bg-green-500" },
    { value: "medium", label: "Medium", color: "bg-yellow-500" },
    { value: "high", label: "High", color: "bg-orange-500" },
    { value: "critical", label: "Critical", color: "bg-red-500" }
  ];

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(newLocation);
          setFormData(prev => ({
            ...prev,
            location: newLocation
          }));
          toast({
            title: "Location detected",
            description: "Your current location has been captured.",
          });
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Unable to get your location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleInputChange = (field: keyof HazardReportFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.reporterName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your name.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.reporterRole) {
      toast({
        title: "Validation Error", 
        description: "Please select your role.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.hazardType) {
      toast({
        title: "Validation Error",
        description: "Please select a hazard type.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.severity) {
      toast({
        title: "Validation Error",
        description: "Please select severity level.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide a description.",
        variant: "destructive",
      });
      return;
    }
    
    if (!currentUser) {
      toast({
        title: "Authentication Error",
        description: "Please log in to submit a report.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save to Firebase
      const reportId = await HazardService.saveHazardReport(
        formData,
        currentUser.uid,
        currentUser.email || ''
      );
      
      toast({
        title: "Report submitted successfully",
        description: `Your hazard report has been saved with ID: ${reportId}`,
      });
      
      // Reset form
      setFormData({
        reporterName: '',
        reporterRole: '',
        hazardType: '',
        severity: '',
        location: { lat: 0, lng: 0 },
        description: '',
        mediaFiles: []
      });
      setLocation(null);
      
    } catch (error) {
      console.error('Error submitting report:', error);
      toast({
        title: "Submission Error",
        description: "Failed to submit your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Report Ocean Hazard
          </h1>
          <p className="text-muted-foreground">
            Help protect coastal communities by reporting ocean threats in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Form */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-alert" />
                Hazard Details
              </CardTitle>
              <CardDescription>
                Provide accurate information about the ocean hazard you observed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Reporter Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reporter-name">Your Name</Label>
                    <Input 
                      id="reporter-name" 
                      placeholder="Enter your full name"
                      value={formData.reporterName}
                      onChange={(e) => handleInputChange('reporterName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reporter-role">Role</Label>
                    <Select value={formData.reporterRole} onValueChange={(value) => handleInputChange('reporterRole', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="citizen">Citizen</SelectItem>
                        <SelectItem value="volunteer">Volunteer</SelectItem>
                        <SelectItem value="official">Government Official</SelectItem>
                        <SelectItem value="researcher">Researcher</SelectItem>
                        <SelectItem value="fisherman">Fisherman</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Hazard Type and Severity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hazard-type">Hazard Type</Label>
                    <Select value={formData.hazardType} onValueChange={(value) => handleInputChange('hazardType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select hazard type" />
                      </SelectTrigger>
                      <SelectContent>
                        {hazardTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity Level</Label>
                    <Select value={formData.severity} onValueChange={(value) => handleInputChange('severity', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        {severityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                              <span>{level.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Enter location or use GPS" 
                      className="flex-1"
                      value={location ? `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}` : ''}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleGetLocation}
                      className="flex-shrink-0"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Get GPS
                    </Button>
                  </div>
                  {location && (
                    <div className="flex items-center text-sm text-green-600">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Location captured
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you observed in detail..."
                    className="min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>

                {/* Media Upload */}
                <div className="space-y-2">
                  <Label>Photos/Videos (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload photos or videos of the hazard
                      </p>
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  variant="alert" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting Report...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Hazard Report
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Guidelines and Information */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Reporting Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="mt-0.5">1</Badge>
                    <p className="text-sm">Report immediately when you observe any unusual ocean activity</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="mt-0.5">2</Badge>
                    <p className="text-sm">Provide accurate location information using GPS when possible</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="mt-0.5">3</Badge>
                    <p className="text-sm">Include clear photos or videos as evidence</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="mt-0.5">4</Badge>
                    <p className="text-sm">Be detailed in your description of the hazard</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-alert-light rounded-lg">
                  <p className="text-sm font-medium text-alert">Emergency: 112</p>
                  <p className="text-xs text-alert/80">For immediate life-threatening situations</p>
                </div>
                <div className="p-3 bg-primary-light rounded-lg">
                  <p className="text-sm font-medium text-primary">INCOIS: 040-23886002</p>
                  <p className="text-xs text-primary/80">Indian National Centre for Ocean Information Services</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHazard;