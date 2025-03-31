
import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for time-based analysis
const timeSeriesData = [
  { time: '00:00', vehicles: 320, incidents: 1, congestion: 15, speed: 40 },
  { time: '03:00', vehicles: 180, incidents: 0, congestion: 8, speed: 52 },
  { time: '06:00', vehicles: 620, incidents: 2, congestion: 35, speed: 28 },
  { time: '09:00', vehicles: 1400, incidents: 3, congestion: 78, speed: 15 },
  { time: '12:00', vehicles: 1100, incidents: 1, congestion: 60, speed: 22 },
  { time: '15:00', vehicles: 1320, incidents: 2, congestion: 75, speed: 18 },
  { time: '18:00', vehicles: 1650, incidents: 4, congestion: 90, speed: 12 },
  { time: '21:00', vehicles: 980, incidents: 2, congestion: 55, speed: 24 },
];

// Mock data for vehicle distribution
const vehicleDistribution = [
  { name: 'Cars', value: 68, color: '#3b82f6' },
  { name: 'Trucks', value: 12, color: '#f97316' },
  { name: 'Motorcycles', value: 8, color: '#8b5cf6' },
  { name: 'Buses', value: 7, color: '#22c55e' },
  { name: 'Bicycles', value: 5, color: '#eab308' },
];

// Mock data for incidents by type
const incidentsByType = [
  { type: 'Congestion', count: 42, color: '#f97316' },
  { type: 'Accidents', count: 7, color: '#ef4444' },
  { type: 'Roadwork', count: 12, color: '#3b82f6' },
  { type: 'Weather', count: 5, color: '#8b5cf6' },
  { type: 'Events', count: 8, color: '#22c55e' },
];

// Calculate peak hours and trends
const calculatePeakHour = () => {
  const maxCongestion = Math.max(...timeSeriesData.map(d => d.congestion));
  const peakHour = timeSeriesData.find(d => d.congestion === maxCongestion)?.time;
  return peakHour;
};

const calculateTrends = () => {
  const morningPeak = timeSeriesData.slice(2, 4);
  const eveningPeak = timeSeriesData.slice(5, 7);
  
  const avgMorningCongestion = morningPeak.reduce((sum, d) => sum + d.congestion, 0) / morningPeak.length;
  const avgEveningCongestion = eveningPeak.reduce((sum, d) => sum + d.congestion, 0) / eveningPeak.length;
  
  return {
    morningPeak: avgMorningCongestion.toFixed(0),
    eveningPeak: avgEveningCongestion.toFixed(0),
    difference: (avgEveningCongestion - avgMorningCongestion).toFixed(0),
    isEveningWorse: avgEveningCongestion > avgMorningCongestion
  };
};

interface EnhancedAnalyticsProps {
  analyticsType: 'traffic' | 'incidents';
  height?: string;
}

const EnhancedAnalytics: React.FC<EnhancedAnalyticsProps> = ({ 
  analyticsType = 'traffic',
  height = '350px' 
}) => {
  const peakHour = calculatePeakHour();
  const trends = calculateTrends();
  
  return (
    <div className="space-y-4">
      {analyticsType === 'traffic' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h4 className="text-sm font-medium mb-1 text-blue-800 dark:text-blue-300">Peak Traffic Hour</h4>
              <div className="flex items-end">
                <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">{peakHour}</span>
                <span className="ml-1 text-xs text-blue-600 dark:text-blue-500">local time</span>
              </div>
              <p className="text-xs mt-1 text-blue-600 dark:text-blue-500">
                {trends.isEveningWorse ? 'Evening' : 'Morning'} peak is {Math.abs(Number(trends.difference))}% 
                {trends.isEveningWorse ? ' higher' : ' lower'} than {trends.isEveningWorse ? 'morning' : 'evening'}
              </p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
              <h4 className="text-sm font-medium mb-1 text-amber-800 dark:text-amber-300">Current Congestion</h4>
              <div className="flex items-end">
                <span className="text-2xl font-bold text-amber-700 dark:text-amber-400">65%</span>
                <div className="ml-2 flex items-center text-xs">
                  <TrendingUp className="text-red-500 h-3 w-3 mr-0.5" />
                  <span className="text-red-600 dark:text-red-400">+12% from average</span>
                </div>
              </div>
              <div className="mt-1 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-1.5 rounded-full bg-amber-500" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <h4 className="text-sm font-medium mb-1 text-green-800 dark:text-green-300">Average Speed</h4>
              <div className="flex items-end">
                <span className="text-2xl font-bold text-green-700 dark:text-green-400">23</span>
                <span className="ml-1 text-xs text-green-600 dark:text-green-500">mph</span>
                <div className="ml-2 flex items-center text-xs">
                  <TrendingDown className="text-red-500 h-3 w-3 mr-0.5" />
                  <span className="text-red-600 dark:text-red-400">-8 mph from average</span>
                </div>
              </div>
              <p className="text-xs mt-1 text-green-600 dark:text-green-500">
                Downtown area, last 30 minutes
              </p>
            </div>
          </div>
          
          <div 
            style={{ height }} 
            className="w-full"
          >
            <h4 className="text-sm font-medium mb-2">24-Hour Traffic Analysis</h4>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart
                data={timeSeriesData}
                margin={{ top: 10, right: 30, left: 0, bottom: 15 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="vehicles" 
                  name="Vehicles" 
                  stroke="#3b82f6" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="congestion" 
                  name="Congestion %" 
                  stroke="#f97316" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="speed" 
                  name="Avg Speed (mph)" 
                  stroke="#22c55e" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Vehicle Distribution</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vehicleDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {vehicleDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Traffic Recommendations</h4>
              <div className="space-y-2">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
                  <div className="flex items-center">
                    <Badge className="bg-blue-600 mr-2">Suggestion</Badge>
                    <h5 className="text-sm font-medium">Traffic Signal Optimization</h5>
                  </div>
                  <p className="text-xs mt-1 text-muted-foreground">
                    Adjust signal timing at Main St & 5th Ave intersection to improve flow
                  </p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                  <div className="flex items-center">
                    <Badge className="bg-green-600 mr-2">Suggestion</Badge>
                    <h5 className="text-sm font-medium">Rerouting Recommendation</h5>
                  </div>
                  <p className="text-xs mt-1 text-muted-foreground">
                    Route traffic via Lincoln Ave to bypass downtown congestion during 18:00-19:00
                  </p>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800">
                  <div className="flex items-center">
                    <Badge className="bg-amber-600 mr-2">Alert</Badge>
                    <h5 className="text-sm font-medium">Predicted Congestion</h5>
                  </div>
                  <p className="text-xs mt-1 text-muted-foreground">
                    Heavy traffic expected at Highway 101 North tomorrow between 08:00-09:30
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Incident analytics
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <h4 className="text-sm font-medium mb-1 text-red-800 dark:text-red-300">Current Incidents</h4>
              <div className="flex items-end">
                <span className="text-2xl font-bold text-red-700 dark:text-red-400">7</span>
                <div className="ml-2 flex items-center text-xs">
                  <TrendingUp className="text-red-500 h-3 w-3 mr-0.5" />
                  <span className="text-red-600 dark:text-red-400">+2 from yesterday</span>
                </div>
              </div>
              <p className="text-xs mt-1 text-red-600 dark:text-red-500">
                3 high priority, 4 medium priority
              </p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
              <h4 className="text-sm font-medium mb-1 text-amber-800 dark:text-amber-300">Avg. Response Time</h4>
              <div className="flex items-end">
                <span className="text-2xl font-bold text-amber-700 dark:text-amber-400">4:23</span>
                <div className="ml-2 flex items-center text-xs">
                  <TrendingDown className="text-green-500 h-3 w-3 mr-0.5" />
                  <span className="text-green-600 dark:text-green-400">-30s from average</span>
                </div>
              </div>
              <p className="text-xs mt-1 text-amber-600 dark:text-amber-500">
                Minutes:seconds to respond to incidents
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h4 className="text-sm font-medium mb-1 text-blue-800 dark:text-blue-300">Incident Hotspot</h4>
              <div className="flex items-end">
                <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">Main St</span>
              </div>
              <p className="text-xs mt-1 text-blue-600 dark:text-blue-500">
                3 incidents in the last 24 hours
              </p>
            </div>
          </div>
          
          <div 
            style={{ height }} 
            className="w-full"
          >
            <h4 className="text-sm font-medium mb-2">Incident Trend Analysis</h4>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart
                data={timeSeriesData}
                margin={{ top: 10, right: 30, left: 0, bottom: 15 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="incidents" 
                  name="Incidents" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="congestion" 
                  name="Congestion %" 
                  stroke="#f97316" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Incidents by Type</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={incidentsByType}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip contentStyle={{ borderRadius: '8px' }} />
                    <Bar dataKey="count" name="Number of Incidents">
                      {incidentsByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Critical Alerts</h4>
              <div className="space-y-2">
                {[
                  {
                    type: 'Major Accident',
                    location: 'Main St & 5th Ave',
                    time: '10:30',
                    impact: 'High'
                  },
                  {
                    type: 'Road Closure',
                    location: 'Highway 101 North',
                    time: '11:15',
                    impact: 'Medium'
                  },
                  {
                    type: 'Weather Alert',
                    location: 'Downtown Area',
                    time: '12:00',
                    impact: 'Medium'
                  }
                ].map((alert, i) => (
                  <div 
                    key={i} 
                    className="flex items-start p-2 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg"
                  >
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <div className="flex items-center">
                        <h5 className="text-sm font-medium">{alert.type}</h5>
                        <Badge 
                          className={`ml-2 ${
                            alert.impact === 'High' 
                              ? 'bg-red-500' 
                              : 'bg-amber-500'
                          }`}
                        >
                          {alert.impact}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.location} • {alert.time} • Responders dispatched
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EnhancedAnalytics;
