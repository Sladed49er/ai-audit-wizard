'use client';

interface Props { data: string[] }

export default function QuickWins({ data }: Props) {
  return (
    <section className="rounded border p-6 shadow">
      <h2 className="text-xl font-semibold mb-2">Quick Wins (90 days)</h2>
      <ul className="list-disc pl-6 space-y-1">
        {data.map(item => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}
