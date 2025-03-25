
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Ambulance, MapPin, Car } from 'lucide-react';

const incidents = [
  {
    id: 1,
    type: 'Accident',
    location: 'Main St & 5th Ave',
    severity: 'High',
    status: 'Active',
    respondents: ['Police', 'Ambulance'],
    timestamp: '2024-02-20T10:30:00',
  },
  {
    id: 2,
    type: 'Traffic Jam',
    location: 'Highway 101 North',
    severity: 'Medium',
    status: 'Active',
    respondents: ['Traffic Control'],
    timestamp: '2024-02-20T10:25:00',
  },
  {
    id: 3,
    type: 'Road Work',
    location: 'West Industrial Area',
    severity: 'Low',
    status: 'Scheduled',
    respondents: ['Maintenance'],
    timestamp: '2024-02-20T11:00:00',
  },
];

const IncidentReport = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Live Incidents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
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
