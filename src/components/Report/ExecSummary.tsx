'use client';

interface Props {
  data: string;
}

export default function ExecSummary({ data }: Props) {
  return (
    <section className="rounded border p-6 shadow">
      <h2 className="text-xl font-semibold mb-2">Executive Summary</h2>
      <p className="text-gray-700 leading-relaxed">{data}</p>
    </section>
  );
}
