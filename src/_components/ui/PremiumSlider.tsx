// src/_components/ui/PremiumSlider.tsx

interface PremiumSliderProps {
  /**
   * Current value
   */
  value: number;
  
  /**
   * Minimum value
   */
  min: number;
  
  /**
   * Maximum value
   */
  max: number;
  
  /**
   * Step size
   */
  step?: number;
  
  /**
   * Label for the slider
   */
  label: string;
  
  /**
   * Optional unit to display (e.g., '%', 'days')
   */
  unit?: string;
  
  /**
   * Change handler
   */
  onChange: (value: number) => void;
  
  /**
   * Whether the slider is disabled
   */
  disabled?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Premium slider component with smooth animations and visual feedback
 */
export function PremiumSlider({
  value,
  min,
  max,
  step = 1,
  label,
  unit = '',
  onChange,
  disabled = false,
  className = '',
}: PremiumSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Label and Value Input */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={value || ''} // Handle undefined/null values
            onChange={(e) => {
              const newValue = Number(e.target.value);
              if (!isNaN(newValue) && newValue >= min && newValue <= max) {
                onChange(newValue);
              }
            }}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className="w-20 text-center text-sm font-semibold text-white bg-gray-800 px-2 py-1 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {unit && (
            <span className="text-sm text-gray-400">{unit}</span>
          )}
        </div>
      </div>

      {/* Slider Track */}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="slider-input w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, #374151 ${percentage}%, #374151 100%)`,
          }}
        />
        
        {/* Custom thumb styling with CSS */}
        <style jsx>{`
          .slider-input::-webkit-slider-thumb {
            appearance: none;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #3B82F6;
            border: 3px solid #1E40AF;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;
          }
          
          .slider-input::-webkit-slider-thumb:hover {
            background: #2563EB;
            transform: scale(1.15);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
          }
          
          .slider-input::-webkit-slider-thumb:active {
            transform: scale(1.05);
          }
          
          .slider-input::-moz-range-thumb {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #3B82F6;
            border: 3px solid #1E40AF;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
            transition: all 0.2s ease;
          }
          
          .slider-input::-moz-range-thumb:hover {
            background: #2563EB;
            transform: scale(1.15);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
          }
          
          .slider-input:disabled::-webkit-slider-thumb {
            background: #6B7280;
            border-color: #4B5563;
            cursor: not-allowed;
          }
          
          .slider-input:disabled::-moz-range-thumb {
            background: #6B7280;
            border-color: #4B5563;
            cursor: not-allowed;
          }
        `}</style>
      </div>

      {/* Range indicators */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}