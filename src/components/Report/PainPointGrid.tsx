export default function PainPointGrid({ analysis }:{analysis:any[]}) {
  return (
    <div className="card">
      <h2 className="font-semibold">Pain-point analysis</h2>
      <ul className="space-y-2">
        {analysis.map(a => (
          <li key={a.pain}>
            <strong>{a.pain}:</strong> {a.suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}
