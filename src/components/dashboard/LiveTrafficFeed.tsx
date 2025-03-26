
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Play, Pause, Maximize2, ChevronLeft, ChevronRight, MapPin, BarChart2, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Mock detection data
const mockDetections = [
  { id: 1, type: 'Car', confidence: 0.92, x: 120, y: 150, width: 80, height: 40 },
  { id: 2, type: 'Car', confidence: 0.88, x: 300, y: 180, width: 70, height: 35 },
  { id: 3, type: 'Truck', confidence: 0.85, x: 220, y: 140, width: 100, height: 50 },
  { id: 4, type: 'Bus', confidence: 0.79, x: 400, y: 160, width: 110, height: 60 },
  { id: 5, type: 'Pedestrian', confidence: 0.76, x: 180, y: 200, width: 30, height: 60 }
];

// Traffic camera feeds
const videoSources = [
  "https://www.youtube.com/embed/lekdUXv82xQ?autoplay=1&mute=1&loop=1&controls=0",
  "https://www.youtube.com/embed/Avpce9ouYJQ?autoplay=1&mute=1&loop=1&controls=0",
  "https://www.youtube.com/embed/i0yqhHKWY0A?autoplay=1&mute=1&loop=1&controls=0",
  "https://www.youtube.com/embed/N8_J4GPv4R0?autoplay=1&mute=1&loop=1&controls=0"
];

const cameraLocations = [
  "Downtown Intersection",
  "Highway Traffic Flow",
  "City Center",
  "Urban Arterial Road"
];

// Camera map coordinates
const cameraCoordinates = [
  { id: 1, name: "Downtown Intersection", lat: 40.712, lng: -74.006 },
  { id: 2, name: "Highway Traffic Flow", lat: 40.718, lng: -74.015 },
  { id: 3, name: "City Center", lat: 40.707, lng: -74.010 },
  { id: 4, name: "Urban Arterial Road", lat: 40.715, lng: -73.995 }
];

// Analytics mock data
const analyticsData = [
  { time: '00:00', cars: 45, trucks: 8, buses: 3, pedestrians: 12 },
  { time: '04:00', cars: 20, trucks: 5, buses: 1, pedestrians: 3 },
  { time: '08:00', cars: 120, trucks: 25, buses: 8, pedestrians: 48 },
  { time: '12:00', cars: 85, trucks: 18, buses: 10, pedestrians: 35 },
  { time: '16:00', cars: 135, trucks: 30, buses: 12, pedestrians: 52 },
  { time: '20:00', cars: 70, trucks: 15, buses: 5, pedestrians: 20 }
];

const incidentData = [
  { day: 'Mon', congestion: 12, accidents: 3, hazards: 5 },
  { day: 'Tue', congestion: 14, accidents: 2, hazards: 4 },
  { day: 'Wed', congestion: 8, accidents: 1, hazards: 2 },
  { day: 'Thu', congestion: 16, accidents: 4, hazards: 6 },
  { day: 'Fri', congestion: 22, accidents: 5, hazards: 8 },
  { day: 'Sat', congestion: 18, accidents: 3, hazards: 5 },
  { day: 'Sun', congestion: 8, accidents: 1, hazards: 3 }
];

const LiveTrafficFeed = ({ onExpand }: { onExpand?: () => void }) => {
  const [playing, setPlaying] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detections, setDetections] = useState<typeof mockDetections>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('video');

  // Toggle play/pause
  const togglePlay = () => {
    setPlaying(!playing);
  };

  // Toggle object detection overlay
  const toggleDetection = () => {
    if (!detecting) {
      setDetections(mockDetections);
    } else {
      setDetections([]);
    }
    setDetecting(!detecting);
  };

  // Change camera feed
  const changeCamera = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
    } else {
      setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videoSources.length) % videoSources.length);
    }
  };

  // Simulation of detections updating over time
  useEffect(() => {
    if (!detecting) return;

    const interval = setInterval(() => {
      setDetections(prevDetections => 
        prevDetections.map(detection => ({
          ...detection,
          x: detection.x + (Math.random() * 10 - 5),
          y: detection.y + (Math.random() * 6 - 3),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [detecting]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          Live Traffic Feed: {cameraLocations[currentVideoIndex]}
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
            <TabsTrigger value="video">Live Feed</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </Tabs>

        <TabsContent value="video" className="m-0">
          <div className="relative">
            {/* YouTube embedded video */}
            <iframe
              ref={videoRef}
              width="100%"
              height="240"
              src={videoSources[currentVideoIndex]}
              title="Live Traffic Camera Feed"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>

            {/* Camera selection overlay */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                className="h-8 w-8 p-0 bg-black/60 hover:bg-black/80 text-white rounded-full"
                onClick={() => changeCamera('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 flex items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                className="h-8 w-8 p-0 bg-black/60 hover:bg-black/80 text-white rounded-full"
                onClick={() => changeCamera('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Detections overlay */}
            {detecting && (
              <div className="absolute inset-0 pointer-events-none">
                {detections.map(detection => (
                  <div 
                    key={detection.id}
                    className="absolute border-2 border-red-500 flex items-start justify-between"
                    style={{
                      left: `${detection.x}px`,
                      top: `${detection.y}px`,
                      width: `${detection.width}px`,
                      height: `${detection.height}px`
                    }}
                  >
                    <div className="text-[10px] bg-red-500 text-white px-1 leading-tight mt-[-18px]">
                      {detection.type} {(detection.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <Button
                variant="secondary"
                size="sm"
                className="bg-black/60 hover:bg-black/80 text-white"
                onClick={togglePlay}
              >
                {playing ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                {playing ? "Pause" : "Play"}
              </Button>
              
              <Button
                variant={detecting ? "default" : "secondary"}
                size="sm"
                className={detecting ? "bg-red-500 hover:bg-red-600 text-white" : "bg-black/60 hover:bg-black/80 text-white"}
                onClick={toggleDetection}
              >
                {detecting ? "Detecting" : "Detect Objects"}
              </Button>
            </div>
          </div>
          
          <div className="mt-3 text-xs text-muted-foreground flex justify-between">
            <span>Live feed with real-time object detection technology</span>
            <span>Camera {currentVideoIndex + 1}/{videoSources.length}</span>
          </div>
        </TabsContent>

        <TabsContent value="map" className="m-0">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden" style={{ height: '240px' }}>
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

              {/* Camera pins */}
              {cameraCoordinates.map((camera, index) => (
                <div 
                  key={camera.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center ${index === currentVideoIndex ? 'z-20' : 'z-10'}`}
                  style={{
                    left: `${(camera.lng + 74.02) * 8000}%`, 
                    top: `${(40.72 - camera.lat) * 8000}%`
                  }}
                >
                  <div 
                    className={`flex items-center justify-center w-10 h-10 rounded-full 
                    ${index === currentVideoIndex 
                      ? 'bg-red-500 text-white shadow-lg animate-pulse' 
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
                    onClick={() => setCurrentVideoIndex(index)}
                  >
                    <Camera className="h-5 w-5" />
                  </div>
                  {index === currentVideoIndex && (
                    <div className="mt-1 px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs font-medium shadow-md">
                      {camera.name}
                    </div>
                  )}
                </div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-2 left-2 bg-white dark:bg-gray-800 rounded-md shadow-md p-2 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                  <span>Active Camera</span>
                </div>
                <div className="flex items-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700 mr-1"></div>
                  <span>Other Cameras</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            <span>Interactive camera map with {cameraCoordinates.length} monitoring points</span>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="m-0 space-y-4">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
            <h4 className="text-sm font-medium mb-2">Object Detection Trends</h4>
            <div style={{ height: '120px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="cars" stroke="#3b82f6" />
                  <Line type="monotone" dataKey="trucks" stroke="#10b981" />
                  <Line type="monotone" dataKey="buses" stroke="#f97316" />
                  <Line type="monotone" dataKey="pedestrians" stroke="#8b5cf6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
            <h4 className="text-sm font-medium mb-2">Incident Detection</h4>
            <div style={{ height: '120px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incidentData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="congestion" fill="#3b82f6" />
                  <Bar dataKey="accidents" fill="#ef4444" />
                  <Bar dataKey="hazards" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default LiveTrafficFeed;
