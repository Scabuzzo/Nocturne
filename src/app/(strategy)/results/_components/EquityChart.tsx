// src/app/(strategy)/results/_components/EquityChart.tsx

import type { EquityPoint } from '@/_lib/types/results';

interface EquityChartProps {
  data: EquityPoint[];
  initialCapital: number;
  title: string;
}

/**
 * SICK futuristic SVG equity chart with neon glows and animations 🔥
 */
export function EquityChart({ data, initialCapital, title }: EquityChartProps) {
  if (data.length === 0) return null;

  const width = 800;
  const height = 400;
  const padding = 60;
  
  // Calculate min/max values for scaling
  const minEquity = Math.min(...data.map(d => d.equity), initialCapital);
  const maxEquity = Math.max(...data.map(d => d.equity), initialCapital);
  const equityRange = maxEquity - minEquity;
  
  // Add 10% padding to the range
  const paddedMin = minEquity - (equityRange * 0.1);
  const paddedMax = maxEquity + (equityRange * 0.1);
  const paddedRange = paddedMax - paddedMin;
  
  // Time range
  const startTime = new Date(data[0].timestamp).getTime();
  const endTime = new Date(data[data.length - 1].timestamp).getTime();
  const timeRange = endTime - startTime;
  
  // Scale functions
  const scaleX = (timestamp: string) => {
    const time = new Date(timestamp).getTime();
    return padding + ((time - startTime) / timeRange) * (width - 2 * padding);
  };
  
  const scaleY = (equity: number) => {
    return height - padding - ((equity - paddedMin) / paddedRange) * (height - 2 * padding);
  };
  
  // Generate path for equity line
  const equityPath = data.map((point, index) => {
    const x = scaleX(point.timestamp);
    const y = scaleY(point.equity);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  
  // Breakeven line
  const breakevenY = scaleY(initialCapital);
  
  // Generate gradient area under curve
  const areaPath = `M ${scaleX(data[0].timestamp)} ${height - padding} L ${equityPath.substring(2)} L ${scaleX(data[data.length - 1].timestamp)} ${height - padding} Z`;
  
  // Calculate final return
  const finalEquity = data[data.length - 1].equity;
  const totalReturn = ((finalEquity - initialCapital) / initialCapital) * 100;
  const isPositive = totalReturn >= 0;

  // Generate grid lines
  const gridLines = [];
  const yGridCount = 5;
  const xGridCount = 6;
  
  // Horizontal grid lines
  for (let i = 0; i <= yGridCount; i++) {
    const y = padding + (i * (height - 2 * padding)) / yGridCount;
    const value = paddedMax - (i * paddedRange) / yGridCount;
    gridLines.push(
      <g key={`h-grid-${i}`}>
        <line
          x1={padding}
          y1={y}
          x2={width - padding}
          y2={y}
          stroke="rgb(55, 65, 81)"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <text
          x={padding - 10}
          y={y + 4}
          textAnchor="end"
          className="text-xs fill-gray-400"
        >
          ${value.toFixed(0)}
        </text>
      </g>
    );
  }
  
  // Vertical grid lines
  for (let i = 0; i <= xGridCount; i++) {
    const x = padding + (i * (width - 2 * padding)) / xGridCount;
    const timestamp = new Date(startTime + (i * timeRange) / xGridCount);
    gridLines.push(
      <g key={`v-grid-${i}`}>
        <line
          x1={x}
          y1={padding}
          x2={x}
          y2={height - padding}
          stroke="rgb(55, 65, 81)"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <text
          x={x}
          y={height - padding + 20}
          textAnchor="middle"
          className="text-xs fill-gray-400"
        >
          {timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </text>
      </g>
    );
  }
  
  return (
    <div className="relative w-full">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* Gradient Definitions - THE SICK PART 🔥 */}
        <defs>
          {/* Equity line gradient */}
          <linearGradient id="equityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="1">
              <animate attributeName="stop-color" values="#06b6d4;#3b82f6;#8b5cf6;#06b6d4" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1">
              <animate attributeName="stop-color" values="#3b82f6;#8b5cf6;#06b6d4;#3b82f6" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1">
              <animate attributeName="stop-color" values="#8b5cf6;#06b6d4;#3b82f6;#8b5cf6" dur="3s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          
          {/* Area fill gradient */}
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0.3" />
            <stop offset="100%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0.05" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Pulsing glow filter */}
          <filter id="pulseGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur">
              <animate attributeName="stdDeviation" values="2;4;2" dur="2s" repeatCount="indefinite" />
            </feGaussianBlur>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background with subtle pattern */}
        <rect width={width} height={height} fill="url(#backgroundPattern)" opacity="0.05" />
        
        {/* Grid lines */}
        {gridLines}
        
        {/* Chart border with glow */}
        <rect
          x={padding}
          y={padding}
          width={width - 2 * padding}
          height={height - 2 * padding}
          fill="none"
          stroke="rgb(75, 85, 99)"
          strokeWidth="1"
          filter="url(#glow)"
          opacity="0.5"
        />
        
        {/* Area under curve with animated gradient */}
        <path
          d={areaPath}
          fill="url(#areaGradient)"
          opacity="0.6"
        >
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" repeatCount="indefinite" />
        </path>
        
        {/* Breakeven line with pulse effect */}
        <line
          x1={padding}
          y1={breakevenY}
          x2={width - padding}
          y2={breakevenY}
          stroke="#64748b"
          strokeWidth="2"
          strokeDasharray="5,5"
          filter="url(#pulseGlow)"
          opacity="0.7"
        />
        
        {/* Main equity line with SICK animated gradient stroke */}
        <path
          d={equityPath}
          fill="none"
          stroke="url(#equityGradient)"
          strokeWidth="3"
          filter="url(#glow)"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animate attributeName="stroke-width" values="3;4;3" dur="2s" repeatCount="indefinite" />
        </path>
        
        {/* Data points with animated halos */}
        {data.filter((_, i) => i % Math.ceil(data.length / 20) === 0).map((point, index) => {
          const x = scaleX(point.timestamp);
          const y = scaleY(point.equity);
          const pointIsPositive = point.equity >= initialCapital;
          
          return (
            <g key={`point-${index}`}>
              {/* Animated halo */}
              <circle
                cx={x}
                cy={y}
                r="8"
                fill={pointIsPositive ? "#10b981" : "#ef4444"}
                opacity="0.3"
              >
                <animate attributeName="r" values="4;12;4" dur="3s" repeatCount="indefinite" begin={`${index * 0.1}s`} />
                <animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite" begin={`${index * 0.1}s`} />
              </circle>
              
              {/* Main point */}
              <circle
                cx={x}
                cy={y}
                r="4"
                fill={pointIsPositive ? "#10b981" : "#ef4444"}
                stroke="#ffffff"
                strokeWidth="2"
                filter="url(#glow)"
              >
                <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin={`${index * 0.15}s`} />
              </circle>
            </g>
          );
        })}
        
        {/* Labels */}
        <text x={padding} y={30} className="text-sm fill-gray-300 font-medium">
          Portfolio Value ($)
        </text>
        <text x={width - padding} y={height - 10} textAnchor="end" className="text-sm fill-gray-300 font-medium">
          Time
        </text>
        
        {/* Performance indicator */}
        <g transform={`translate(${width - 150}, 50)`}>
          <rect
            x="0"
            y="0"
            width="120"
            height="40"
            rx="8"
            fill={isPositive ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}
            stroke={isPositive ? "#10b981" : "#ef4444"}
            strokeWidth="1"
            filter="url(#glow)"
          />
          <text
            x="60"
            y="15"
            textAnchor="middle"
            className="text-xs fill-gray-300"
          >
            Total Return
          </text>
          <text
            x="60"
            y="30"
            textAnchor="middle"
            className={`text-sm font-bold ${isPositive ? 'fill-green-400' : 'fill-red-400'}`}
          >
            {isPositive ? '+' : ''}{totalReturn.toFixed(2)}%
          </text>
        </g>
      </svg>
      
      {/* Floating stats overlay */}
      <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-lg p-3">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300">Equity Curve</span>
          </div>
          <div className="text-gray-400">|</div>
          <div className="text-gray-300">
            <span className="text-gray-400">Initial:</span> ${initialCapital.toLocaleString()}
          </div>
          <div className="text-gray-300">
            <span className="text-gray-400">Final:</span> ${finalEquity.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}