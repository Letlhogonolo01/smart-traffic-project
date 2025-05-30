
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import EnhancedAnalytics from './dashboard/EnhancedAnalytics';

const Dashboard = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container-custom">
        <div className="absolute -z-10 top-0 left-0 w-full h-full">
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-traffic-200/30 rounded-full blur-3xl dark:bg-traffic-900/20"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 max-w-2xl">
            <h2 className="heading-lg mb-6 animate-fade-in">
              Powerful Analytics Dashboard for Traffic Data
            </h2>
            <p className="subtitle text-lg mb-8 animate-fade-in">
              Make informed decisions with comprehensive traffic analytics, real-time monitoring, and predictive insights.
            </p>
            
            <div className="space-y-6 mb-8">
              {[
                {
                  title: "Real-time Monitoring",
                  description: "Track traffic conditions, congestion levels, and incidents as they happen across your city."
                },
                {
                  title: "Interactive Visualizations",
                  description: "Explore traffic patterns through intuitive charts, heatmaps, and customizable reports."
                },
                {
                  title: "Predictive Analytics",
                  description: "Anticipate traffic congestion and plan preventive measures with AI-driven forecasts."
                },
                {
                  title: "360° Digital Twin View",
                  description: "Interact with a fully rotatable 3D model of your city's traffic infrastructure."
                }
              ].map((feature, i) => (
                <div 
                  key={i}
                  className={cn(
                    "flex animate-fade-in"
                  )}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="mr-4 h-10 w-10 rounded-full bg-traffic-100 dark:bg-traffic-900/30 flex items-center justify-center">
                    <div className="h-5 w-5 rounded-full bg-traffic-600"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/dashboard">
              <Button 
                className="animate-fade-in bg-traffic-600 hover:bg-traffic-700"
                size="lg"
              >
                Explore Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="flex-1">
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg bg-card p-6 overflow-hidden animate-fade-in">
              <h3 className="text-xl font-bold mb-4">Live Traffic Insights</h3>
              <div className="h-64">
                <EnhancedAnalytics analyticsType="traffic" height="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
