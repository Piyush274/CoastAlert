// src/pages/Dashboard.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Map, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Activity, 
  MapPin,
  Eye,
  RefreshCw,
  LogOut // <-- 1. IMPORT the LogOut icon
} from "lucide-react";
import { signOut } from 'firebase/auth';      // <-- 2. IMPORT signOut from firebase
import { auth } from '../lib/firebase';       // <-- 3. IMPORT your auth object
import { useNavigate } from 'react-router-dom'; // <-- 4. IMPORT useNavigate
import { useAuth } from "../hooks/useAuth";     // <-- 5. IMPORT useAuth to get user info

const Dashboard = () => {
  const navigate = useNavigate(); // <-- 6. INITIALIZE the navigate hook
  const { user } = useAuth();     // <-- 7. GET the current user's data

  // 8. CREATE the simple logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // After signing out, send the user back to the home page
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out."); // Simple feedback for the demo
    }
  };

  // --- The rest of your existing code remains the same ---
  const stats = [
    { title: "Active Hazard Reports", value: "12", change: "+3 today", icon: AlertTriangle, color: "text-red-500", bgColor: "bg-red-100" },
    { title: "Social Media Mentions", value: "1,847", change: "+23% this hour", icon: TrendingUp, color: "text-blue-500", bgColor: "bg-blue-100" },
    { title: "Active Volunteers", value: "346", change: "+12 online", icon: Users, color: "text-green-500", bgColor: "bg-green-100" },
    { title: "Monitored Locations", value: "89", change: "Coastal areas", icon: MapPin, color: "text-purple-500", bgColor: "bg-purple-100" },
  ];
  const recentReports = [
    { id: 1, type: "High Waves", location: "Chennai Coast", time: "2 min ago", status: "verified", severity: "medium" },
    { id: 2, type: "Storm Surge", location: "Visakhapatnam", time: "15 min ago", status: "pending", severity: "high" },
    { id: 3, type: "Unusual Tide", location: "Kochi Harbor", time: "28 min ago", status: "verified", severity: "low" },
  ];
  const getSeverityColor = (severity: string) => { /* ... */ };
  const getStatusColor = (status: string) => { /* ... */ };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Ocean Hazard Dashboard
            </h1>
            {/* 9. ADD a personalized welcome message */}
            {user && (
              <p className="text-muted-foreground">
                Welcome, <span className="font-semibold text-primary">{user.email}</span>
              </p>
            )}
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report Hazard
            </Button>
            {/* 10. ADD the Logout Button that calls your function */}
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>

        {/* --- The rest of your dashboard UI remains untouched --- */}
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ... The rest of your beautiful dashboard ... */}
      </div>
    </div>
  );
};

export default Dashboard;