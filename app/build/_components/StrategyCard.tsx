'use client';

type Strategy = {
  name: string;
  level: string;
  description: string;
};

export function StrategyCard({ strategy }: { strategy: Strategy }) {
  return (
    <div className="bg-gray-900 p-5 rounded-xl hover:bg-gray-800 transition cursor-pointer border border-gray-700">
      <h2 className="text-xl font-semibold mb-1">{strategy.name}</h2>
      <p className="text-sm text-gray-400 mb-2">{strategy.description}</p>
      <span className="text-xs bg-blue-700 text-white py-1 px-2 rounded-full">
        {strategy.level}
      </span>
    </div>
  );
}
