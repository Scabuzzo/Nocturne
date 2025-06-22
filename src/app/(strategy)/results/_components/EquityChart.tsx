// src/app/(strategy)/results/_components/EquityChart.tsx

import type { EquityPoint } from '@/_lib/types/results';

interface EquityChartProps {
  data: EquityPoint[];
  initialCapital: number;
  title: string;
}

/**
 * Simple SVG-based equity chart showing portfolio performance over time
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
  const areaPath = `M ${scaleX(data[0].timestamp)} ${scaleY(initialCapital)} L ${equityPath.substring(2)} L ${scaleX(data[data.length - 1].timestamp)} ${scaleY(initialCapital)} Z`;
  
  // Calculate final return
  const finalEquity = data[data.length - 1].equity;
  const totalReturn = ((finalEquity - initialCapital) / initialCapital) * 100;
  const isPositive = totalReturn >= 0;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400">
            Initial: ${initialCapital.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">
            Final: ${finalEquity.toLocaleString()}
          </div>
          <div className={`text-lg font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{totalReturn.toFixed(2)}%
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
        <svg width={width} height={height} className="w-full h-auto">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
            
            {/* Gradient for area fill */}
            <linearGradient id="equityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0.3"/>
              <stop offset="100%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          
          <rect width={width} height={height} fill="url(#grid)"/>
          
          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map(ratio => {
            const value = paddedMin + (paddedRange * ratio);
            const y = height - padding - (ratio * (height - 2 * padding));
            return (
              <g key={ratio}>
                <line x1={padding - 5} y1={y} x2={padding} y2={y} stroke="#6B7280" strokeWidth="1"/>
                <text x={padding - 10} y={y + 4} textAnchor="end" className="fill-gray-400 text-xs">
                  ${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </text>
              </g>
            );
          })}
          
          {/* Breakeven line */}
          <line 
            x1={padding} 
            y1={breakevenY} 
            x2={width - padding} 
            y2={breakevenY} 
            stroke="#6B7280" 
            strokeWidth="2" 
            strokeDasharray="5,5"
            opacity="0.7"
          />
          <text x={width - padding - 5} y={breakevenY - 5} textAnchor="end" className="fill-gray-400 text-xs">
            Breakeven
          </text>
          
          {/* Area under curve */}
          <path 
            d={areaPath} 
            fill="url(#equityGradient)" 
          />
          
          {/* Main equity line */}
          <path 
            d={equityPath} 
            fill="none" 
            stroke={isPositive ? "#10B981" : "#EF4444"} 
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {data.map((point, index) => (
            <circle 
              key={index}
              cx={scaleX(point.timestamp)} 
              cy={scaleY(point.equity)} 
              r="4" 
              fill={isPositive ? "#10B981" : "#EF4444"}
              className="hover:r-6 transition-all cursor-pointer"
            >
              <title>
                {new Date(point.timestamp).toLocaleDateString()} - ${point.equity.toLocaleString()}
              </title>
            </circle>
          ))}
          
          {/* X-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map(ratio => {
            const time = startTime + (timeRange * ratio);
            const x = padding + (ratio * (width - 2 * padding));
            const date = new Date(time);
            return (
              <g key={ratio}>
                <line x1={x} y1={height - padding} x2={x} y2={height - padding + 5} stroke="#6B7280" strokeWidth="1"/>
                <text x={x} y={height - padding + 20} textAnchor="middle" className="fill-gray-400 text-xs">
                  {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </text>
              </g>
            );
          })}
        </svg>
        
        {/* Chart legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isPositive ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <span className="text-gray-300">Portfolio Value</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-gray-400 opacity-70" style={{ backgroundImage: 'repeating-linear-gradient(to right, #6B7280 0, #6B7280 5px, transparent 5px, transparent 10px)' }}></div>
            <span className="text-gray-300">Breakeven</span>
          </div>
        </div>
      </div>
    </div>
  );
}