type History = {
    strategyName: string;
};

export function HistoryCard({ history }: { history: History }) {
    return (
        <div className="bg-gray-900">
            <h2>
                {history.strategyName}
            </h2>

        </div>
    )
}