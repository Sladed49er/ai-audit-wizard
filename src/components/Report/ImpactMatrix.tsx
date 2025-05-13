export default function ImpactMatrix({
  data,
}: {
  data: { item: string; effort: number; impact: number }[];
}) {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-3">Impact Matrix</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="font-semibold">
            <th className="p-2">Item</th>
            <th className="p-2">Effort</th>
            <th className="p-2">Impact</th>
          </tr>
        </thead>
        <tbody>
          {data.map(r => (
            <tr key={r.item} className="border-t">
              <td className="p-2">{r.item}</td>
              <td className="p-2 text-center">{r.effort}</td>
              <td className="p-2 text-center">{r.impact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
