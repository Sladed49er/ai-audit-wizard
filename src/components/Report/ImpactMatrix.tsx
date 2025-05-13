/* ---------------------------------------------
   Dumps impact-matrix JSON (high / medium / low)
   --------------------------------------------- */
export default function ImpactMatrix({ data }: { data: unknown }) {
  if (data == null) return null;

  return (
    <article className="card prose">
      <h3 className="font-semibold mb-2">Impact Matrix</h3>
      <pre className="whitespace-pre-wrap text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </article>
  );
}
