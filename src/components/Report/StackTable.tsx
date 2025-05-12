export default function StackTable({ stack }:{stack:any[]}) {
  return (
    <div className="card overflow-x-auto">
      <h2 className="font-semibold">Current tech stack</h2>
      <table className="min-w-full text-sm">
        <thead><tr><th>Name</th><th># Integrations</th><th>Verified</th></tr></thead>
        <tbody>
          {stack.map(row => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.integrationCount}</td>
              <td>{row.verified ? "✓" : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
