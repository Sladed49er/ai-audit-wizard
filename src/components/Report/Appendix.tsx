'use client';

interface Props {
  data: {
    softwareRecommendations: string[];
  };
}

export default function Appendix({ data }: Props) {
  return (
    <section className="rounded border p-6 shadow">
      <h2 className="text-xl font-semibold mb-2">Appendix</h2>
      <h3 className="font-medium">Software Recommendations</h3>
      <ul className="list-disc pl-6 space-y-1">
        {data.softwareRecommendations.map(item => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}
