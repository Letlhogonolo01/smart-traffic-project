
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Car, MapPin } from 'lucide-react';

const DigitalTwin = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Digital Twin View
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Car className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Digital twin visualization will be rendered here
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalTwin;
