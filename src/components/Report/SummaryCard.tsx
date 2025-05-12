export default function SummaryCard({ name, business }:{name:string;business:string}) {
  return (
    <div className="card">
      <h1 className="text-xl font-semibold">Executive Summary</h1>
      <p>{`Hi ${name || "team"}, here’s a quick snapshot of where ${business || "your company"} can gain efficiency.`}</p>
    </div>
  );
}
