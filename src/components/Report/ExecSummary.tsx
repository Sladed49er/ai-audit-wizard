export default function ExecSummary({ data }: { data: string }) {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-3">Executive Summary</h2>
      <p className="whitespace-pre-line text-gray-700">{data}</p>
    </div>
  );
}
