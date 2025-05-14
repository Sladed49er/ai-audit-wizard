'use client';

type Roi =
  | string
  | { shortTerm?: string; longTerm?: string; [k: string]: string | undefined };

interface Props { data: Roi }

export default function RoiEstimate({ data }: Props) {
  /* -------- string version (original behaviour) ---------- */
  if (typeof data === 'string') {
    return (
      <section className="rounded border-l-4 border-green-600 bg-green-50 p-6 shadow">
        <h2 className="text-xl font-semibold mb-2">ROI Estimate</h2>
        <p className="text-gray-800 leading-relaxed">{data}</p>
      </section>
    );
  }

  /* -------- object version (short- & long-term rows) ----- */
  const entries = Object.entries(data);

  if (entries.length === 0) return null; // nothing to show

  return (
    <section className="rounded border-l-4 border-green-600 bg-green-50 p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">ROI Estimate</h2>

      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-green-100">
          <tr>
            <th className="px-4 py-2 border text-left">Horizon</th>
            <th className="px-4 py-2 border text-left">Benefit</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([k, v], i) => (
            <tr key={k} className={i % 2 ? 'bg-green-50/50' : ''}>
              <td className="px-4 py-2 border font-medium capitalize">
                {k.replace(/([A-Z])/g, ' $1')}
              </td>
              <td className="px-4 py-2 border">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
