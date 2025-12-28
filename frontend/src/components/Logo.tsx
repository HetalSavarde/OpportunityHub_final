import React from 'react';

interface OpportunityHubProps {
  className?: string;
  showtext?: boolean;
}

const OpportunityHub = (props: OpportunityHubProps) => {
  const { className = "" } = props;

  return (
  <div className={`flex items-center ${className}`}>
      <div className="flex items-center gap-6">
        {/* Lightbulb Icon Container */}
       <div className="relative flex flex-col items-center translate-x-2">
          {/* Sparkles Left */}
         <div className="absolute -left-2 top-0 flex flex-col gap-2">
            <div className="w-1.5 h-1.5 bg-[#7c3aed]" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
            <div className="w-2 h-2 bg-[#6d28d9] ml-1" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
          </div>

          {/* Sparkles Right */}
          <div className="absolute -right-2 top-0 flex flex-col gap-2">
            <div className="w-2 h-2 bg-[#14b8a6]" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
            <div className="w-1.5 h-1.5 bg-[#0d9488] ml-1" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
          </div>

          {/* Main Bulb SVG */}
        <svg
  className="h-9 w-auto"
  viewBox="0 0 120 160"
  preserveAspectRatio="xMidYMid meet"
  xmlns="http://www.w3.org/2000/svg"
>

            <defs>
              <linearGradient id="bulbGradientSide" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="50%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
            
            {/* Bulb Glass */}
            <path 
              d="M60 10C35 10 15 30 15 55C15 75 25 85 35 95C40 100 40 110 40 115H80C80 110 80 100 85 95C95 85 105 75 105 55C105 30 85 10 60 10Z" 
              stroke="url(#bulbGradientSide)" 
              strokeWidth="10" 
              strokeLinecap="round"
              fill="none"
            />
            
            {/* Star inside bulb */}
            <path 
              d="M60 35L66 48H80L69 57L73 71L60 62L47 71L51 57L40 48H54L60 35Z" 
              fill="url(#bulbGradientSide)"
            />

            {/* Bulb Base */}
            <rect x="40" y="125" width="40" height="10" rx="5" fill="url(#bulbGradientSide)" />
            <rect x="40" y="140" width="40" height="14" rx="7" fill="url(#bulbGradientSide)" />
          </svg>
          
          {/* Shadow under bulb */}
          <div className="w-8 h-1.5 bg-gray-200 rounded-[100%] blur-[2px] mx-auto mt-1"></div>
        </div>

        {/* Text Logo Beside */}
        <h1 className="text-[1.7rem] font-semibold tracking-tight">
          <span className="text-[#312e81]">Opportunity</span>
          <span className="bg-gradient-to-r from-[#312e81] to-[#14b8a6] bg-clip-text text-transparent">Hub</span>
        </h1>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap');
        h1 {
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.02em;
        }
      `}</style>
    </div>
  );
};

export default OpportunityHub;