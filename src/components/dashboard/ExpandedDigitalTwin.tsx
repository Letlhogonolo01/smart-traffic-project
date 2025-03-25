
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, RotateCcw, ZoomIn, ZoomOut, Map } from 'lucide-react';

const ExpandedDigitalTwin = () => {
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
    camera.position.set(0, 40, 70);
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
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a5b1a, 
      side: THREE.DoubleSide 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create roads
    const createRoad = (width: number, length: number, x: number, z: number, rotation = 0) => {
      const roadGeometry = new THREE.PlaneGeometry(width, length);
      const roadMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333, 
        side: THREE.DoubleSide 
      });
      const road = new THREE.Mesh(roadGeometry, roadMaterial);
      road.rotation.x = -Math.PI / 2;
      road.rotation.z = rotation;
      road.position.set(x, 0.01, z); // Slightly above ground to avoid z-fighting
      scene.add(road);
      
      // Add road markings
      if (rotation === 0) {
        // Vertical road
        for (let i = -length/2 + 2; i < length/2; i += 5) {
          const markingGeometry = new THREE.PlaneGeometry(0.5, 2);
          const markingMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffffff, 
            side: THREE.DoubleSide 
          });
          const marking = new THREE.Mesh(markingGeometry, markingMaterial);
          marking.rotation.x = -Math.PI / 2;
          marking.position.set(x, 0.02, i);
          scene.add(marking);
        }
      } else {
        // Horizontal road
        for (let i = -length/2 + 2; i < length/2; i += 5) {
          const markingGeometry = new THREE.PlaneGeometry(2, 0.5);
          const markingMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffffff, 
            side: THREE.DoubleSide 
          });
          const marking = new THREE.Mesh(markingGeometry, markingMaterial);
          marking.rotation.x = -Math.PI / 2;
          marking.position.set(i, 0.02, z);
          scene.add(marking);
        }
      }
    };
    
    // Create road network
    createRoad(12, 200, 0, 0); // Main vertical road
    createRoad(200, 12, 0, -30, Math.PI / 2); // Main horizontal road
    createRoad(200, 12, 0, 30, Math.PI / 2); // Second horizontal road
    createRoad(12, 200, -40, 0); // Second vertical road
    createRoad(12, 200, 40, 0); // Third vertical road

    // Create buildings
    const createBuilding = (x: number, z: number, width: number, depth: number, height: number, color: number) => {
      const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
      const buildingMaterial = new THREE.MeshStandardMaterial({ color });
      const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
      building.position.set(x, height/2, z);
      building.castShadow = true;
      building.receiveShadow = true;
      scene.add(building);
    };
    
    // Add buildings around the roads
    createBuilding(-25, -15, 20, 20, 15, 0x8899aa);
    createBuilding(-60, -40, 30, 25, 20, 0x99aabb);
    createBuilding(-20, -60, 25, 30, 25, 0xaabbcc);
    createBuilding(25, -15, 20, 20, 30, 0x7788aa);
    createBuilding(60, -40, 30, 25, 15, 0x99aacc);
    createBuilding(20, -60, 25, 30, 20, 0x8899bb);
    createBuilding(-25, 15, 20, 20, 25, 0x7799aa);
    createBuilding(-60, 40, 30, 25, 15, 0x8899bb);
    createBuilding(-20, 60, 25, 30, 20, 0x99aabb);
    createBuilding(25, 15, 20, 20, 35, 0xaabbcc);
    createBuilding(60, 40, 30, 25, 20, 0x7788aa);
    createBuilding(20, 60, 25, 30, 15, 0x99aacc);

    // Create car models (simple cubes for now)
    const createCar = (x: number, z: number, color: number, rotation = 0) => {
      const carGeometry = new THREE.BoxGeometry(2, 1, 4);
      const carMaterial = new THREE.MeshStandardMaterial({ color });
      const car = new THREE.Mesh(carGeometry, carMaterial);
      car.position.set(x, 1, z);
      car.rotation.y = rotation;
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
      createCar(0, -10, 0xffff00),
      createCar(0, -20, 0xff00ff),
      createCar(-20, -30, 0x00ffff, Math.PI / 2),
      createCar(-10, -30, 0xffaa00, Math.PI / 2),
      createCar(10, -30, 0x00aaff, Math.PI / 2),
      createCar(20, -30, 0xaaff00, Math.PI / 2),
      createCar(-20, 30, 0xff00aa, Math.PI / 2),
      createCar(-10, 30, 0xaa00ff, Math.PI / 2),
      createCar(10, 30, 0x00ffaa, Math.PI / 2),
      createCar(20, 30, 0xaaff00, Math.PI / 2),
      createCar(-40, 20, 0xff5500),
      createCar(-40, 10, 0x0055ff),
      createCar(-40, -10, 0x55ff00),
      createCar(-40, -20, 0xff5555),
      createCar(40, 20, 0x55ff55),
      createCar(40, 10, 0x5555ff),
      createCar(40, -10, 0xff55ff),
      createCar(40, -20, 0x55ffff),
    ];
    carModelsRef.current = cars;

    // Add traffic lights
    const createTrafficLight = (x: number, z: number) => {
      // Pole
      const poleGeometry = new THREE.CylinderGeometry(0.3, 0.3, 7, 8);
      const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
      const pole = new THREE.Mesh(poleGeometry, poleMaterial);
      pole.position.set(x, 3.5, z);
      pole.castShadow = true;
      scene.add(pole);
      
      // Light housing
      const housingGeometry = new THREE.BoxGeometry(1, 3, 1);
      const housingMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
      const housing = new THREE.Mesh(housingGeometry, housingMaterial);
      housing.position.set(x, 7, z);
      housing.castShadow = true;
      scene.add(housing);
      
      // Lights
      const redLightGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const redLightMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 0.5 });
      const redLight = new THREE.Mesh(redLightGeometry, redLightMaterial);
      redLight.position.set(x, 8, z);
      scene.add(redLight);
      
      const yellowLightGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const yellowLightMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0x555500 });
      const yellowLight = new THREE.Mesh(yellowLightGeometry, yellowLightMaterial);
      yellowLight.position.set(x, 7, z);
      scene.add(yellowLight);
      
      const greenLightGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const greenLightMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, emissive: 0x005500 });
      const greenLight = new THREE.Mesh(greenLightGeometry, greenLightMaterial);
      greenLight.position.set(x, 6, z);
      scene.add(greenLight);
      
      return { redLight, yellowLight, greenLight };
    };
    
    // Add traffic lights at intersections
    const trafficLights = [
      createTrafficLight(6, -30),
      createTrafficLight(-6, -30),
      createTrafficLight(6, 30),
      createTrafficLight(-6, 30),
      createTrafficLight(-40, 6),
      createTrafficLight(-40, -6),
      createTrafficLight(40, 6),
      createTrafficLight(40, -6),
    ];
    
    // Animation loop with traffic light cycles
    let phase = 0;
    const phaseLength = 100;
    
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      // Traffic light cycle
      phase = (phase + 1) % (phaseLength * 2);
      const northSouthGreen = phase < phaseLength;
      
      trafficLights.forEach((light, index) => {
        // First 4 are east-west, second 4 are north-south
        const isNorthSouth = index >= 4;
        
        light.redLight.material.emissiveIntensity = 
          (isNorthSouth === northSouthGreen) ? 0.1 : 0.8;
        light.greenLight.material.emissiveIntensity = 
          (isNorthSouth === northSouthGreen) ? 0.8 : 0.1;
        
        // Yellow light flash near phase change
        const nearChange = (phase % phaseLength) > (phaseLength - 20);
        light.yellowLight.material.emissiveIntensity = 
          (isNorthSouth !== northSouthGreen && nearChange) ? 0.8 : 0.1;
      });

      // Move cars
      cars.forEach((car, i) => {
        // Vertical roads
        if (i < 5 || (i >= 13 && i < 17) || (i >= 17 && i < 21)) {
          let speed = 0.2;
          let direction = 1;
          
          // North-south roads
          if (i < 5) {
            // Main vertical road
            speed = 0.25;
          } else if (i >= 13 && i < 17) {
            // Left vertical road
            speed = 0.2;
            direction = -1; // Moving down
          } else {
            // Right vertical road
            speed = 0.15;
          }
          
          // Stop at red lights
          if (!northSouthGreen) {
            // Check if near intersection
            const nearNorthIntersection = car.position.z > 25 && car.position.z < 35;
            const nearSouthIntersection = car.position.z < -25 && car.position.z > -35;
            
            if (nearNorthIntersection || nearSouthIntersection) {
              speed = 0;
            }
          }
          
          car.position.z -= speed * direction;
          
          // Reset position when off screen
          if (direction === 1 && car.position.z < -100) {
            car.position.z = 100;
          } else if (direction === -1 && car.position.z > 100) {
            car.position.z = -100;
          }
        } else if (i >= 5 && i < 13) {
          // East-west roads
          let speed = 0.2;
          let direction = 1;
          
          if (i >= 5 && i < 9) {
            // Bottom horizontal road
            speed = 0.18;
            // First two cars move right, second two move left
            direction = i < 7 ? -1 : 1;
          } else {
            // Top horizontal road
            speed = 0.22;
            // First two cars move right, second two move left
            direction = i < 11 ? -1 : 1;
          }
          
          // Stop at red lights
          if (northSouthGreen) {
            // Check if near intersection
            const nearWestIntersection = car.position.x > -45 && car.position.x < -35;
            const nearMainIntersection = car.position.x > -5 && car.position.x < 5;
            const nearEastIntersection = car.position.x > 35 && car.position.x < 45;
            
            if (nearWestIntersection || nearMainIntersection || nearEastIntersection) {
              speed = 0;
            }
          }
          
          car.position.x += speed * direction;
          
          // Reset position when off screen
          if (direction === 1 && car.position.x > 100) {
            car.position.x = -100;
          } else if (direction === -1 && car.position.x < -100) {
            car.position.x = 100;
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
    <div className="grid grid-cols-1 gap-4">
      <div className="flex justify-between">
        <Tabs defaultValue="3d" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="3d">3D View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="congestion">Congestion</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ZoomIn className="h-4 w-4 mr-1" />
            Zoom In
          </Button>
          <Button variant="outline" size="sm">
            <ZoomOut className="h-4 w-4 mr-1" />
            Zoom Out
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset View
          </Button>
        </div>
      </div>
      
      <div 
        ref={containerRef} 
        className="w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
        style={{ height: '600px' }}
      />
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 className="text-green-800 dark:text-green-300 font-medium mb-1">Traffic Flow</h3>
          <p className="text-3xl font-bold text-green-700 dark:text-green-400">92%</p>
          <p className="text-sm text-green-600 dark:text-green-500">Optimal efficiency</p>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h3 className="text-yellow-800 dark:text-yellow-300 font-medium mb-1">Average Speed</h3>
          <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">32 mph</p>
          <p className="text-sm text-yellow-600 dark:text-yellow-500">City center area</p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="text-blue-800 dark:text-blue-300 font-medium mb-1">Vehicle Count</h3>
          <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">1,248</p>
          <p className="text-sm text-blue-600 dark:text-blue-500">Currently in system</p>
        </div>
      </div>
      
      <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg flex items-center">
        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
        <span className="text-red-700 dark:text-red-400">
          Traffic congestion detected at Main Street & 5th Avenue. Rerouting recommendations activated.
        </span>
      </div>
    </div>
  );
};

export default ExpandedDigitalTwin;
