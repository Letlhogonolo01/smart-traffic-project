
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for traffic congestion points
const congestionPoints = [
  { id: 1, lat: 40.712, lng: -74.006, severity: 'high', name: 'Main St & 5th Ave' },
  { id: 2, lat: 40.713, lng: -74.012, severity: 'medium', name: 'Broadway & 34th St' },
  { id: 3, lat: 40.708, lng: -73.998, severity: 'low', name: 'East Residential Area' },
  { id: 4, lat: 40.718, lng: -74.009, severity: 'high', name: 'Highway 101 North' }
];

// Mock data for alternative routes
const alternativeRoutes = [
  {
    id: 1,
    origin: 'Main St & 5th Ave',
    destination: 'Downtown',
    waypoints: [
      { lat: 40.712, lng: -74.006 },
      { lat: 40.710, lng: -74.003 },
      { lat: 40.708, lng: -74.000 },
      { lat: 40.705, lng: -73.998 }
    ],
    timeReduction: '8 mins',
    distance: '1.2 miles'
  },
  {
    id: 2,
    origin: 'Broadway & 34th St',
    destination: 'Midtown',
    waypoints: [
      { lat: 40.713, lng: -74.012 },
      { lat: 40.715, lng: -74.015 },
      { lat: 40.718, lng: -74.018 },
      { lat: 40.720, lng: -74.020 }
    ],
    timeReduction: '5 mins',
    distance: '0.8 miles'
  }
];

interface TrafficRoutingMapProps {
  mapType?: 'traffic' | 'incidents';
  height?: string;
}

const TrafficRoutingMap: React.FC<TrafficRoutingMapProps> = ({ 
  mapType = 'traffic',
  height = '400px'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  
  // Initialize map canvas with mock data
  useEffect(() => {
    if (!mapRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = mapRef.current.clientWidth;
    canvas.height = mapRef.current.clientHeight;
    mapRef.current.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Draw map background
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines for streets
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 1;
    
    // Vertical streets
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // Horizontal streets
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Draw main roads
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 6;
    
    // Main horizontal road
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
    
    // Main vertical road
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
    
    // Draw congestion on roads
    congestionPoints.forEach((point, index) => {
      // Randomize position on canvas based on index
      const x = 100 + (index * 150) % (canvas.width - 200);
      const y = 80 + (index * 100) % (canvas.height - 150);
      
      let color;
      switch(point.severity) {
        case 'high':
          color = '#ef4444';
          break;
        case 'medium':
          color = '#f97316';
          break;
        case 'low':
          color = '#fbbf24';
          break;
        default:
          color = '#10b981';
      }
      
      // Draw congestion circle
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fill();
      ctx.globalAlpha = 1.0;
      
      // Draw circle border
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.stroke();
    });
    
    // Draw alternative routes if a route is selected
    if (selectedRoute !== null) {
      const route = alternativeRoutes.find(r => r.id === selectedRoute);
      if (route) {
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 4;
        ctx.setLineDash([5, 3]);
        
        // Create a path from random points on the canvas
        const startX = 100 + (selectedRoute * 50) % (canvas.width - 300);
        const startY = 100 + (selectedRoute * 70) % (canvas.height - 200);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        // Generate some waypoints for the route
        const waypoints = 3 + Math.floor(Math.random() * 3);
        for (let i = 1; i <= waypoints; i++) {
          const pointX = startX + (i * canvas.width / (waypoints + 1) * 0.7);
          const pointY = startY + (Math.sin(i) * 80);
          ctx.lineTo(pointX, pointY);
        }
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw arrow at the end of the route
        const arrowX = startX + (canvas.width / 2);
        const arrowY = startY + 40;
        
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY - 10);
        ctx.lineTo(arrowX + 10, arrowY);
        ctx.lineTo(arrowX, arrowY + 10);
        ctx.closePath();
        ctx.fill();
      }
    }
    
    // Draw incident markers for incident map
    if (mapType === 'incidents') {
      [
        { x: canvas.width * 0.2, y: canvas.height * 0.3 },
        { x: canvas.width * 0.7, y: canvas.height * 0.6 },
        { x: canvas.width * 0.5, y: canvas.height * 0.2 },
        { x: canvas.width * 0.3, y: canvas.height * 0.7 }
      ].forEach((pos, i) => {
        // Draw warning triangle
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y - 15);
        ctx.lineTo(pos.x + 15, pos.y + 15);
        ctx.lineTo(pos.x - 15, pos.y + 15);
        ctx.closePath();
        ctx.fill();
        
        // Draw exclamation mark
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('!', pos.x, pos.y + 5);
      });
    }
    
    return () => {
      if (mapRef.current && canvas) {
        mapRef.current.removeChild(canvas);
      }
    };
  }, [mapType, selectedRoute]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex space-x-2 mb-2">
          <Badge className="bg-red-500">Heavy Traffic</Badge>
          <Badge className="bg-orange-500">Moderate</Badge>
          <Badge className="bg-yellow-500">Light</Badge>
          {mapType === 'traffic' && (
            <Badge className="bg-green-500">Alternate Routes</Badge>
          )}
        </div>
        {mapType === 'traffic' && (
          <div className="flex space-x-2 mb-2">
            <button 
              className={`text-xs px-3 py-1 rounded-full flex items-center ${
                selectedRoute === 1 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-gray-100 text-gray-700 border border-gray-300'
              }`}
              onClick={() => setSelectedRoute(selectedRoute === 1 ? null : 1)}
            >
              <Navigation className="h-3 w-3 mr-1" />
              Route 1 (-8 mins)
            </button>
            <button 
              className={`text-xs px-3 py-1 rounded-full flex items-center ${
                selectedRoute === 2 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-gray-100 text-gray-700 border border-gray-300'
              }`}
              onClick={() => setSelectedRoute(selectedRoute === 2 ? null : 2)}
            >
              <Navigation className="h-3 w-3 mr-1" />
              Route 2 (-5 mins)
            </button>
          </div>
        )}
      </div>
      
      <div 
        ref={mapRef} 
        className="w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 relative"
        style={{ height }}
      >
        {/* Map will be rendered here by the canvas */}
        
        {/* Overlay controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button className="w-8 h-8 bg-white dark:bg-gray-700 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <span className="text-lg font-bold">+</span>
          </button>
          <button className="w-8 h-8 bg-white dark:bg-gray-700 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <span className="text-lg font-bold">−</span>
          </button>
        </div>
      </div>
      
      {selectedRoute !== null && mapType === 'traffic' && (
        <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg">
          <h4 className="text-sm font-medium flex items-center text-green-800 dark:text-green-300">
            <Navigation className="h-4 w-4 mr-2" /> 
            Alternative Route Details
          </h4>
          <p className="text-xs text-green-700 dark:text-green-400 mt-1">
            This route saves approximately {selectedRoute === 1 ? '8 minutes' : '5 minutes'} of travel time
            by avoiding congestion at {selectedRoute === 1 ? 'Main St & 5th Ave' : 'Broadway & 34th St'}.
          </p>
        </div>
      )}
      
      {mapType === 'incidents' && (
        <div className="mt-2 grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map(i => (
            <div 
              key={i} 
              className="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg"
            >
              <div className="flex items-center">
                <AlertTriangle className="h-3 w-3 text-red-600 dark:text-red-400 mr-1" />
                <h5 className="text-xs font-medium text-red-800 dark:text-red-300">
                  {['Accident', 'Traffic Jam', 'Road Work', 'Road Closure'][i-1]}
                </h5>
              </div>
              <p className="text-xs text-red-700 dark:text-red-400 mt-0.5">
                {['Main St & 5th Ave', 'Highway 101 North', 'West Industrial Area', 'Broadway & 34th St'][i-1]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrafficRoutingMap;
