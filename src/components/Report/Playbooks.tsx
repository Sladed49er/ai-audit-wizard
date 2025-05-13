/* ---------------------------------------------
   Dumps playbooks JSON
   --------------------------------------------- */
export default function Playbooks({ data }: { data: unknown }) {
  if (data == null) return null;

  return (
    <article className="card prose">
      <h3 className="font-semibold mb-2">Playbooks</h3>
      <pre className="whitespace-pre-wrap text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </article>
  );
}
