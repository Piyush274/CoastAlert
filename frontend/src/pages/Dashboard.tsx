import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Map, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Activity, 
  MapPin,
  Eye,
  RefreshCw,
  User,
  Loader2
} from "lucide-react";
import { HazardService } from "@/services/hazardService";
import { HazardReport } from "@/types/hazard";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [recentReports, setRecentReports] = useState<HazardReport[]>([]);
  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    verifiedReports: 0,
    criticalReports: 0
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const loadDashboardData = async () => {
    try {
      const [reports, dashboardStats] = await Promise.all([
        HazardService.getRecentReports(5),
        HazardService.getDashboardStats()
      ]);
      
      setRecentReports(reports);
      setStats(dashboardStats);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const statsData = [
    {
      title: "Total Reports",
      value: stats.totalReports.toString(),
      change: "All time",
      icon: AlertTriangle,
      color: "text-alert",
      bgColor: "bg-alert-light",
    },
    {
      title: "Pending Reports",
      value: stats.pendingReports.toString(),
      change: "Awaiting verification",
      icon: TrendingUp,
      color: "text-secondary",
      bgColor: "bg-secondary-light",
    },
    {
      title: "Verified Reports",
      value: stats.verifiedReports.toString(),
      change: "Confirmed incidents",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary-light",
    },
    {
      title: "Critical Reports",
      value: stats.criticalReports.toString(),
      change: "High priority",
      icon: MapPin,
      color: "text-alert",
      bgColor: "bg-alert-light",
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
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              {refreshing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Refresh
            </Button>
            <Button variant="hero" size="sm" onClick={() => navigate("/report")}>
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report Hazard
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/admin")}>
              <User className="w-4 h-4 mr-2" />
              Admin Panel
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => {
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
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  <span>Loading reports...</span>
                </div>
              ) : recentReports.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No reports yet</p>
                  <p className="text-sm text-muted-foreground">Be the first to report a hazard</p>
                </div>
              ) : (
                recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className={getSeverityColor(report.severity)}>
                          {report.hazardType}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">
                        {report.location.lat.toFixed(4)}, {report.location.lng.toFixed(4)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTimeAgo(report.createdAt)} • {report.reporterName}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
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