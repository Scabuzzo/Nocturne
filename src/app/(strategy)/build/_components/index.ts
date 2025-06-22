// src/app/(strategy)/build/_components/index.ts

/**
 * Barrel exports for strategy builder components
 */

// New streamlined components
export { StreamlinedHeader } from './StreamlinedHeader';
export { IndicatorLibrary } from './IndicatorLibrary';
export { IndicatorWorkspace } from './IndicatorWorkspace';

// Existing components (still in use)
export { BuilderTabs } from './BuilderTabs';
export type { BuilderTabsProps } from './BuilderTabs';

export { RiskManagementPanel } from './RiskManagementPanel';
export type { RiskManagementPanelProps } from './RiskManagementPanel';

export { ParameterSidebar } from './ParameterSidebar';
export type { ParameterSidebarProps } from './ParameterSidebar';

// Old components removed:
// - StrategyBuilder (replaced by IndicatorLibrary + IndicatorWorkspace)
// - IndicatorCard (replaced by inline cards in IndicatorWorkspace)  
// - StrategyHeader (replaced by StreamlinedHeader)