export default function UnusedIntegrations({
  data,
}: {
  data: { app: string; suggestion: string }[];
}) {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-3">Unused Integrations</h2>
      <ul className="space-y-1">
        {data.map(row => (
          <li key={row.app}>
            <strong>{row.app}</strong> — {row.suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}
