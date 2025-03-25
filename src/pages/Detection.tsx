
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, RefreshCw, Camera, FileText, Settings, Play, 
  Pause, Image as ImageIcon, Film, Check, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const DetectionPage = () => {
  const [activeTab, setActiveTab] = useState('image');
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [confidence, setConfidence] = useState([75]);

  const detectionTypes = [
    { name: 'Vehicles', enabled: true },
    { name: 'Pedestrians', enabled: true },
    { name: 'Traffic Signs', enabled: true },
    { name: 'Road Markings', enabled: true },
    { name: 'Traffic Lights', enabled: true },
  ];

  // Simulated detection results
  const detectionResults = [
    { type: 'Car', confidence: 98.2, color: 'green', x: 160, y: 100, width: 120, height: 70 },
    { type: 'Car', confidence: 95.7, color: 'green', x: 380, y: 120, width: 100, height: 60 },
    { type: 'Truck', confidence: 91.3, color: 'blue', x: 490, y: 90, width: 150, height: 80 },
    { type: 'Pedestrian', confidence: 88.5, color: 'yellow', x: 280, y: 220, width: 40, height: 80 },
    { type: 'Traffic Light', confidence: 86.9, color: 'red', x: 420, y: 50, width: 30, height: 60 },
  ];

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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <main className="flex-grow py-20">
        <div className="container-custom">
          <div className="mb-8 animate-fade-in">
            <h1 className="heading-lg mb-2">Object Detection</h1>
            <p className="subtitle">
              Analyze traffic scenes to detect and classify vehicles, pedestrians, and infrastructure
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Detection Tabs */}
              <Card className="border-gray-100 dark:border-gray-800 overflow-hidden animate-fade-in">
                <CardHeader className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-6">
                  <div className="flex items-center justify-between">
                    <CardTitle>Detection Tool</CardTitle>
                    <Tabs 
                      value={activeTab}
                      onValueChange={setActiveTab}
                      defaultValue="image"
                    >
                      <TabsList className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 p-1">
                        <TabsTrigger 
                          value="image"
                          className="data-[state=active]:bg-traffic-600 data-[state=active]:text-white"
                        >
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Image
                        </TabsTrigger>
                        <TabsTrigger 
                          value="video"
                          className="data-[state=active]:bg-traffic-600 data-[state=active]:text-white"
                        >
                          <Film className="h-4 w-4 mr-2" />
                          Video
                        </TabsTrigger>
                        <TabsTrigger 
                          value="camera"
                          className="data-[state=active]:bg-traffic-600 data-[state=active]:text-white"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Live
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <Tabs value={activeTab} defaultValue="image">
                    <TabsContent value="image" className="mt-0">
                      <div className="mb-6">
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload a traffic image to analyze and detect objects like vehicles, pedestrians, and infrastructure elements.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 mb-4">
                          <Button
                            className="bg-traffic-600 hover:bg-traffic-700"
                            onClick={() => document.getElementById('image-upload')?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                          </Button>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                          
                          {currentImage && (
                            <>
                              <Button
                                variant="outline"
                                className="border-gray-200 dark:border-gray-700"
                                onClick={resetDemo}
                              >
                                Reset
                              </Button>
                              
                              <Button
                                className={cn(
                                  "ml-auto",
                                  analyzing ? "bg-gray-400 hover:bg-gray-400" : "bg-traffic-600 hover:bg-traffic-700"
                                )}
                                onClick={handleAnalyzeClick}
                                disabled={analyzing}
                              >
                                {analyzing ? (
                                  <>
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                    Analyzing...
                                  </>
                                ) : analyzed ? (
                                  <>
                                    <Check className="h-4 w-4 mr-2" />
                                    Analyzed
                                  </>
                                ) : (
                                  <>
                                    <Play className="h-4 w-4 mr-2" />
                                    Analyze
                                  </>
                                )}
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Detection preview */}
                      <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 mb-6">
                        {currentImage ? (
                          <img 
                            src={currentImage} 
                            alt="Traffic scene" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                            <div className="text-center">
                              <ImageIcon className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                              <p>Upload an image to begin detection</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Detection overlay */}
                        {analyzed && (
                          <div className="absolute inset-0 pointer-events-none">
                            {detectionResults.map((obj, index) => (
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
                                  className="text-xs text-white px-1 py-0.5 leading-tight mt-[-20px]"
                                  style={{ backgroundColor: obj.color }}
                                >
                                  {obj.type} ({obj.confidence.toFixed(1)}%)
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {analyzing && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-white text-center">
                              <RefreshCw className="h-12 w-12 mx-auto mb-3 animate-spin" />
                              <p>Analyzing image...</p>
                              <p className="text-sm text-gray-300 mt-2">Detecting objects and classifying elements</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {analyzed && (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 animate-fade-in">
                          <h3 className="font-medium mb-3">Detection Results</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {detectionResults.map((result, idx) => (
                              <div 
                                key={idx} 
                                className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-100 dark:border-gray-600"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="font-medium text-sm">{result.type}</div>
                                  <Badge 
                                    className={cn(
                                      result.confidence > 95 ? "bg-green-500" :
                                      result.confidence > 90 ? "bg-green-600" :
                                      result.confidence > 85 ? "bg-amber-500" : "bg-amber-600"
                                    )}
                                  >
                                    {result.confidence.toFixed(1)}%
                                  </Badge>
                                </div>
                                <div className="w-full h-2 bg-gray-100 dark:bg-gray-600 rounded-full overflow-hidden">
                                  <div 
                                    className={cn(
                                      "h-full rounded-full",
                                      result.confidence > 95 ? "bg-green-500" :
                                      result.confidence > 90 ? "bg-green-600" :
                                      result.confidence > 85 ? "bg-amber-500" : "bg-amber-600"
                                    )}
                                    style={{ width: `${result.confidence}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="video" className="mt-0">
                      <div className="h-80 flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 p-6">
                        <div className="text-center">
                          <Film className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                          <h3 className="text-lg font-medium mb-2">Video Analysis</h3>
                          <p className="text-muted-foreground mb-4">
                            Upload a video file to analyze traffic patterns over time
                          </p>
                          <Button className="bg-traffic-600 hover:bg-traffic-700">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Video
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="camera" className="mt-0">
                      <div className="h-80 flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 p-6">
                        <div className="text-center">
                          <Camera className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                          <h3 className="text-lg font-medium mb-2">Live Camera Feed</h3>
                          <p className="text-muted-foreground mb-4">
                            Connect to a camera feed for real-time traffic analysis
                          </p>
                          <div className="flex gap-3 justify-center">
                            <Button className="bg-traffic-600 hover:bg-traffic-700">
                              <Play className="h-4 w-4 mr-2" />
                              Start Stream
                            </Button>
                            <Button variant="outline" className="border-gray-200 dark:border-gray-700">
                              <Settings className="h-4 w-4 mr-2" />
                              Settings
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              {/* Results area */}
              {analyzed && (
                <Card className="border-gray-100 dark:border-gray-800 animate-fade-in">
                  <CardHeader>
                    <CardTitle>Analysis Summary</CardTitle>
                    <CardDescription>Detailed breakdown of detected objects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <p className="text-muted-foreground text-sm mb-1">Total Objects</p>
                          <p className="text-3xl font-bold">{detectionResults.length}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <p className="text-muted-foreground text-sm mb-1">Avg. Confidence</p>
                          <p className="text-3xl font-bold">
                            {(detectionResults.reduce((acc, obj) => acc + obj.confidence, 0) / detectionResults.length).toFixed(1)}%
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <p className="text-muted-foreground text-sm mb-1">Processing Time</p>
                          <p className="text-3xl font-bold">0.8s</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-3">Detection Categories</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { category: 'Vehicles', count: 3, color: 'bg-green-500' },
                            { category: 'Pedestrians', count: 1, color: 'bg-yellow-500' },
                            { category: 'Infrastructure', count: 1, color: 'bg-red-500' },
                            { category: 'Other', count: 0, color: 'bg-blue-500' },
                          ].map((category, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-100 dark:border-gray-600">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm">{category.category}</span>
                                <div className={`h-3 w-3 rounded-full ${category.color}`}></div>
                              </div>
                              <p className="text-2xl font-semibold">{category.count}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-6">
                        <Button variant="outline" className="border-gray-200 dark:border-gray-700">
                          <FileText className="h-4 w-4 mr-2" />
                          Export Report
                        </Button>
                        <Button className="bg-traffic-600 hover:bg-traffic-700">
                          Analyze Another Image
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Settings sidebar */}
            <div className="space-y-6">
              <Card className="border-gray-100 dark:border-gray-800 animate-fade-in">
                <CardHeader>
                  <CardTitle>Detection Settings</CardTitle>
                  <CardDescription>Configure detection parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium">Confidence Threshold</label>
                        <span className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                          {confidence}%
                        </span>
                      </div>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={confidence}
                        onValueChange={setConfidence}
                        className="mb-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        Only show detections above this confidence level
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Detection Types</h3>
                      <div className="space-y-3">
                        {detectionTypes.map((type, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-sm">{type.name}</span>
                            <Switch defaultChecked={type.enabled} />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Advanced Options</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Show bounding boxes</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Show labels</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Show confidence scores</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">High precision mode</span>
                          <Switch defaultChecked={false} />
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Apply Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-gray-100 dark:border-gray-800 animate-fade-in">
                <CardHeader>
                  <CardTitle>Detection History</CardTitle>
                  <CardDescription>Recent analyses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'traffic-scene-1.jpg', time: '2 mins ago', objects: 12 },
                      { name: 'intersection-busy.jpg', time: '15 mins ago', objects: 24 },
                      { name: 'highway-morning.jpg', time: '1 hour ago', objects: 18 },
                      { name: 'downtown-evening.jpg', time: '3 hours ago', objects: 36 },
                    ].map((item, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-700 mr-3 flex items-center justify-center">
                            <ImageIcon className="h-4 w-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.time}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{item.objects} obj</Badge>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    View All History
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DetectionPage;
