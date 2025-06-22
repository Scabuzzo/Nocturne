type IndicatorCardProps = {
  indicator: {
    id: string;
    type: string;
    params: Record<string, any>;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
};

export function StrategyIndicatorCard({
  indicator,
  isSelected,
  onSelect,
  onRemove,
}: IndicatorCardProps) {
  return (
    <div
      className={`p-4 rounded-lg border ${
        isSelected ? 'border-blue-400' : 'border-gray-700'
      } bg-gray-900 cursor-pointer hover:bg-gray-800`}
      onClick={() => onSelect(indicator.id)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{indicator.type}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(indicator.id);
          }}
          className="text-red-500 hover:text-red-400"
        >
          ✕
        </button>
      </div>
      <p className="text-sm text-gray-400">
        Params: {Object.entries(indicator.params).map(([k, v]) => `${k}: ${v}`).join(', ')}
      </p>
    </div>
  );
}
