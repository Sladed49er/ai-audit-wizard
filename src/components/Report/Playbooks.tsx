export default function Playbooks({
  data,
}: {
  data: {
    title: string;
    trigger: string;
    flow: string;
    owner: string;
    kpi: string;
    sample: string;
  }[];
}) {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-3">Automation Playbooks</h2>
      {data.map(pb => (
        <details key={pb.title} className="mb-3">
          <summary className="cursor-pointer font-medium">{pb.title}</summary>
          <div className="mt-2 text-sm text-gray-700">
            <p><strong>Trigger:</strong> {pb.trigger}</p>
            <p><strong>Flow:</strong> {pb.flow}</p>
            <p><strong>Owner:</strong> {pb.owner}</p>
            <p><strong>KPI:</strong> {pb.kpi}</p>
            <pre className="bg-gray-100 p-2 rounded">{pb.sample}</pre>
          </div>
        </details>
      ))}
    </div>
  );
}
