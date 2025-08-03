import React from 'react';
import { motion } from 'framer-motion';

const FinancialProjectionChart: React.FC = () => {
  const years = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];
  const costs = [0, 2500, 5200, 8100, 11500, 15200, 19800]; // Red line (upper)
  const savings = [0, 800, 1400, 2200, 3000, 3900, 4800]; // Green line (lower)
  
  const maxValue = Math.max(...costs, ...savings);
  const width = 600;
  const height = 240;
  const padding = { top: 20, right: 40, bottom: 40, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  const getCostsPoints = () => {
    return costs.map((value, index) => {
      const x = (index / (savings.length - 1)) * chartWidth;
      const y = chartHeight - ((value / maxValue) * chartHeight);
      return `${x},${y}`;
    }).join(' ');
  };

  const getSavingsPoints = () => {
    return savings.map((value, index) => {
      const x = (index / (costs.length - 1)) * chartWidth;
      const y = chartHeight - ((value / maxValue) * chartHeight);
      return `${x},${y}`;
    }).join(' ');
  };

  const costsPoints = getCostsPoints();
  const savingsPoints = getSavingsPoints();

  // Grid lines
  const gridLines = [];
  for (let i = 0; i <= 5; i++) {
    const y = (i / 5) * chartHeight;
    const value = maxValue - (i / 5) * maxValue;
    gridLines.push({ y, value: Math.round(value) });
  }

  return (
    <div className="w-full h-full">
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-400">Costs</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-400">Savings</span>
          </div>
        </div>
        
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>

          <g transform={`translate(${padding.left}, ${padding.top})`}>
            {/* Grid lines */}
            {gridLines.map((line, index) => (
              <g key={index}>
                <line
                  x1="0"
                  y1={line.y}
                  x2={chartWidth}
                  y2={line.y}
                  stroke="rgba(55, 65, 81, 0.3)"
                  strokeWidth="1"
                />
                <text
                  x="-15"
                  y={line.y + 4}
                  textAnchor="end"
                  className="text-xs fill-gray-400"
                >
                  ${(line.value / 1000).toFixed(0)}k
                </text>
              </g>
            ))}

            {/* Costs line (red, upper) */}
            <motion.polyline
              points={costsPoints}
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Savings line (green, lower) */}
            <motion.polyline
              points={savingsPoints}
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
            />

            {/* Data points for costs */}
            {costs.map((value, index) => (
              <motion.circle
                key={`costs-${index}`}
                cx={(index / (costs.length - 1)) * chartWidth}
                cy={chartHeight - ((value / maxValue) * chartHeight)}
                r="4"
                fill="#EF4444"
                stroke="#1F2937"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                className="hover:r-5 transition-all cursor-pointer"
              />
            ))}

            {/* Data points for savings */}
            {savings.map((value, index) => (
              <motion.circle
                key={`savings-${index}`}
                cx={(index / (savings.length - 1)) * chartWidth}
                cy={chartHeight - ((value / maxValue) * chartHeight)}
                r="3"
                fill="#10B981"
                stroke="#1F2937"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.8, duration: 0.3 }}
                className="hover:r-4 transition-all cursor-pointer"
              />
            ))}

            {/* Year labels */}
            {years.map((year, index) => (
              <text
                key={index}
                x={(index / (years.length - 1)) * chartWidth}
                y={chartHeight + 25}
                textAnchor="middle"
                className="text-xs fill-gray-400"
              >
                {year}
              </text>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default FinancialProjectionChart;