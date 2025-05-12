export default function RoiEstimate({ pain }:{pain:any[]}) {
  const hoursSaved = pain.length * 2; // crude estimate
  const rate = 65;
  const annual = hoursSaved * rate * 52;
  return (
    <div className="card">
      <h2 className="font-semibold">Estimated ROI</h2>
      <p>Potential annual savings: <strong>${annual.toLocaleString()}</strong></p>
    </div>
  );
}
