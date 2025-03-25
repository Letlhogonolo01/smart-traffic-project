
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Car, Cpu, Database, Camera, MapPin, Activity,
  AlertTriangle, BarChart2, TrendingUp, Search
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Car className="h-5 w-5" />,
      title: "Vehicle Detection",
      description: "Identify and classify various vehicle types in real-time traffic flows."
    },
    {
      icon: <Camera className="h-5 w-5" />,
      title: "High-Quality Dataset",
      description: "Meticulously annotated traffic data for training accurate ML models."
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      title: "AI-Powered Analytics",
      description: "Advanced algorithms that process visual data and extract actionable insights."
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      title: "Incident Detection",
      description: "Quickly identify accidents, stalled vehicles, and other road hazards."
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Congestion Mapping",
      description: "Visualize traffic hotspots and congestion patterns across urban areas."
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: "Data Integration",
      description: "Seamlessly combine traffic data with other urban infrastructure systems."
    },
    {
      icon: <BarChart2 className="h-5 w-5" />,
      title: "Predictive Analysis",
      description: "Forecast traffic conditions based on historical patterns and real-time data."
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Performance Metrics",
      description: "Measure and track key traffic management performance indicators."
    },
    {
      icon: <Activity className="h-5 w-5" />,
      title: "Traffic Flow Optimization",
      description: "Adjust signals and routing to improve overall traffic flow efficiency."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-lg mb-4 animate-fade-in">
            Comprehensive Traffic Management Features
          </h2>
          <p className="subtitle text-lg animate-fade-in">
            Our system combines cutting-edge object detection with powerful analytics to transform urban mobility
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i}
              className={cn(
                "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700",
                "transition-all hover:shadow-md hover:border-traffic-200 dark:hover:border-traffic-900",
                "animate-fade-up"
              )}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className="mr-4 flex-shrink-0 w-10 h-10 rounded-lg bg-traffic-50 dark:bg-traffic-900/30 flex items-center justify-center text-traffic-600 dark:text-traffic-400">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 md:mt-24 relative glass-card rounded-2xl p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-traffic-200/30 rounded-full blur-3xl dark:bg-traffic-900/20"></div>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center relative z-10">
            <div className="flex-1">
              <h3 className="heading-md mb-4 animate-fade-in">
                Advanced Traffic Data Collection for Smarter Cities
              </h3>
              <p className="subtitle mb-6 animate-fade-in">
                Our dataset captures the complexity of urban traffic with precision, enabling AI models to accurately recognize vehicles, pedestrians, and infrastructure elements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <Search className="mr-2 h-5 w-5 text-traffic-600" />
                  <span className="text-sm font-medium">99.7% Detection Accuracy</span>
                </div>
                <div className="flex items-center">
                  <Database className="mr-2 h-5 w-5 text-traffic-600" />
                  <span className="text-sm font-medium">Millions of Annotated Frames</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center animate-fade-in">
              <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <p className="text-sm">Object detection preview</p>
                </div>
                <img 
                  src="/object-detection.jpg"
                  alt="Traffic object detection"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Overlay elements to simulate detection */}
                <div className="absolute inset-0">
                  <div className="absolute top-[30%] left-[20%] w-20 h-10 border-2 border-green-500 rounded-sm flex items-center justify-center">
                    <span className="text-[10px] bg-green-500 text-white px-1 rounded">Car: 98%</span>
                  </div>
                  <div className="absolute top-[35%] right-[30%] w-16 h-8 border-2 border-blue-500 rounded-sm flex items-center justify-center">
                    <span className="text-[10px] bg-blue-500 text-white px-1 rounded">Bike: 97%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
