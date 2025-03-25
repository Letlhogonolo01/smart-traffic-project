
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Car, Maximize2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data - vehicle types
const vehicleData = [
  { type: 'Cars', count: 1200 },
  { type: 'Trucks', count: 300 },
  { type: 'Buses', count: 150 },
  { type: 'Motorcycles', count: 400 },
  { type: 'Bicycles', count: 250 },
];

// Mock data - traffic congestion over time
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

const TrafficAnalysis = ({ onExpand }: { onExpand?: () => void }) => {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Traffic Analysis
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Vehicle Distribution</h4>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vehicleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Bar dataKey="count" fill="#0284c7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Traffic Congestion (24h)</h4>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={congestionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="level" name="Congestion %" stroke="#f97316" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="speed" name="Avg Speed (mph)" stroke="#0ea5e9" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficAnalysis;
