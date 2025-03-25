
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, 
  LineChart, Line, 
  PieChart, Pie, 
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer 
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, TrendingDown, Calendar, RefreshCw, Download, 
  Filter, Car, User, ThumbsUp, ThumbsDown 
} from 'lucide-react';

// Vehicle type data
const vehicleData = [
  { type: 'Cars', count: 1200 },
  { type: 'SUVs', count: 650 },
  { type: 'Trucks', count: 300 },
  { type: 'Buses', count: 150 },
  { type: 'Motorcycles', count: 400 },
  { type: 'Bicycles', count: 250 },
  { type: 'Pedestrians', count: 520 },
];

// Traffic congestion over time
const congestionData = [
  { time: '6:00', level: 30, speed: 45 },
  { time: '7:00', level: 50, speed: 35 },
  { time: '8:00', level: 80, speed: 20 },
  { time: '9:00', level: 65, speed: 25 },
  { time: '10:00', level: 50, speed: 30 },
  { time: '11:00', level: 45, speed: 35 },
  { time: '12:00', level: 50, speed: 30 },
  { time: '13:00', level: 55, speed: 28 },
  { time: '14:00', level: 60, speed: 26 },
  { time: '15:00', level: 70, speed: 22 },
  { time: '16:00', level: 85, speed: 18 },
  { time: '17:00', level: 90, speed: 15 },
  { time: '18:00', level: 75, speed: 20 },
  { time: '19:00', level: 60, speed: 28 },
  { time: '20:00', level: 40, speed: 38 },
];

// Weekly traffic trends data
const weeklyData = [
  { day: 'Mon', volume: 2100, congestion: 75 },
  { day: 'Tue', volume: 1950, congestion: 68 },
  { day: 'Wed', volume: 2000, congestion: 70 },
  { day: 'Thu', volume: 2200, congestion: 78 },
  { day: 'Fri', volume: 2400, congestion: 85 },
  { day: 'Sat', volume: 1800, congestion: 55 },
  { day: 'Sun', volume: 1400, congestion: 40 },
];

// Pedestrian activity data
const pedestrianData = [
  { time: '6:00', count: 120 },
  { time: '8:00', count: 350 },
  { time: '10:00', count: 280 },
  { time: '12:00', count: 450 },
  { time: '14:00', count: 380 },
  { time: '16:00', count: 520 },
  { time: '18:00', count: 620 },
  { time: '20:00', count: 250 },
];

// Road sign compliance data
const roadSignData = [
  { type: 'Stop Signs', compliance: 82, violations: 18 },
  { type: 'Traffic Lights', compliance: 88, violations: 12 },
  { type: 'Speed Limits', compliance: 65, violations: 35 },
  { type: 'Pedestrian Crossings', compliance: 75, violations: 25 },
  { type: 'No Parking', compliance: 70, violations: 30 },
];

// Traffic density by area
const areaDensityData = [
  { area: 'Downtown', density: 85 },
  { area: 'Uptown', density: 65 },
  { area: 'Midtown', density: 75 },
  { area: 'West Side', density: 50 },
  { area: 'East Side', density: 60 },
  { area: 'South End', density: 45 },
  { area: 'North End', density: 40 },
];

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#0ea5e9', '#f59e0b'];

const ExpandedTrafficAnalysis = () => {
  const [timeRange, setTimeRange] = useState('today');
  
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">Traffic Analysis Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive view of traffic patterns and trends
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={timeRange === 'today' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('today')}
          >
            Today
          </Button>
          <Button 
            variant={timeRange === 'week' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('week')}
          >
            This Week
          </Button>
          <Button 
            variant={timeRange === 'month' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('month')}
          >
            This Month
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-1" />
            Custom
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Total Traffic Volume</h3>
            <Badge variant="outline">Last 24h</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">24,892</p>
              <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12% from yesterday</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Car className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Average Congestion</h3>
            <Badge variant="outline">Peak Hours</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">65%</p>
              <div className="flex items-center text-sm text-red-600 dark:text-red-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+5% from yesterday</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <ThumbsDown className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Pedestrian Activity</h3>
            <Badge variant="outline">Urban Areas</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">3,450</p>
              <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+8% from yesterday</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <User className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="traffic">
        <TabsList className="mb-4">
          <TabsTrigger value="traffic">Traffic Flow</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicle Analysis</TabsTrigger>
          <TabsTrigger value="pedestrian">Pedestrian Activity</TabsTrigger>
          <TabsTrigger value="compliance">Road Sign Compliance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="traffic">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Traffic Congestion Over Time</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={congestionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip contentStyle={{ borderRadius: '8px' }} />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="level" 
                      name="Congestion %" 
                      stroke="#f97316" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="speed" 
                      name="Avg Speed (mph)" 
                      stroke="#0ea5e9" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium mb-4">Traffic Density by Area</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={areaDensityData} 
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis type="number" />
                    <YAxis dataKey="area" type="category" />
                    <Tooltip contentStyle={{ borderRadius: '8px' }} />
                    <Bar 
                      dataKey="density" 
                      name="Traffic Density %" 
                      fill="#0ea5e9" 
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Insights</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <ThumbsDown className="h-4 w-4 text-red-500 mr-2" />
                    <span>Downtown showing highest congestion at 85%</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <ThumbsUp className="h-4 w-4 text-green-500 mr-2" />
                    <span>North End has optimal traffic flow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-medium mb-4">Weekly Traffic Trends</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="volume" 
                    name="Vehicle Volume" 
                    stackId="1"
                    stroke="#0ea5e9" 
                    fill="#0ea5e9" 
                    fillOpacity={0.3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="congestion" 
                    name="Congestion %" 
                    stackId="2"
                    stroke="#f97316" 
                    fill="#f97316" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="vehicles">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium mb-4">Vehicle Type Distribution</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vehicleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip contentStyle={{ borderRadius: '8px' }} />
                    <Bar dataKey="count" fill="#0284c7" radius={[4, 4, 0, 0]}>
                      {vehicleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium mb-4">Vehicle Type Percentage</h3>
              <div className="h-[350px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vehicleData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={130}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {vehicleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value} vehicles`, name]}
                      contentStyle={{ borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="pedestrian">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium mb-4">Pedestrian Activity Throughout Day</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={pedestrianData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip contentStyle={{ borderRadius: '8px' }} />
                    <Area 
                      type="monotone" 
                      dataKey="count" 
                      name="Pedestrian Count" 
                      stroke="#16a34a" 
                      fill="#16a34a" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium mb-4">Pedestrian Hotspots</h3>
              <div className="space-y-4">
                {[
                  { area: 'Shopping District', count: 1200, increase: true },
                  { area: 'Business Center', count: 950, increase: true },
                  { area: 'University Area', count: 820, increase: false },
                  { area: 'Transport Hub', count: 750, increase: true },
                  { area: 'Park & Recreation', count: 580, increase: true },
                  { area: 'Residential Zone', count: 420, increase: false },
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{item.area}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.count} pedestrians recorded
                      </p>
                    </div>
                    <div className={`flex items-center text-sm ${
                      item.increase ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    }`}>
                      {item.increase ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span>{item.increase ? "+" : "-"}
                        {Math.floor(Math.random() * 15) + 5}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="compliance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium mb-4">Road Sign Compliance Rates</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={roadSignData} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    barCategoryGap="20%"
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip contentStyle={{ borderRadius: '8px' }} />
                    <Legend />
                    <Bar dataKey="compliance" name="Compliance %" fill="#16a34a" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="violations" name="Violations %" fill="#dc2626" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium mb-4">Compliance Issues Breakdown</h3>
              <div className="space-y-4">
                {[
                  { type: 'Speed Limit Violations', count: 245, area: 'Highway 101' },
                  { type: 'Red Light Running', count: 78, area: 'Central Intersections' },
                  { type: 'Illegal Parking', count: 156, area: 'Downtown Area' },
                  { type: 'Pedestrian Right-of-Way', count: 42, area: 'Shopping District' },
                  { type: 'No Turn on Red', count: 35, area: 'Business Center' },
                ].map((issue, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{issue.type}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {issue.area}
                      </div>
                    </div>
                    <Badge variant="destructive">{issue.count}</Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Recommended Actions</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs text-amber-700 dark:text-amber-400">1</span>
                    </div>
                    <span>Increase enforcement at Highway 101 speed trap zones</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs text-amber-700 dark:text-amber-400">2</span>
                    </div>
                    <span>Add camera enforcement at central intersection red lights</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs text-amber-700 dark:text-amber-400">3</span>
                    </div>
                    <span>Increase parking patrol in downtown high-violation areas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExpandedTrafficAnalysis;
