import  { HistoryCard } from "./_components/HistoryCard"

const strategyHistory = [
    { strategyName: "MA Crossover"}
]

export default function HistoryPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 ml-2">Strategy History</h1>
            <div className="">
                {strategyHistory.map((s) => (
                    <HistoryCard key={s.strategyName} history={s} />
                ))}
            </div>
        </div>
    )
}