export default function RiskTable({
  data,
}: {
  data: { risk: string; mitigation: string }[];
}) {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-3">Risk & Mitigation</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="font-semibold">
            <th className="p-2">Risk</th>
            <th className="p-2">Mitigation</th>
          </tr>
        </thead>
        <tbody>
          {data.map(r => (
            <tr key={r.risk} className="border-t">
              <td className="p-2 align-top">{r.risk}</td>
              <td className="p-2">{r.mitigation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
