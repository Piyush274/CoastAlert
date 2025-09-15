import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Map, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Activity, 
  MapPin,
  Eye,
  RefreshCw,
  User
} from "lucide-react";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const stats = [
    {
      title: "Active Hazard Reports",
      value: "12",
      change: "+3 today",
      icon: AlertTriangle,
      color: "text-alert",
      bgColor: "bg-alert-light",
    },
    {
      title: "Social Media Mentions",
      value: "1,847",
      change: "+23% this hour",
      icon: TrendingUp,
      color: "text-secondary",
      bgColor: "bg-secondary-light",
    },
    {
      title: "Active Volunteers",
      value: "346",
      change: "+12 online",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary-light",
    },
    {
      title: "Monitored Locations",
      value: "89",
      change: "Coastal areas",
      icon: MapPin,
      color: "text-secondary",
      bgColor: "bg-secondary-light",
    },
  ];

  const recentReports = [
    {
      id: 1,
      type: "High Waves",
      location: "Chennai Coast",
      time: "2 min ago",
      status: "verified",
      severity: "medium",
    },
    {
      id: 2,
      type: "Storm Surge",
      location: "Visakhapatnam",
      time: "15 min ago",
      status: "pending",
      severity: "high",
    },
    {
      id: 3,
      type: "Unusual Tide",
      location: "Kochi Harbor",
      time: "28 min ago",
      status: "verified",
      severity: "low",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-alert text-alert-foreground";
      case "medium": return "bg-yellow-500 text-white";
      case "low": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-500 text-white";
      case "pending": return "bg-yellow-500 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Ocean Hazard Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time monitoring and social media insights
            </p>
            {currentUser && (
              <div className="flex items-center space-x-2 mt-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={currentUser.photoURL || ""} alt={currentUser.displayName || ""} />
                  <AvatarFallback>
                    {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  Welcome back, {currentUser.displayName || currentUser.email}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="hero" size="sm" onClick={() => navigate("/report")}>
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report Hazard
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover-lift shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Map */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Map className="w-5 h-5 mr-2" />
                Interactive Hazard Map
              </CardTitle>
              <CardDescription>
                Real-time visualization of reported hazards and social media hotspots
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-primary-light rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-primary font-medium">Interactive Map Loading...</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Integration with Mapbox/Google Maps coming soon
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Recent Reports
              </CardTitle>
              <CardDescription>
                Latest hazard reports from the community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className={getSeverityColor(report.severity)}>
                        {report.type}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{report.location}</p>
                    <p className="text-xs text-muted-foreground">{report.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Social Media Insights */}
        <Card className="mt-6 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Social Media Insights
            </CardTitle>
            <CardDescription>
              Real-time analysis of ocean hazard related social media activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-secondary-light rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 text-secondary mx-auto mb-4" />
                <p className="text-secondary font-medium">Analytics Dashboard</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Social media sentiment analysis and trending keywords
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;