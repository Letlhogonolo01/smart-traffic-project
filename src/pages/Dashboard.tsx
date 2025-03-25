import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer 
} from 'recharts';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, Clock, MapPin, AlertTriangle, TrendingUp, TrendingDown,
  Car, Filter, RefreshCw, Download, BarChart2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import DigitalTwin from '@/components/dashboard/DigitalTwin';
import IncidentReport from '@/components/dashboard/IncidentReport';
import TrafficAnalysis from '@/components/dashboard/TrafficAnalysis';

// Sample data
const trafficData = [
  { time: '00:00', volume: 420, congestion: 10 },
  { time: '03:00', volume: 250, congestion: 5 },
  { time: '06:00', volume: 1100, congestion: 45 },
  { time: '09:00', volume: 1800, congestion: 85 },
  { time: '12:00', volume: 1400, congestion: 65 },
  { time: '15:00', volume: 1600, congestion: 75 },
  { time: '18:00', volume: 2100, congestion: 95 },
  { time: '21:00', volume: 1200, congestion: 55 },
];

const vehicleTypeData = [
  { name: 'Cars', value: 68 },
  { name: 'Trucks', value: 12 },
  { name: 'Motorcycles', value: 8 },
  { name: 'Buses', value: 7 },
  { name: 'Bicycles', value: 5 },
];

const incidentData = [
  { type: 'Congestion', count: 42 },
  { type: 'Accidents', count: 7 },
  { type: 'Roadwork', count: 12 },
  { type: 'Weather', count: 5 },
  { type: 'Events', count: 8 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <main className="flex-grow py-20">
        <div className="container-custom">
          <div className="mb-8 animate-fade-in">
            <h1 className="heading-lg mb-2">Traffic Management Dashboard</h1>
            <p className="subtitle">Real-time analytics and insights for urban mobility</p>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {[
              { 
                title: 'Total Vehicles', 
                value: '24,892', 
                change: '+12%', 
                trend: 'up',
                icon: <Car className="h-5 w-5 text-traffic-600" />,
                color: 'bg-traffic-50 dark:bg-traffic-900/30 text-traffic-600'
              },
              { 
                title: 'Current Congestion', 
                value: '65%', 
                change: '+5%', 
                trend: 'up',
                icon: <BarChart2 className="h-5 w-5 text-amber-600" />,
                color: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600'
              },
              { 
                title: 'Average Speed', 
                value: '28 km/h', 
                change: '-3 km/h', 
                trend: 'down',
                icon: <TrendingDown className="h-5 w-5 text-blue-600" />,
                color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600'
              },
              { 
                title: 'Active Incidents', 
                value: '7', 
                change: '+2', 
                trend: 'up',
                icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
                color: 'bg-red-50 dark:bg-red-900/30 text-red-600'
              },
            ].map((stat, i) => (
              <Card 
                key={i} 
                className={cn(
                  "border-gray-100 dark:border-gray-800 animate-fade-up"
                )}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn(
                      "h-10 w-10 rounded-lg flex items-center justify-center",
                      stat.color
                    )}>
                      {stat.icon}
                    </div>
                    <span className={cn(
                      "text-sm font-medium flex items-center",
                      stat.trend === 'up' ? "text-green-600" : "text-red-600"
                    )}>
                      {stat.change}
                      {stat.trend === 'up' ? 
                        <TrendingUp className="ml-1 h-4 w-4" /> : 
                        <TrendingDown className="ml-1 h-4 w-4" />
                      }
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Dashboard tabs */}
          <Tabs 
            defaultValue="overview" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="mb-8 animate-fade-in"
          >
            <div className="flex items-center justify-between mb-6">
              <TabsList className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-1">
                <TabsTrigger 
                  value="overview"
                  className="data-[state=active]:bg-traffic-600 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="incidents"
                  className="data-[state=active]:bg-traffic-600 data-[state=active]:text-white"
                >
                  Incidents
                </TabsTrigger>
                <TabsTrigger 
                  value="analysis"
                  className="data-[state=active]:bg-traffic-600 data-[state=active]:text-white"
                >
                  Analysis
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gray-200 dark:border-gray-700"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gray-200 dark:border-gray-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gray-200 dark:border-gray-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <DigitalTwin />
                <IncidentReport />
                <TrafficAnalysis />
              </div>
            </TabsContent>
            
            <TabsContent value="incidents">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <IncidentReport />
                <Card className="col-span-1 lg:col-span-2 border-gray-100 dark:border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle>Traffic Incidents</CardTitle>
                    <CardDescription>Last 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={incidentData}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                          <XAxis dataKey="type" />
                          <YAxis />
                          <Tooltip contentStyle={{ borderRadius: '8px' }} />
                          <Legend />
                          <Bar dataKey="count" name="Number of Incidents" fill="#0284c7" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="analysis">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <TrafficAnalysis />
                <Card className="col-span-1 border-gray-100 dark:border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle>Vehicle Distribution</CardTitle>
                    <CardDescription>By type percentage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={vehicleTypeData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {vehicleTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
