import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoRowProps {
  icon: LucideIcon;
  title: string;
  detail: string;
  subDetail?: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon: Icon, title, detail, subDetail }) => {
  return (
    <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
      <div className="flex-shrink-0 mt-1">
        <div className="p-2 bg-royal-800/10 rounded-full">
          <Icon className="w-5 h-5 text-royal-800" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</h3>
        <p className="text-lg font-medium text-gray-900 font-serif">{detail}</p>
        {subDetail && <p className="text-sm text-gray-600">{subDetail}</p>}
      </div>
    </div>
  );
};

export default InfoRow;