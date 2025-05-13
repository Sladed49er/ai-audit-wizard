'use client';

interface Timeline { [phase: string]: string }
interface Props { data: Timeline }

export default function RolloutTimeline({ data }: Props) {
  return (
    <section className="rounded border p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Roll-out Timeline</h2>

      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 border text-left">Phase</th>
            <th className="px-4 py-2 border text-left">Duration</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([phase, range], i) => (
            <tr key={phase} className={i % 2 ? 'bg-gray-50/50' : ''}>
              <td className="px-4 py-2 border font-medium">{phase}</td>
              <td className="px-4 py-2 border">{range}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
