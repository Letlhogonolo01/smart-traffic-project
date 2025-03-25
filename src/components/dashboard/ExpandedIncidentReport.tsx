
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Car, MapPin, Calendar, Clock, Phone, User, Building, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Mock detailed incident data
const incidents = [
  {
    id: 1,
    type: 'Accident',
    location: 'Main St & 5th Ave',
    severity: 'High',
    status: 'Active',
    respondents: ['Police', 'Ambulance', 'Fire Department'],
    timestamp: '2024-02-20T10:30:00',
    description: 'Multi-vehicle collision with possible injuries. Traffic blocked in all directions.',
    coordinates: { lat: 40.7128, lng: -74.006 },
    updates: [
      { time: '10:30:15', text: 'Incident reported by traffic camera' },
      { time: '10:31:02', text: 'Dispatched emergency services' },
      { time: '10:33:45', text: 'Police unit arrived on scene' },
      { time: '10:35:12', text: 'Ambulance arrived on scene' },
      { time: '10:40:30', text: 'Fire department arrived on scene' },
      { time: '10:45:00', text: 'Traffic being diverted, expect delays' },
    ],
    affected: {
      lanes: '3 of 4',
      estimatedClearTime: '11:30:00',
      impactRadius: '0.5 miles',
      congestionLevel: 'Severe'
    },
    media: {
      cameraId: 'CAM-05123',
      available: true
    }
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
    coordinates: { lat: 40.7129, lng: -74.007 },
    updates: [
      { time: '10:25:00', text: 'Slow traffic detected by sensors' },
      { time: '10:30:15', text: 'Volume increased, speeds dropped below 15mph' },
      { time: '10:45:30', text: 'Traffic control monitoring situation' },
    ],
    affected: {
      lanes: 'All lanes',
      estimatedClearTime: '11:15:00',
      impactRadius: '3 miles',
      congestionLevel: 'Moderate'
    },
    media: {
      cameraId: 'CAM-HW101-42',
      available: true
    }
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
    coordinates: { lat: 40.7130, lng: -74.008 },
    updates: [
      { time: '09:00:00', text: 'Road work scheduled for 11:00' },
      { time: '10:45:00', text: 'Preparations beginning' },
      { time: '11:00:00', text: 'Lane closure implemented' },
    ],
    affected: {
      lanes: '1 of 3',
      estimatedClearTime: '14:00:00',
      impactRadius: '0.2 miles',
      congestionLevel: 'Light'
    },
    media: {
      cameraId: 'CAM-W23',
      available: false
    }
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
    coordinates: { lat: 40.7131, lng: -74.009 },
    updates: [
      { time: '10:15:30', text: 'Incident reported by citizen app' },
      { time: '10:17:45', text: 'Dispatched police unit' },
      { time: '10:22:10', text: 'Police arrived on scene' },
      { time: '10:30:00', text: 'Tow truck requested' },
    ],
    affected: {
      lanes: '1 of 3',
      estimatedClearTime: '11:00:00',
      impactRadius: '0.3 miles',
      congestionLevel: 'Moderate'
    },
    media: {
      cameraId: 'CAM-B34-01',
      available: true
    }
  },
];

const ExpandedIncidentReport = () => {
  const [selectedIncident, setSelectedIncident] = useState(incidents[0]);
  
  return (
    <div className="grid grid-cols-1 gap-6">
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Incident List</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="sticky top-0">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-2">
                <h3 className="text-sm font-medium mb-2">Filter Incidents</h3>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                    Accidents
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Car className="h-4 w-4 mr-2 text-amber-500" />
                    Traffic
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2 text-blue-500" />
                    Road Work
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2 text-purple-500" />
                    Events
                  </Button>
                </div>
                <div className="space-y-2 mt-4">
                  <h3 className="text-sm font-medium mb-1">Severity</h3>
                  <div className="flex gap-2">
                    <Badge variant="destructive">High</Badge>
                    <Badge variant="default">Medium</Badge>
                    <Badge variant="secondary">Low</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {incidents.map((incident) => (
                  <div
                    key={incident.id}
                    className={`flex items-start justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedIncident.id === incident.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700'
                        : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedIncident(incident)}
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
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(incident.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    {selectedIncident.type === 'Accident' ? (
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                    ) : selectedIncident.type === 'Traffic Jam' ? (
                      <Car className="h-6 w-6 text-amber-500" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-blue-500" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-medium">{selectedIncident.type}</h2>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {selectedIncident.location}
                    </div>
                  </div>
                </div>
                <Badge
                  variant={
                    selectedIncident.severity === 'High'
                      ? 'destructive'
                      : selectedIncident.severity === 'Medium'
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {selectedIncident.severity}
                </Badge>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm">
                      {new Date(selectedIncident.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm">
                      {new Date(selectedIncident.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Car className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm">
                      Affected: {selectedIncident.affected.lanes} lanes
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm">
                      Est. Clear: {selectedIncident.affected.estimatedClearTime}
                    </span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Description</h3>
                  <p className="text-sm">{selectedIncident.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Responding Units</h3>
                    <div className="space-y-2">
                      {selectedIncident.respondents.map((unit) => (
                        <div
                          key={unit}
                          className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center">
                            {unit === 'Police' ? (
                              <User className="h-4 w-4 mr-2 text-blue-500" />
                            ) : unit === 'Ambulance' ? (
                              <User className="h-4 w-4 mr-2 text-red-500" />
                            ) : unit === 'Fire Department' ? (
                              <User className="h-4 w-4 mr-2 text-orange-500" />
                            ) : (
                              <Building className="h-4 w-4 mr-2 text-gray-500" />
                            )}
                            <span className="text-sm">{unit}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">On Scene</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Live Camera Feed</h3>
                    {selectedIncident.media.available ? (
                      <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                        {selectedIncident.type === 'Accident' ? (
                          <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/lekdUXv82xQ?autoplay=0&mute=1&start=40"
                            title="Traffic Camera Feed"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            className="rounded"
                          ></iframe>
                        ) : (
                          <div className="text-center">
                            <Car className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Live feed from camera {selectedIncident.media.cameraId}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">
                          No camera feed available
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Incident Updates</h3>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {selectedIncident.updates.map((update, index) => (
                      <div
                        key={index}
                        className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-start"
                      >
                        <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                          <MessageSquare className="h-3 w-3 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">
                            {update.time}
                          </div>
                          <div className="text-sm">{update.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex items-center justify-between">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Responders
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button size="sm">Dispatch Unit</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="map" className="h-[700px]">
          <div className="bg-gray-100 dark:bg-gray-800 h-full rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Interactive incident map would be displayed here</p>
              <p className="text-sm text-muted-foreground mt-1">
                Showing all {incidents.length} active incidents
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Incident Trend Analysis</h3>
                <div className="h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Incident trend charts would be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Incident Statistics</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Incidents by Type
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded">
                        <p className="text-xs text-red-800 dark:text-red-300">Accidents</p>
                        <p className="text-lg font-medium text-red-700 dark:text-red-400">2</p>
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
                        <p className="text-xs text-amber-800 dark:text-amber-300">Traffic Jams</p>
                        <p className="text-lg font-medium text-amber-700 dark:text-amber-400">1</p>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                        <p className="text-xs text-blue-800 dark:text-blue-300">Road Work</p>
                        <p className="text-lg font-medium text-blue-700 dark:text-blue-400">1</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                        <p className="text-xs text-gray-800 dark:text-gray-300">Other</p>
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-400">0</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Severity Distribution
                    </p>
                    <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="flex h-full">
                        <div className="bg-red-500 h-full" style={{ width: '25%' }}></div>
                        <div className="bg-amber-500 h-full" style={{ width: '50%' }}></div>
                        <div className="bg-green-500 h-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>High: 1</span>
                      <span>Medium: 2</span>
                      <span>Low: 1</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Response Time (Avg)
                    </p>
                    <p className="text-2xl font-bold">3:42</p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      12% faster than last month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExpandedIncidentReport;
