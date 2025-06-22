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
 * Tab navigation for the strategy builder
 * Only Entry Conditions and Risk Management
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
      label: 'Entry Conditions',
      description: 'Define when to enter trades',
      count: entryCount,
      icon: '📈',
    },
    {
      id: 'risk' as const,
      label: 'Risk Management',
      description: 'Configure stop loss, take profit, and position sizing',
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
          className={getTabClasses(tab.id)}
          title={tab.description}
          role="tab"
          aria-selected={activeTab === tab.id}
        >
          <span className="text-lg" role="img" aria-hidden="true">
            {tab.icon}
          </span>
          
          <span className="font-medium">
            {tab.label}
          </span>
          
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
          
          {activeTab === tab.id && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}