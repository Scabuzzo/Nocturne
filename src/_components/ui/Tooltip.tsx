// src/_components/ui/Tooltip.tsx

import { useState, useEffect, ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  className?: string;
  disabled?: boolean;
}

interface TooltipData {
  x: number;
  y: number;
  position: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Reusable tooltip component with smart positioning
 */
export function Tooltip({ 
  content, 
  children, 
  position = 'auto', 
  className = '',
  disabled = false 
}: TooltipProps) {
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const calculatePosition = (rect: DOMRect, preferredPosition: string): TooltipData => {
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const tooltipWidth = 200; // Approximate width
    const tooltipHeight = 40; // Approximate height
    const spacing = 10;

    let x = 0;
    let y = 0;
    let finalPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (preferredPosition === 'auto') {
      // Smart positioning logic
      const hasSpaceTop = rect.top - tooltipHeight - spacing > 0;
      const hasSpaceBottom = rect.bottom + tooltipHeight + spacing < viewportHeight;
      const hasSpaceLeft = rect.left - tooltipWidth - spacing > 0;
      const hasSpaceRight = rect.right + tooltipWidth + spacing < viewportWidth;

      if (hasSpaceTop) {
        finalPosition = 'top';
      } else if (hasSpaceBottom) {
        finalPosition = 'bottom';
      } else if (hasSpaceRight) {
        finalPosition = 'right';
      } else if (hasSpaceLeft) {
        finalPosition = 'left';
      } else {
        finalPosition = 'top'; // Default fallback
      }
    } else {
      finalPosition = preferredPosition as 'top' | 'bottom' | 'left' | 'right';
    }

    switch (finalPosition) {
      case 'top':
        x = rect.left + scrollX + rect.width / 2;
        y = rect.top + scrollY - spacing;
        break;
      case 'bottom':
        x = rect.left + scrollX + rect.width / 2;
        y = rect.bottom + scrollY + spacing;
        break;
      case 'left':
        x = rect.left + scrollX - spacing;
        y = rect.top + scrollY + rect.height / 2;
        break;
      case 'right':
        x = rect.right + scrollX + spacing;
        y = rect.top + scrollY + rect.height / 2;
        break;
    }

    // Boundary checks
    if (finalPosition === 'top' || finalPosition === 'bottom') {
      // Horizontal centering with boundary checks
      x = Math.max(spacing, Math.min(x, viewportWidth + scrollX - tooltipWidth - spacing));
    }

    if (finalPosition === 'left' || finalPosition === 'right') {
      // Vertical centering with boundary checks
      y = Math.max(spacing, Math.min(y, viewportHeight + scrollY - tooltipHeight - spacing));
    }

    return { x, y, position: finalPosition };
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (disabled) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const data = calculatePosition(rect, position);
    setTooltipData(data);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
    // Delay hiding to prevent flicker
    setTimeout(() => {
      setTooltipData(null);
    }, 100);
  };

  // Close tooltip on scroll or resize
  useEffect(() => {
    const handleScrollOrResize = () => {
      setIsVisible(false);
      setTooltipData(null);
    };

    if (isVisible) {
      window.addEventListener('scroll', handleScrollOrResize, true);
      window.addEventListener('resize', handleScrollOrResize);
    }

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isVisible]);

  const getArrowClasses = (pos: string) => {
    const baseClasses = "absolute border-4 border-transparent";
    
    switch (pos) {
      case 'top':
        return `${baseClasses} top-full left-1/2 transform -translate-x-1/2 border-t-gray-900`;
      case 'bottom':
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900`;
      case 'left':
        return `${baseClasses} left-full top-1/2 transform -translate-y-1/2 border-l-gray-900`;
      case 'right':
        return `${baseClasses} right-full top-1/2 transform -translate-y-1/2 border-r-gray-900`;
      default:
        return baseClasses;
    }
  };

  const getTransformClasses = (pos: string) => {
    switch (pos) {
      case 'top':
        return 'translate-x-[-50%] translate-y-[-100%]';
      case 'bottom':
        return 'translate-x-[-50%]';
      case 'left':
        return 'translate-x-[-100%] translate-y-[-50%]';
      case 'right':
        return 'translate-y-[-50%]';
      default:
        return '';
    }
  };

  return (
    <>
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </span>

      {/* Tooltip Portal */}
      {tooltipData && isVisible && (
        <div 
          className={`fixed pointer-events-none z-[2147483647] transition-opacity duration-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            left: tooltipData.x, 
            top: tooltipData.y,
            transform: getTransformClasses(tooltipData.position)
          }}
        >
          <div className="bg-gray-900 text-white text-xs rounded-lg shadow-2xl border border-gray-700 px-3 py-2 max-w-xs relative whitespace-nowrap">
            {content}
            {/* Arrow */}
            <div className={getArrowClasses(tooltipData.position)}></div>
          </div>
        </div>
      )}
    </>
  );
}

// Hook for programmatic tooltip control (optional)
export function useTooltip() {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState('');

  const show = (text: string) => {
    setContent(text);
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
  };

  return { isVisible, content, show, hide };
}