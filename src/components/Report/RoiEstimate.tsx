'use client';

interface Props { data: string }

export default function RoiEstimate({ data }: Props) {
  return (
    <section className="rounded border-l-4 border-green-600 bg-green-50 p-6 shadow">
      <h2 className="text-xl font-semibold mb-2">ROI Estimate</h2>
      <p className="text-gray-800 leading-relaxed">{data}</p>
    </section>
  );
}
