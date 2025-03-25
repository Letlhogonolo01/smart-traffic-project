
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, RefreshCw, Zap, Check, Car, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const ObjectDetection = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  
  // Updated detection results focused on vehicles and pedestrians
  const detectionObjects = [
    { type: 'Car', confidence: 98.2, color: 'green', x: 30, y: 25, width: 120, height: 70 },
    { type: 'SUV', confidence: 95.7, color: 'green', x: 240, y: 35, width: 100, height: 60 },
    { type: 'Truck', confidence: 91.3, color: 'green', x: 400, y: 30, width: 150, height: 80 },
    { type: 'Pedestrian', confidence: 88.5, color: 'blue', x: 180, y: 120, width: 40, height: 80 },
    { type: 'Pedestrian', confidence: 86.9, color: 'blue', x: 320, y: 120, width: 40, height: 80 },
  ];

  // Vehicle and pedestrian statistics
  const vehicleCount = detectionObjects.filter(obj => 
    ['Car', 'SUV', 'Truck', 'Bus', 'Motorcycle'].includes(obj.type)).length;
  
  const pedestrianCount = detectionObjects.filter(obj => 
    obj.type === 'Pedestrian').length;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCurrentImage(event.target?.result as string);
        setAnalyzed(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeClick = () => {
    if (!currentImage) return;
    
    setAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 2500);
  };

  const resetDemo = () => {
    setCurrentImage(null);
    setAnalyzed(false);
  };

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="heading-lg mb-4 animate-fade-in">
            Vehicle & Pedestrian Detection
          </h2>
          <p className="subtitle text-lg animate-fade-in">
            Upload a traffic image to detect vehicles and pedestrians in real-time
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left side - Upload and controls */}
              <div className="flex-1">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Traffic Scene Analysis</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload a traffic scene to detect vehicles and pedestrians for traffic flow analysis.
                  </p>
                  
                  {!currentImage ? (
                    <div 
                      className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-traffic-400 dark:hover:border-traffic-500 transition-colors"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <Upload className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop or click to upload
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Supports JPG, PNG, WEBP (Max 5MB)
                      </p>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <Button
                        onClick={handleAnalyzeClick}
                        disabled={analyzing}
                        className={cn(
                          "w-full bg-traffic-600 hover:bg-traffic-700",
                          analyzing && "opacity-80"
                        )}
                      >
                        {analyzing ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> 
                            Analyzing Traffic Scene...
                          </>
                        ) : analyzed ? (
                          <>
                            <Check className="h-4 w-4 mr-2" /> 
                            Analysis Complete
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" /> 
                            Analyze Image
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        onClick={resetDemo}
                        className="w-full"
                      >
                        Try Different Image
                      </Button>
                    </div>
                  )}
                </div>

                {analyzed && (
                  <div className="animate-fade-in">
                    <h4 className="font-medium mb-4">Detection Summary</h4>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 flex items-center">
                        <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-800/30 flex items-center justify-center mr-3">
                          <Car className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-green-800 dark:text-green-300">Vehicles</p>
                          <p className="text-2xl font-bold text-green-700 dark:text-green-400">{vehicleCount}</p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-800/30 flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-blue-800 dark:text-blue-300">Pedestrians</p>
                          <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{pedestrianCount}</p>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-2">Detailed Results</h4>
                    <div className="space-y-2">
                      {detectionObjects.map((obj, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: obj.color }}
                            ></div>
                            <span>{obj.type}</span>
                          </div>
                          <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                            {obj.confidence.toFixed(1)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right side - Image preview with detection */}
              <div className="flex-1">
                <div 
                  className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 relative flex items-center justify-center"
                >
                  {currentImage ? (
                    <>
                      <img 
                        src={currentImage} 
                        alt="Uploaded traffic scene" 
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Detection overlay */}
                      {analyzed && (
                        <div className="absolute inset-0 pointer-events-none">
                          {detectionObjects.map((obj, index) => (
                            <div 
                              key={index}
                              className="absolute border-2 flex items-start justify-between"
                              style={{
                                borderColor: obj.color,
                                left: `${obj.x}px`,
                                top: `${obj.y}px`,
                                width: `${obj.width}px`,
                                height: `${obj.height}px`
                              }}
                            >
                              <div 
                                className="text-[10px] text-white px-1 leading-tight mt-[-18px]"
                                style={{ backgroundColor: obj.color }}
                              >
                                {obj.type}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center p-8">
                      <p className="text-muted-foreground text-sm">
                        Image preview will appear here
                      </p>
                    </div>
                  )}

                  {analyzing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <RefreshCw className="h-8 w-8 mx-auto mb-2 animate-spin" />
                        <p className="text-sm">Processing image...</p>
                      </div>
                    </div>
                  )}
                </div>

                {analyzed && (
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      {detectionObjects.length} objects detected with high confidence
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ObjectDetection;
