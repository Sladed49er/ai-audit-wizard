/* ---------------------------------------------
   Shows the one-paragraph executive summary
   --------------------------------------------- */
export default function ExecSummary({ data }: { data: string }) {
  if (!data) return null;

  return (
    <article className="card prose">
      <h3 className="font-semibold mb-2">Executive Summary</h3>
      <p>{data}</p>
    </article>
  );
}
