import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, BarChart3, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import oceanHero from "@/assets/ocean-hero.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: MapPin,
      title: "Report Hazards",
      description: "Real-time geotagged reporting of ocean threats",
    },
    {
      icon: BarChart3,
      title: "Monitor Insights",
      description: "Social media analytics and trend monitoring",
    },
    {
      icon: Shield,
      title: "Early Warning",
      description: "Integration with INCOIS warning systems",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Crowdsourced data from coastal communities",
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${oceanHero})` }}
      >
        <div className="absolute inset-0 gradient-hero opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Protecting Coastal
            <span className="block gradient-text bg-gradient-to-r from-blue-200 to-teal-200 bg-clip-text text-transparent">
              Communities Together
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Join the INCOIS Ocean Hazard Monitoring Platform. Report threats, monitor real-time insights, 
            and help protect coastal areas from tsunamis, storm surges, and other ocean hazards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 px-4">
            <Button 
              variant="alert" 
              size="lg" 
              className="animate-float w-full sm:w-auto"
              onClick={() => navigate("/report")}
            >
              Report Ocean Hazard
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 w-full sm:w-auto"
              onClick={() => navigate("/dashboard")}
            >
              View Live Dashboard
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in px-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover-lift text-white"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-12 h-12 gradient-ocean rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-blue-100 text-sm">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;