export default function RolloutTimeline({
  data,
}: {
  data: { day: number; task: string; owner: string }[];
}) {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-3">Roll‑out Timeline</h2>
      <ul className="space-y-1">
        {data.map(r => (
          <li key={r.day}>
            <strong>Day {r.day}:</strong> {r.task} &nbsp;
            <span className="text-xs text-gray-500">(owner: {r.owner})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
