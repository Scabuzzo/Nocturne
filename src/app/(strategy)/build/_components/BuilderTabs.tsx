// src/app/(strategy)/build/_components/BuilderTabs.tsx

export interface BuilderTabsProps {
  /**
   * Currently active tab
   */
  activeTab: 'entry' | 'exit' | 'risk';
  
  /**
   * Callback when tab changes
   */
  onTabChange: (tab: 'entry' | 'exit' | 'risk') => void;
  
  /**
   * Number of entry conditions (for badge)
   */
  entryCount: number;
  
  /**
   * Number of exit conditions (for badge)
   */
  exitCount: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Tab navigation for the strategy builder
 * 
 * Features:
 * - Entry/Exit/Risk tabs
 * - Count badges for conditions
 * - Keyboard navigation support
 */
export function BuilderTabs({
  activeTab,
  onTabChange,
  entryCount,
  exitCount,
  className = '',
}: BuilderTabsProps) {
  /**
   * Tab configuration
   */
  const tabs = [
    {
      id: 'entry' as const,
      label: 'Entry Conditions',
      description: 'Define when to enter trades',
      count: entryCount,
      icon: '📈',
    },
    {
      id: 'exit' as const,
      label: 'Exit Conditions',
      description: 'Define when to exit trades',
      count: exitCount,
      icon: '📉',
    },
    {
      id: 'risk' as const,
      label: 'Risk Management',
      description: 'Configure stop loss and position sizing',
      count: undefined,
      icon: '🛡️',
    },
  ];

  /**
   * Handle tab click
   */
  const handleTabClick = (tabId: typeof activeTab) => {
    onTabChange(tabId);
  };

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = (e: React.KeyboardEvent, tabId: typeof activeTab) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTabClick(tabId);
    }
  };

  /**
   * Get tab styling
   */
  const getTabClasses = (tabId: typeof activeTab) => {
    const isActive = activeTab === tabId;
    
    return `
      relative inline-flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950
      ${isActive 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
      }
    `;
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          onKeyDown={(e) => handleKeyDown(e, tab.id)}
          className={getTabClasses(tab.id)}
          title={tab.description}
          role="tab"
          aria-selected={activeTab === tab.id}
          tabIndex={0}
        >
          {/* Icon */}
          <span className="text-lg" role="img" aria-hidden="true">
            {tab.icon}
          </span>
          
          {/* Label */}
          <span className="font-medium">
            {tab.label}
          </span>
          
          {/* Count Badge */}
          {tab.count !== undefined && (
            <span className={`
              inline-flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-full text-xs font-bold
              ${activeTab === tab.id 
                ? 'bg-white/20 text-white' 
                : 'bg-gray-700 text-gray-300'
              }
            `}>
              {tab.count}
            </span>
          )}
          
          {/* Active indicator */}
          {activeTab === tab.id && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}