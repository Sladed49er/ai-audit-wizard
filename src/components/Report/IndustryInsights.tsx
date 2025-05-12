export default function IndustryInsights({ industry }:{industry:string}) {
  return (
    <div className="card">
      <h2 className="font-semibold">Industry context</h2>
      <p>{industry} peers are adopting AI-driven automation at a rapid clip.</p>
    </div>
  );
}
