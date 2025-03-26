
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Maximize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DigitalTwin = ({ onExpand }: { onExpand?: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const carModelsRef = useRef<THREE.Mesh[]>([]);
  const frameIdRef = useRef<number>(0);
  const [activeView, setActiveView] = useState<string>('3d');
  const congestionOverlayRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 30, 50);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a5b1a, 
      side: THREE.DoubleSide 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create roads
    const roadGeometry = new THREE.PlaneGeometry(10, 100);
    const roadMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333, 
      side: THREE.DoubleSide 
    });
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.position.y = 0.01; // Slightly above ground to avoid z-fighting
    scene.add(road);

    // Create intersection
    const intersectionGeometry = new THREE.PlaneGeometry(10, 10);
    const intersection = new THREE.Mesh(intersectionGeometry, roadMaterial);
    intersection.rotation.x = -Math.PI / 2;
    intersection.position.y = 0.02;
    intersection.position.z = -10;
    scene.add(intersection);

    // Create horizontal road
    const horizontalRoadGeometry = new THREE.PlaneGeometry(100, 10);
    const horizontalRoad = new THREE.Mesh(horizontalRoadGeometry, roadMaterial);
    horizontalRoad.rotation.x = -Math.PI / 2;
    horizontalRoad.position.y = 0.01;
    horizontalRoad.position.z = -10;
    scene.add(horizontalRoad);

    // Create congestion overlay - initially hidden
    const congestionGroup = new THREE.Group();
    congestionGroup.visible = false;
    scene.add(congestionGroup);
    congestionOverlayRef.current = congestionGroup;

    // Create congestion hotspots
    const createCongestionHotspot = (x: number, z: number, intensity: number) => {
      const color = new THREE.Color();
      // Set color based on intensity (0-1): green to red
      color.setHSL((1 - intensity) * 0.3, 1, 0.5);
      
      const hotspotGeometry = new THREE.CircleGeometry(intensity * 8 + 2, 32);
      const hotspotMaterial = new THREE.MeshBasicMaterial({ 
        color: color, 
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      const hotspot = new THREE.Mesh(hotspotGeometry, hotspotMaterial);
      hotspot.rotation.x = -Math.PI / 2;
      hotspot.position.set(x, 0.1, z); // Slightly above the road
      congestionGroup.add(hotspot);
    };

    // Add congestion hotspots at different locations
    createCongestionHotspot(0, -10, 0.9); // Heavy congestion at intersection
    createCongestionHotspot(20, -10, 0.7); // Medium congestion
    createCongestionHotspot(-15, -10, 0.5); // Light congestion
    createCongestionHotspot(0, 15, 0.3); // Very light congestion
    createCongestionHotspot(0, -30, 0.8); // Heavy congestion

    // Create car models (simple cubes for now)
    const createCar = (x: number, z: number, color: number) => {
      const carGeometry = new THREE.BoxGeometry(2, 1, 4);
      const carMaterial = new THREE.MeshStandardMaterial({ color });
      const car = new THREE.Mesh(carGeometry, carMaterial);
      car.position.set(x, 1, z);
      car.castShadow = true;
      car.receiveShadow = true;
      scene.add(car);
      return car;
    };

    // Create some initial cars
    const cars = [
      createCar(0, 20, 0xff0000),
      createCar(0, 10, 0x0000ff),
      createCar(0, 0, 0x00ff00),
      createCar(-20, -10, 0xffff00),
      createCar(20, -10, 0xff00ff),
    ];
    carModelsRef.current = cars;

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      // Move cars
      cars.forEach((car, i) => {
        if (i < 3) {
          // Cars on vertical road
          car.position.z -= 0.2;
          if (car.position.z < -50) {
            car.position.z = 50;
          }
        } else {
          // Cars on horizontal road
          if (i === 3) {
            car.position.x += 0.15;
            if (car.position.x > 50) {
              car.position.x = -50;
            }
          } else {
            car.position.x -= 0.15;
            if (car.position.x < -50) {
              car.position.x = 50;
            }
          }
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Handle view changes
  useEffect(() => {
    if (congestionOverlayRef.current) {
      congestionOverlayRef.current.visible = activeView === 'congestion';
    }
  }, [activeView]);

  // Zoom in function
  const handleZoomIn = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z -= 10;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  // Zoom out function
  const handleZoomOut = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z += 10;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  // Reset view function
  const handleResetView = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 30, 50);
      cameraRef.current.lookAt(0, 0, 0);
      cameraRef.current.updateProjectionMatrix();
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Digital Twin View
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
        <div className="mb-2 flex justify-between items-center">
          <Tabs value={activeView} onValueChange={setActiveView} className="w-[200px]">
            <TabsList>
              <TabsTrigger value="3d">3D View</TabsTrigger>
              <TabsTrigger value="congestion">Congestion</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4 mr-1" />
              Zoom In
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4 mr-1" />
              Zoom Out
            </Button>
            <Button variant="outline" size="sm" onClick={handleResetView}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
        
        <div 
          ref={containerRef} 
          className="aspect-video w-full rounded-lg overflow-hidden"
          style={{ height: '300px' }}
        />
        
        {activeView === 'congestion' && (
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
              <span>Light</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
              <span>Moderate</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-1"></span>
              <span>Heavy</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
              <span>Severe</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DigitalTwin;
