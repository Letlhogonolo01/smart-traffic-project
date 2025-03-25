
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Shield, Map } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container-custom">
        <div className="relative">
          {/* Background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-traffic-200/30 rounded-full blur-3xl dark:bg-traffic-900/20"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-traffic-200/30 rounded-full blur-3xl dark:bg-traffic-900/20"></div>
          </div>

          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-traffic-200 bg-traffic-50/50 text-traffic-800 text-sm font-medium mb-5 dark:border-traffic-900/50 dark:bg-traffic-900/20 dark:text-traffic-300 animate-fade-in">
              <span className="flex h-2 w-2 mr-2">
                <span className="animate-ping absolute h-2 w-2 rounded-full bg-traffic-400 opacity-75"></span>
                <span className="relative rounded-full h-2 w-2 bg-traffic-500"></span>
              </span>
              Advanced Traffic Management Technology
            </div>
            
            <h1 className="heading-xl mb-6 animate-fade-in">
              <span className="text-gray-900 dark:text-white">Smart Traffic Management</span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-traffic-600 to-blue-600">Powered by AI</span>
            </h1>
            
            <p className="text-lg subtitle mb-8 max-w-2xl animate-fade-in">
              Leveraging advanced object detection technology to create safer roads, reduce congestion, and build sustainable smart cities through high-quality annotated datasets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto sm:justify-center animate-fade-in">
              <Button 
                className="bg-traffic-600 hover:bg-traffic-700 text-white font-medium h-12 px-8"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="border-traffic-200 dark:border-gray-800 h-12 px-8"
              >
                View Dashboard
              </Button>
            </div>
          </div>

          {/* Stats and features overview */}
          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="h-5 w-5 text-traffic-600" />,
                title: "Real-time Analytics",
                description: "Monitor traffic patterns and congestion points with advanced analytics"
              },
              {
                icon: <Shield className="h-5 w-5 text-traffic-600" />,
                title: "Enhanced Safety",
                description: "Identify potential hazards and dangerous situations to improve road safety"
              },
              {
                icon: <Map className="h-5 w-5 text-traffic-600" />,
                title: "Urban Planning",
                description: "Generate insights for better urban planning and infrastructure development"
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className={cn(
                  "glass-card p-6 rounded-xl transition-all",
                  "animate-fade-up"
                )}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-traffic-50 dark:bg-traffic-900/30">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
