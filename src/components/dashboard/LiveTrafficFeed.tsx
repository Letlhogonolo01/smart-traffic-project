
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Play, Pause, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock detection data
const mockDetections = [
  { id: 1, type: 'Car', confidence: 0.92, x: 120, y: 150, width: 80, height: 40 },
  { id: 2, type: 'Car', confidence: 0.88, x: 300, y: 180, width: 70, height: 35 },
  { id: 3, type: 'Truck', confidence: 0.85, x: 220, y: 140, width: 100, height: 50 },
  { id: 4, type: 'Bus', confidence: 0.79, x: 400, y: 160, width: 110, height: 60 },
  { id: 5, type: 'Pedestrian', confidence: 0.76, x: 180, y: 200, width: 30, height: 60 }
];

const LiveTrafficFeed = ({ onExpand }: { onExpand?: () => void }) => {
  const [playing, setPlaying] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detections, setDetections] = useState<typeof mockDetections>([]);

  // Toggle play/pause (note: this is simulated as YouTube iframe doesn't allow direct control)
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
          Live Traffic Feed
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
        <div className="relative">
          {/* YouTube embedded video */}
          <iframe
            ref={videoRef}
            width="100%"
            height="240"
            src="https://www.youtube.com/embed/lekdUXv82xQ?autoplay=1&mute=1&loop=1&controls=0"
            title="Live Traffic Camera Feed"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>

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
        
        <div className="mt-3 text-xs text-muted-foreground">
          Live feed with real-time object detection technology
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveTrafficFeed;
