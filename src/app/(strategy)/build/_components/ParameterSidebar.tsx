type SidebarProps = {
  indicator: {
    id: string;
    type: string;
    params: Record<string, any>;
  };
  onChange: (id: string, newParams: Record<string, any>) => void;
};

export function ParameterSidebar({ indicator, onChange }: SidebarProps) {
  const handleChange = (key: string, value: string | number) => {
    onChange(indicator.id, { ...indicator.params, [key]: value });
  };

  return (
    <div className="w-80 bg-gray-900 border-l border-gray-700 p-4">
      <h2 className="text-xl font-bold mb-4">Edit {indicator.type}</h2>
      {Object.entries(indicator.params).map(([key, val]) => (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium mb-1">{key}</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
            value={val}
            onChange={(e) => handleChange(key, Number(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
}
