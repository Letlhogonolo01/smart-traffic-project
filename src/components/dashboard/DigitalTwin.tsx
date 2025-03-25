
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Maximize2 } from 'lucide-react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';

const DigitalTwin = ({ onExpand }: { onExpand?: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const carModelsRef = useRef<THREE.Mesh[]>([]);
  const frameIdRef = useRef<number>(0);

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
        <div 
          ref={containerRef} 
          className="aspect-video w-full rounded-lg overflow-hidden"
          style={{ height: '300px' }}
        />
      </CardContent>
    </Card>
  );
};

export default DigitalTwin;
