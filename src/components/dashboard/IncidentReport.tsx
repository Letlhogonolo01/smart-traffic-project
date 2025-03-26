
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Ambulance, MapPin, Car, Maximize2, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const incidents = [
  {
    id: 1,
    type: 'Accident',
    location: 'Main St & 5th Ave',
    severity: 'High',
    status: 'Active',
    respondents: ['Police', 'Ambulance'],
    timestamp: '2024-02-20T10:30:00',
    description: 'Multi-vehicle collision with possible injuries. Traffic blocked in all directions.',
    coordinates: { lat: 40.7128, lng: -74.006 }
  },
  {
    id: 2,
    type: 'Traffic Jam',
    location: 'Highway 101 North',
    severity: 'Medium',
    status: 'Active',
    respondents: ['Traffic Control'],
    timestamp: '2024-02-20T10:25:00',
    description: 'Heavy congestion due to rush hour. Average speed below 10mph.',
    coordinates: { lat: 40.7129, lng: -74.007 }
  },
  {
    id: 3,
    type: 'Road Work',
    location: 'West Industrial Area',
    severity: 'Low',
    status: 'Scheduled',
    respondents: ['Maintenance'],
    timestamp: '2024-02-20T11:00:00',
    description: 'Scheduled maintenance. One lane closed. Expect minor delays.',
    coordinates: { lat: 40.7130, lng: -74.008 }
  },
  {
    id: 4,
    type: 'Accident',
    location: 'Broadway & 34th St',
    severity: 'Medium',
    status: 'Active',
    respondents: ['Police'],
    timestamp: '2024-02-20T10:15:00',
    description: 'Vehicle collision with property damage. Right lane blocked.',
    coordinates: { lat: 40.7131, lng: -74.009 }
  },
];

const incidentTrendData = [
  { day: 'Mon', accidents: 5, congestion: 12, roadwork: 3 },
  { day: 'Tue', accidents: 3, congestion: 14, roadwork: 2 },
  { day: 'Wed', accidents: 4, congestion: 10, roadwork: 4 },
  { day: 'Thu', accidents: 6, congestion: 15, roadwork: 2 },
  { day: 'Fri', accidents: 8, congestion: 18, roadwork: 1 },
  { day: 'Sat', accidents: 7, congestion: 13, roadwork: 0 },
  { day: 'Sun', accidents: 3, congestion: 8, roadwork: 0 },
];

const incidentTypeData = [
  { name: 'Accidents', value: 36 },
  { name: 'Traffic Jams', value: 42 },
  { name: 'Road Work', value: 12 },
  { name: 'Weather Events', value: 8 },
  { name: 'Other', value: 2 },
];

const COLORS = ['#ef4444', '#f97316', '#3b82f6', '#8b5cf6', '#10b981'];

const IncidentReport = ({ onExpand }: { onExpand?: () => void }) => {
  const [activeTab, setActiveTab] = useState('incidents');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Live Incidents
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={onExpand}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-2">
          <TabsList>
            <TabsTrigger value="incidents">Active</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <TabsContent value="incidents" className="m-0">
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => onExpand && onExpand()}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {incident.type === 'Accident' ? (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    ) : incident.type === 'Traffic Jam' ? (
                      <Car className="h-5 w-5 text-amber-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{incident.type}</h4>
                      <Badge
                        variant={
                          incident.severity === 'High'
                            ? 'destructive'
                            : incident.severity === 'Medium'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {incident.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {incident.location}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {incident.respondents.map((respondent) => (
                        <Badge key={respondent} variant="outline">
                          {respondent}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(incident.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="map" className="m-0">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden" style={{ height: '300px' }}>
            <div className="h-full bg-gray-100 dark:bg-gray-800 p-4 relative">
              {/* Mock map background */}
              <div className="absolute inset-0 bg-[#e9edf3] dark:bg-gray-900 overflow-hidden">
                <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                  {/* Mock roads */}
                  <path d="M0,300 L800,300" stroke="#999" strokeWidth="10" fill="none" />
                  <path d="M0,150 L800,150" stroke="#999" strokeWidth="6" fill="none" />
                  <path d="M0,450 L800,450" stroke="#999" strokeWidth="6" fill="none" />
                  <path d="M400,0 L400,600" stroke="#999" strokeWidth="10" fill="none" />
                  <path d="M200,0 L200,600" stroke="#999" strokeWidth="6" fill="none" />
                  <path d="M600,0 L600,600" stroke="#999" strokeWidth="6" fill="none" />
                </svg>
              </div>

              {/* Incident markers */}
              {incidents.map((incident) => (
                <div 
                  key={incident.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
                  style={{
                    left: `${(incident.coordinates.lng + 74.02) * 8000}%`, 
                    top: `${(40.72 - incident.coordinates.lat) * 8000}%`
                  }}
                >
                  <div 
                    className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg
                    ${incident.severity === 'High' 
                      ? 'bg-red-500 text-white' 
                      : incident.severity === 'Medium'
                      ? 'bg-orange-500 text-white'
                      : 'bg-blue-500 text-white'}`}
                  >
                    {incident.type === 'Accident' ? (
                      <AlertTriangle className="h-5 w-5" />
                    ) : incident.type === 'Traffic Jam' ? (
                      <Car className="h-5 w-5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5" />
                    )}
                  </div>
                  <div className="mt-1 px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs font-medium shadow-md">
                    {incident.type}
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-2 left-2 bg-white dark:bg-gray-800 rounded-md shadow-md p-2 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                  <span>High Severity</span>
                </div>
                <div className="flex items-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
                  <span>Medium Severity</span>
                </div>
                <div className="flex items-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                  <span>Low Severity</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="m-0 space-y-4">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
            <h4 className="text-sm font-medium mb-2">Weekly Incident Trends</h4>
            <div style={{ height: '130px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={incidentTrendData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="accidents" stroke="#ef4444" />
                  <Line type="monotone" dataKey="congestion" stroke="#f97316" />
                  <Line type="monotone" dataKey="roadwork" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
            <h4 className="text-sm font-medium mb-2">Incident Types Distribution</h4>
            <div style={{ height: '130px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incidentTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {incidentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default IncidentReport;
