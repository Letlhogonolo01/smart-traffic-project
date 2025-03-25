
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ExpandedViewProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

const ExpandedView = ({ title, children, onClose }: ExpandedViewProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ExpandedView;
