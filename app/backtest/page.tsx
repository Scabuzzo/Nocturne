import { StrategyCard } from './_components/StrategyCard';

const strategies = [
  { name: 'MA Crossover', level: 'Beginner', description: '50/200 SMA signal' },
  { name: 'Breakout', level: 'Intermediate', description: 'High/low breakout logic' },
  { name: 'Momentum', level: 'Advanced', description: 'RSI + MACD combo' },
];

export default function BacktestPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Select a Strategy</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {strategies.map((s) => (
          <StrategyCard key={s.name} strategy={s} />
        ))}
      </div>
    </div>
  );
}
