
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Play, Pause, Volume2, VolumeX, 
  ZoomIn, ZoomOut, Maximize2, Minimize2,
  Download, RefreshCw, Grid,
  Car, Truck, Bus, User
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import EnhancedAnalytics from './EnhancedAnalytics';

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
  { id: 'CAM-01', src: "https://www.youtube.com/embed/lekdUXv82xQ?autoplay=1&mute=1&loop=1&controls=0", name: 'Main St & 5th Ave', location: 'Downtown', status: 'Active' },
  { id: 'CAM-02', src: "https://www.youtube.com/embed/Avpce9ouYJQ?autoplay=1&mute=1&loop=1&controls=0", name: 'Highway 101 North', location: 'Highway', status: 'Active' },
  { id: 'CAM-03', src: "https://www.youtube.com/embed/i0yqhHKWY0A?autoplay=1&mute=1&loop=1&controls=0", name: 'Central Business District', location: 'Downtown', status: 'Active' },
  { id: 'CAM-04', src: "https://www.youtube.com/embed/N8_J4GPv4R0?autoplay=1&mute=1&loop=1&controls=0", name: 'West Industrial Area', location: 'Industrial', status: 'Active' },
  { id: 'CAM-05', src: "https://www.youtube.com/embed/lekdUXv82xQ?autoplay=1&mute=1&loop=1&controls=0", name: 'Shopping Mall Entrance', location: 'Commercial', status: 'Active' },
  { id: 'CAM-06', src: "https://www.youtube.com/embed/Avpce9ouYJQ?autoplay=1&mute=1&loop=1&controls=0", name: 'University Campus', location: 'Education', status: 'Active' },
  { id: 'CAM-07', src: "https://www.youtube.com/embed/i0yqhHKWY0A?autoplay=1&mute=1&loop=1&controls=0", name: 'East Residential Area', location: 'Residential', status: 'Maintenance' },
  { id: 'CAM-08', src: "https://www.youtube.com/embed/N8_J4GPv4R0?autoplay=1&mute=1&loop=1&controls=0", name: 'South Transit Hub', location: 'Transport', status: 'Active' },
];

const ExpandedVideoFeed = () => {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [detecting, setDetecting] = useState(true);
  const [detections, setDetections] = useState(mockDetections);
  const [selectedCamera, setSelectedCamera] = useState('CAM-01');
  const [objectCounts, setObjectCounts] = useState({
    cars: 15,
    trucks: 3,
    buses: 1,
    pedestrians: 5
  });
  const [viewMode, setViewMode] = useState('single');
  
  useEffect(() => {
    if (!detecting) {
      setDetections([]);
      return;
    }

    const interval = setInterval(() => {
      setDetections(prevDetections => 
        prevDetections.map(detection => ({
          ...detection,
          x: detection.x + (Math.random() * 10 - 5),
          y: detection.y + (Math.random() * 6 - 3),
        }))
      );
      
      if (Math.random() > 0.7) {
        setObjectCounts(prev => ({
          cars: prev.cars + Math.floor(Math.random() * 3) - 1,
          trucks: prev.trucks + Math.floor(Math.random() * 2) - 1,
          buses: Math.max(0, prev.buses + Math.floor(Math.random() * 2) - 1),
          pedestrians: prev.pedestrians + Math.floor(Math.random() * 2) - 1
        }));
      }
    }, 800);

    return () => clearInterval(interval);
  }, [detecting]);

  const getCurrentVideoSource = () => {
    const camera = videoSources.find(cam => cam.id === selectedCamera);
    return camera ? camera.src : videoSources[0].src;
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <Tabs defaultValue="live" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <TabsList>
            <TabsTrigger value="live">Live Feed</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={viewMode === 'single' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('single')}
            >
              <Maximize2 className="h-4 w-4 mr-1" />
              Single View
            </Button>
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4 mr-1" />
              Grid View
            </Button>
          </div>
        </div>
        
        <TabsContent value="live">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              {viewMode === 'single' ? (
                <div className="bg-black rounded-lg overflow-hidden">
                  <div className="relative">
                    <iframe
                      width="100%"
                      height="500"
                      src={getCurrentVideoSource()}
                      title="Live Traffic Camera Feed"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full"
                    ></iframe>

                    <div className="absolute top-4 left-4 text-white bg-black/50 px-3 py-1.5 rounded text-sm backdrop-blur-sm">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>LIVE: {videoSources.find(cam => cam.id === selectedCamera)?.name}</span>
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4 text-white bg-black/50 px-3 py-1.5 rounded text-sm font-mono backdrop-blur-sm">
                      {new Date().toLocaleTimeString()} | {detecting ? 'Detection Active' : 'Detection Off'}
                    </div>

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
                            <div className="text-xs bg-red-500 text-white px-1 py-0.5 leading-none mt-[-18px]">
                              {detection.type} {(detection.confidence * 100).toFixed(0)}%
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-black/60 hover:bg-black/80 text-white"
                          onClick={() => setPlaying(!playing)}
                        >
                          {playing ? 
                            <Pause className="h-4 w-4 mr-1" /> : 
                            <Play className="h-4 w-4 mr-1" />
                          }
                          {playing ? "Pause" : "Play"}
                        </Button>
                        
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-black/60 hover:bg-black/80 text-white"
                          onClick={() => setMuted(!muted)}
                        >
                          {muted ? 
                            <VolumeX className="h-4 w-4 mr-1" /> : 
                            <Volume2 className="h-4 w-4 mr-1" />
                          }
                          {muted ? "Unmute" : "Mute"}
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant={detecting ? "default" : "secondary"}
                          size="sm"
                          className={detecting ? 
                            "bg-red-500 hover:bg-red-600 text-white" : 
                            "bg-black/60 hover:bg-black/80 text-white"
                          }
                          onClick={() => setDetecting(!detecting)}
                        >
                          {detecting ? "Detecting" : "Detect Objects"}
                        </Button>
                        
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-black/60 hover:bg-black/80 text-white"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 p-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-gray-800 p-3 rounded flex items-center justify-between">
                        <div className="flex items-center">
                          <Car className="h-5 w-5 text-blue-400 mr-2" />
                          <span className="text-white">Cars</span>
                        </div>
                        <Badge className="bg-blue-600">{objectCounts.cars}</Badge>
                      </div>
                      <div className="bg-gray-800 p-3 rounded flex items-center justify-between">
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 text-amber-400 mr-2" />
                          <span className="text-white">Trucks</span>
                        </div>
                        <Badge className="bg-amber-600">{objectCounts.trucks}</Badge>
                      </div>
                      <div className="bg-gray-800 p-3 rounded flex items-center justify-between">
                        <div className="flex items-center">
                          <Bus className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-white">Buses</span>
                        </div>
                        <Badge className="bg-green-600">{objectCounts.buses}</Badge>
                      </div>
                      <div className="bg-gray-800 p-3 rounded flex items-center justify-between">
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-purple-400 mr-2" />
                          <span className="text-white">Pedestrians</span>
                        </div>
                        <Badge className="bg-purple-600">{objectCounts.pedestrians}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {videoSources.slice(0, 4).map((camera) => (
                    <div 
                      key={camera.id}
                      className={`relative rounded-lg overflow-hidden cursor-pointer ${
                        selectedCamera === camera.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => setSelectedCamera(camera.id)}
                    >
                      {camera.status === 'Active' ? (
                        <iframe
                          width="100%"
                          height="180"
                          src={camera.src}
                          title={`Live Feed from ${camera.name}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          className="w-full"
                        ></iframe>
                      ) : (
                        <div className="bg-gray-800 w-full h-[180px] flex items-center justify-center">
                          <div className="text-center">
                            <RefreshCw className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-400">
                              {camera.status === 'Offline' ? 'Camera Offline' : 'Under Maintenance'}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="truncate">{camera.name}</span>
                          <div className="flex items-center">
                            <div 
                              className={`h-2 w-2 rounded-full mr-1 ${
                                camera.status === 'Active' ? 'bg-green-500' : 
                                camera.status === 'Offline' ? 'bg-red-500' : 'bg-yellow-500'
                              }`}
                            ></div>
                            <span className="text-xs">{camera.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <div className="sticky top-4">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <h3 className="font-medium">Camera Feeds</h3>
                  </div>
                  
                  <div className="p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                      {videoSources.map((camera) => (
                        <div
                          key={camera.id}
                          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                            selectedCamera === camera.id 
                              ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700' 
                              : 'border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => setSelectedCamera(camera.id)}
                        >
                          <div>
                            <div className="flex items-center">
                              <div 
                                className={`h-2 w-2 rounded-full mr-2 ${
                                  camera.status === 'Active' ? 'bg-green-500' : 
                                  camera.status === 'Offline' ? 'bg-red-500' : 'bg-yellow-500'
                                }`}
                              ></div>
                              <h4 className="font-medium text-sm">{camera.name}</h4>
                            </div>
                            <p className="text-xs text-muted-foreground ml-4">{camera.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-6">Video Feed Analytics</h3>
            <EnhancedAnalytics analyticsType="traffic" height="450px" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExpandedVideoFeed;
