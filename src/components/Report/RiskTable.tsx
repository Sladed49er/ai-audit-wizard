/* -----------------------------------------------------------------
   RiskTable.tsx  – tolerant version (never crashes)
   ----------------------------------------------------------------- */
export default function RiskTable({ data }: { data: unknown }) {
  if (!Array.isArray(data)) return null;

  return (
    <article className="card prose">
      <h3 className="font-semibold mb-2">Risks & Mitigations</h3>
      <pre className="whitespace-pre-wrap text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </article>
  );
}
