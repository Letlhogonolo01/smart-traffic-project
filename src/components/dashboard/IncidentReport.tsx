
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Ambulance, MapPin, Car, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const IncidentReport = ({ onExpand }: { onExpand?: () => void }) => {
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
      </CardContent>
    </Card>
  );
};

export default IncidentReport;
