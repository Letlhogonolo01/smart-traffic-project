
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, RotateCcw, ZoomIn, ZoomOut, Navigation, RotateCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ExpandedDigitalTwin = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const carModelsRef = useRef<THREE.Mesh[]>([]);
  const frameIdRef = useRef<number>(0);
  const [activeView, setActiveView] = useState<string>('3d');
  const congestionOverlayRef = useRef<THREE.Group | null>(null);
  const trafficLightsRef = useRef<any[]>([]);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const autoRotateAngleRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 40, 70);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a5b1a, 
      side: THREE.DoubleSide 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const createRoad = (width: number, length: number, x: number, z: number, rotation = 0) => {
      const roadGeometry = new THREE.PlaneGeometry(width, length);
      const roadMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333, 
        side: THREE.DoubleSide 
      });
      const road = new THREE.Mesh(roadGeometry, roadMaterial);
      road.rotation.x = -Math.PI / 2;
      road.rotation.z = rotation;
      road.position.set(x, 0.01, z);
      scene.add(road);
      
      if (rotation === 0) {
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
    
    createRoad(12, 200, 0, 0);
    createRoad(200, 12, 0, -30, Math.PI / 2);
    createRoad(200, 12, 0, 30, Math.PI / 2);
    createRoad(12, 200, -40, 0);
    createRoad(12, 200, 40, 0);

    const createBuilding = (x: number, z: number, width: number, depth: number, height: number, color: number) => {
      const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
      const buildingMaterial = new THREE.MeshStandardMaterial({ color });
      const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
      building.position.set(x, height/2, z);
      building.castShadow = true;
      building.receiveShadow = true;
      scene.add(building);
    };
    
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

    const createTrafficLight = (x: number, z: number) => {
      const poleGeometry = new THREE.CylinderGeometry(0.3, 0.3, 7, 8);
      const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
      const pole = new THREE.Mesh(poleGeometry, poleMaterial);
      pole.position.set(x, 3.5, z);
      pole.castShadow = true;
      scene.add(pole);
      
      const housingGeometry = new THREE.BoxGeometry(1, 3, 1);
      const housingMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
      const housing = new THREE.Mesh(housingGeometry, housingMaterial);
      housing.position.set(x, 7, z);
      housing.castShadow = true;
      scene.add(housing);
      
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

    trafficLightsRef.current = trafficLights;

    const congestionGroup = new THREE.Group();
    congestionGroup.visible = false;
    scene.add(congestionGroup);
    congestionOverlayRef.current = congestionGroup;

    const createCongestionHeatmap = () => {
      const congestionPoints = [
        { x: 0, z: -30, intensity: 0.9 },
        { x: 0, z: -15, intensity: 0.7 },
        { x: 20, z: -30, intensity: 0.6 },
        { x: -20, z: -30, intensity: 0.8 },
        { x: 0, z: -45, intensity: 0.5 },
        { x: 0, z: 30, intensity: 0.4 },
        { x: 40, z: 0, intensity: 0.75 },
        { x: -40, z: -15, intensity: 0.65 }
      ];
      
      congestionPoints.forEach(point => {
        const color = new THREE.Color();
        color.setHSL((1 - point.intensity) * 0.3, 1, 0.5);
        
        const radius = point.intensity * 12 + 5;
        const segments = 32;
        const heatmapGeometry = new THREE.CircleGeometry(radius, segments);
        const heatmapMaterial = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.6,
          side: THREE.DoubleSide
        });
        
        const heatmap = new THREE.Mesh(heatmapGeometry, heatmapMaterial);
        heatmap.rotation.x = -Math.PI / 2;
        heatmap.position.set(point.x, 0.1, point.z);
        congestionGroup.add(heatmap);
        
        if (point.intensity > 0.7) {
          const pulsingGeometry = new THREE.CircleGeometry(radius * 1.2, segments);
          const pulsingMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
          });
          
          const pulsingCircle = new THREE.Mesh(pulsingGeometry, pulsingMaterial);
          pulsingCircle.rotation.x = -Math.PI / 2;
          pulsingCircle.position.set(point.x, 0.15, point.z);
          pulsingCircle.userData = { 
            initialScale: 1.0,
            pulseFactor: 0.2,
            pulseSpeed: 1.5 + Math.random() * 0.5
          };
          congestionGroup.add(pulsingCircle);
          
          if (!congestionGroup.userData.pulsingElements) {
            congestionGroup.userData.pulsingElements = [];
          }
          congestionGroup.userData.pulsingElements.push(pulsingCircle);
        }
      });

      const createReroutePath = (startX: number, startZ: number, endX: number, endZ: number) => {
        const curvePoints = [];
        
        for (let t = 0; t <= 1; t += 0.05) {
          const controlX = (startX + endX) / 2 + 15;
          const controlZ = (startZ + endZ) / 2 - 10;
          
          const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
          const z = (1 - t) * (1 - t) * startZ + 2 * (1 - t) * t * controlZ + t * t * endZ;
          
          curvePoints.push(new THREE.Vector3(x, 0.2, z));
        }
        
        const curve = new THREE.CatmullRomCurve3(curvePoints);
        const points = curve.getPoints(50);
        const routeGeometry = new THREE.BufferGeometry().setFromPoints(points);
        
        const routeMaterial = new THREE.LineBasicMaterial({ 
          color: 0x22cc22, 
          linewidth: 3,
          linecap: 'round',
          linejoin: 'round'
        });
        
        const routeLine = new THREE.Line(routeGeometry, routeMaterial);
        congestionGroup.add(routeLine);
        
        const arrowGeometry = new THREE.ConeGeometry(1, 3, 8);
        const arrowMaterial = new THREE.MeshBasicMaterial({ color: 0x22cc22 });
        const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
        
        const lastPoint = points[points.length - 1];
        const secondLastPoint = points[points.length - 2];
        arrow.position.set(lastPoint.x, 0.5, lastPoint.z);
        
        const direction = new THREE.Vector3().subVectors(
          lastPoint, 
          secondLastPoint
        ).normalize();
        
        const angle = Math.atan2(direction.x, direction.z);
        arrow.rotation.y = -angle;
        arrow.rotation.x = Math.PI / 2;
        
        congestionGroup.add(arrow);
      };
      
      createReroutePath(0, -30, 40, 0);
      createReroutePath(-40, -15, 0, 30);
    };
    
    createCongestionHeatmap();

    let phase = 0;
    const phaseLength = 100;
    
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      phase = (phase + 1) % (phaseLength * 2);
      const northSouthGreen = phase < phaseLength;
      
      trafficLights.forEach((light, index) => {
        const isNorthSouth = index >= 4;
        
        light.redLight.material.emissiveIntensity = 
          (isNorthSouth === northSouthGreen) ? 0.1 : 0.8;
        light.greenLight.material.emissiveIntensity = 
          (isNorthSouth === northSouthGreen) ? 0.8 : 0.1;
        
        if (phase % phaseLength > (phaseLength - 20)) {
          light.yellowLight.material.emissiveIntensity = 
            (isNorthSouth !== northSouthGreen) ? 0.8 : 0.1;
        }
      });

      // Auto-rotate camera if enabled
      if (isAutoRotating && cameraRef.current) {
        autoRotateAngleRef.current += 0.008;
        const radius = 70;
        const height = 40;
        cameraRef.current.position.x = Math.cos(autoRotateAngleRef.current) * radius;
        cameraRef.current.position.z = Math.sin(autoRotateAngleRef.current) * radius;
        cameraRef.current.position.y = height;
        cameraRef.current.lookAt(0, 0, 0);
      }

      cars.forEach((car, i) => {
        if (i < 5 || (i >= 13 && i < 17) || (i >= 17 && i < 21)) {
          let speed = 0.2;
          let direction = 1;
          
          if (i < 5) {
            speed = 0.25;
          } else if (i >= 13 && i < 17) {
            speed = 0.2;
            direction = -1;
          } else {
            speed = 0.15;
          }
          
          if (!northSouthGreen) {
            const nearNorthIntersection = car.position.z > 25 && car.position.z < 35;
            const nearSouthIntersection = car.position.z < -25 && car.position.z > -35;
            
            if (nearNorthIntersection || nearSouthIntersection) {
              speed = 0;
            }
          }
          
          car.position.z -= speed * direction;
          
          if (direction === 1 && car.position.z < -100) {
            car.position.z = 100;
          } else if (direction === -1 && car.position.z > 100) {
            car.position.z = -100;
          }
        } else if (i >= 5 && i < 13) {
          let speed = 0.2;
          let direction = 1;
          
          if (i >= 5 && i < 9) {
            speed = 0.18;
            direction = i < 7 ? -1 : 1;
          } else {
            speed = 0.22;
            direction = i < 11 ? -1 : 1;
          }
          
          if (northSouthGreen) {
            const nearWestIntersection = car.position.x > -45 && car.position.x < -35;
            const nearMainIntersection = car.position.x > -5 && car.position.x < 5;
            const nearEastIntersection = car.position.x > 35 && car.position.x < 45;
            
            if (nearWestIntersection || nearMainIntersection || nearEastIntersection) {
              speed = 0;
            }
          }
          
          car.position.x += speed * direction;
          
          if (direction === 1 && car.position.x > 100) {
            car.position.x = -100;
          } else if (direction === -1 && car.position.x < -100) {
            car.position.x = 100;
          }
        }
      });

      if (congestionOverlayRef.current?.visible && 
          congestionOverlayRef.current.userData.pulsingElements) {
        
        const pulsingElements = congestionOverlayRef.current.userData.pulsingElements;
        const now = Date.now() / 1000;
        
        pulsingElements.forEach((element: THREE.Mesh) => {
          const { initialScale, pulseFactor, pulseSpeed } = element.userData;
          const scale = initialScale + Math.sin(now * pulseSpeed) * pulseFactor;
          element.scale.set(scale, scale, scale);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

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
  }, [isAutoRotating]);

  useEffect(() => {
    if (congestionOverlayRef.current) {
      congestionOverlayRef.current.visible = activeView === 'congestion';
    }
  }, [activeView]);

  const handleZoomIn = () => {
    if (cameraRef.current && !isAutoRotating) {
      const currentPosition = cameraRef.current.position.clone();
      const direction = new THREE.Vector3(0, 0, 0).sub(currentPosition).normalize();
      const newPosition = currentPosition.add(direction.multiplyScalar(10));
      
      cameraRef.current.position.copy(newPosition);
      cameraRef.current.lookAt(0, 0, 0);
    }
  };

  const handleZoomOut = () => {
    if (cameraRef.current && !isAutoRotating) {
      const currentPosition = cameraRef.current.position.clone();
      const direction = currentPosition.clone().normalize();
      const newPosition = currentPosition.add(direction.multiplyScalar(10));
      
      cameraRef.current.position.copy(newPosition);
      cameraRef.current.lookAt(0, 0, 0);
    }
  };

  const handleResetView = () => {
    if (cameraRef.current && sceneRef.current) {
      cameraRef.current.position.set(0, 40, 70);
      cameraRef.current.lookAt(0, 0, 0);
      sceneRef.current.rotation.y = 0;
      setIsAutoRotating(false);
      autoRotateAngleRef.current = 0;
    }
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating(prev => !prev);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex justify-between">
        <Tabs defaultValue="3d" value={activeView} onValueChange={setActiveView} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="3d">3D View</TabsTrigger>
            <TabsTrigger value="congestion">Congestion</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={isAutoRotating}>
            <ZoomIn className="h-4 w-4 mr-1" />
            Zoom In
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={isAutoRotating}>
            <ZoomOut className="h-4 w-4 mr-1" />
            Zoom Out
          </Button>
          <Button 
            variant={isAutoRotating ? "default" : "outline"} 
            size="sm" 
            onClick={toggleAutoRotate}
            className={isAutoRotating ? "bg-blue-600 text-white hover:bg-blue-700" : ""}
          >
            <RotateCw className="h-4 w-4 mr-1" />
            {isAutoRotating ? "Stop Auto-Rotate" : "Auto-Rotate"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleResetView}>
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
      
      {activeView === 'congestion' && (
        <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg flex items-center">
          <Navigation className="h-5 w-5 text-amber-500 mr-2" />
          <span className="text-amber-700 dark:text-amber-400">
            Alternative routes are highlighted in green. These routes can save up to 12 minutes during peak congestion periods.
          </span>
        </div>
      )}
      
      {activeView === '3d' && (
        <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-red-700 dark:text-red-400">
            Traffic congestion detected at Main Street & 5th Avenue. Rerouting recommendations activated.
          </span>
        </div>
      )}
    </div>
  );
};

export default ExpandedDigitalTwin;
