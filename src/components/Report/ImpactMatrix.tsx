'use client';

interface Matrix {
  [dimension: string]: Record<string, 'High' | 'Medium' | 'Low'>;
}
interface Props { data: Matrix }

const colour: Record<'High'|'Medium'|'Low', string> = {
  High:   'bg-green-500 text-white',
  Medium: 'bg-yellow-400',
  Low:    'bg-gray-300',
};

export default function ImpactMatrix({ data }: Props) {
  const headings = Object.keys(data);
  const keys     = Object.keys(data[headings[0]]);

  return (
    <section className="rounded border p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Impact Matrix</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border"></th>
              {keys.map(k => (
                <th key={k} className="px-4 py-2 border text-left">{k}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {headings.map(row => (
              <tr key={row}>
                <td className="px-4 py-2 border font-medium">{row}</td>
                {keys.map(col => {
                  const lvl = data[row][col];
                  return (
                    <td key={col} className={`px-4 py-2 border ${colour[lvl]}`}>
                      {lvl}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
