
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-traffic-600 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="font-semibold text-lg">STMS</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              Smart Traffic Management System using advanced object detection to create safer, more efficient urban mobility.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4 text-muted-foreground uppercase tracking-wider">Platform</h3>
            <ul className="space-y-3">
              {['Dashboard', 'Object Detection', 'Analytics', 'Reports', 'Integrations'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-sm text-foreground hover:text-traffic-600 dark:hover:text-traffic-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4 text-muted-foreground uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3">
              {['Documentation', 'API Reference', 'Case Studies', 'Knowledge Base', 'Tutorials'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-sm text-foreground hover:text-traffic-600 dark:hover:text-traffic-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4 text-muted-foreground uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Blog', 'Contact', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-sm text-foreground hover:text-traffic-600 dark:hover:text-traffic-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Smart Traffic Management System. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              {['Terms', 'Privacy', 'Cookies'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
