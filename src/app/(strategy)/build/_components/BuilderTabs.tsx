// src/app/(strategy)/build/_components/BuilderTabs.tsx

export interface BuilderTabsProps {
  /**
   * Currently active tab
   */
  activeTab: 'entry' | 'risk';
  
  /**
   * Callback when tab changes
   */
  onTabChange: (tab: 'entry' | 'risk') => void;
  
  /**
   * Number of entry conditions (for badge)
   */
  entryCount: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Clean, compact tab navigation for the strategy builder
 */
export function BuilderTabs({
  activeTab,
  onTabChange,
  entryCount,
  className = '',
}: BuilderTabsProps) {
  const tabs = [
    {
      id: 'entry' as const,
      label: 'Entry',
      count: entryCount,
      icon: '📈',
    },
    {
      id: 'risk' as const,
      label: 'Risk',
      count: undefined,
      icon: '🛡️',
    },
  ];

  const handleTabClick = (tabId: 'entry' | 'risk') => {
    onTabChange(tabId);
  };

  const getTabClasses = (tabId: 'entry' | 'risk') => {
    const isActive = activeTab === tabId;
    
    return `
      relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950
      ${isActive 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-gray-600/40 hover:border-gray-500/60'
      }
    `;
  };

  return (
    <div className={`flex gap-1.5 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={getTabClasses(tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
          title={tab.id === 'entry' ? 'Entry Conditions' : 'Risk Management'}
        >
          <span className="text-sm" role="img" aria-hidden="true">
            {tab.icon}
          </span>
          
          <span className="font-medium">
            {tab.label}
          </span>
          
          {tab.count !== undefined && (
            <span className={`
              inline-flex items-center justify-center min-w-[1rem] h-4 px-1 rounded-full text-xs font-bold
              ${activeTab === tab.id 
                ? 'bg-white/25 text-white' 
                : 'bg-gray-700/80 text-gray-300'
              }
            `}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}