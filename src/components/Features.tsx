
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Car, Cpu, Database, MapPin, Activity,
  AlertTriangle, BarChart2, TrendingUp
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Car className="h-5 w-5" />,
      title: "Vehicle Detection",
      description: "Identify and classify various vehicle types in real-time traffic flows."
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
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
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
      </div>
    </section>
  );
};

export default Features;
