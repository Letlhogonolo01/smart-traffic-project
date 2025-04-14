
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Car, Maximize2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Today's data
const vehicleDataToday = [
  { type: 'Cars', count: 1200 },
  { type: 'Trucks', count: 300 },
  { type: 'Buses', count: 150 },
  { type: 'Motorcycles', count: 400 },
  { type: 'Bicycles', count: 250 },
];

// This week's data
const vehicleDataWeek = [
  { type: 'Cars', count: 8500 },
  { type: 'Trucks', count: 2100 },
  { type: 'Buses', count: 1050 },
  { type: 'Motorcycles', count: 1800 },
  { type: 'Bicycles', count: 1200 },
];

// This month's data
const vehicleDataMonth = [
  { type: 'Cars', count: 32000 },
  { type: 'Trucks', count: 8400 },
  { type: 'Buses', count: 4200 },
  { type: 'Motorcycles', count: 6500 },
  { type: 'Bicycles', count: 4100 },
];

// Traffic congestion data for today
const congestionDataToday = [
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

// Traffic congestion data for this week
const congestionDataWeek = [
  { time: 'Mon', level: 55, speed: 32 },
  { time: 'Tue', level: 60, speed: 30 },
  { time: 'Wed', level: 65, speed: 28 },
  { time: 'Thu', level: 70, speed: 26 },
  { time: 'Fri', level: 80, speed: 21 },
  { time: 'Sat', level: 65, speed: 28 },
  { time: 'Sun', level: 40, speed: 38 },
];

// Traffic congestion data for this month
const congestionDataMonth = [
  { time: 'W1', level: 58, speed: 31 },
  { time: 'W2', level: 63, speed: 29 },
  { time: 'W3', level: 67, speed: 27 },
  { time: 'W4', level: 62, speed: 30 },
];

const TrafficAnalysis = ({ onExpand }: { onExpand?: () => void }) => {
  const [timeFilter, setTimeFilter] = useState('today');
  
  // Select the appropriate data based on the time filter
  const getVehicleData = () => {
    switch (timeFilter) {
      case 'week':
        return vehicleDataWeek;
      case 'month':
        return vehicleDataMonth;
      default:
        return vehicleDataToday;
    }
  };
  
  const getCongestionData = () => {
    switch (timeFilter) {
      case 'week':
        return congestionDataWeek;
      case 'month':
        return congestionDataMonth;
      default:
        return congestionDataToday;
    }
  };
  
  // Get the appropriate data based on the time filter
  const vehicleData = getVehicleData();
  const congestionData = getCongestionData();
  
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Traffic Analysis
        </CardTitle>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="today" value={timeFilter} onValueChange={setTimeFilter}>
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0 ml-1" 
            onClick={onExpand}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
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
            <h4 className="text-sm font-medium">
              Traffic Congestion ({timeFilter === 'today' ? '24h' : timeFilter === 'week' ? '7 days' : '4 weeks'})
            </h4>
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
