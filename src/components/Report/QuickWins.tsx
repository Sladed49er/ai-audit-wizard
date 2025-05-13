/* -----------------------------------------------------------------
   src/components/Report/QuickWins.tsx
   Shows 3–5 quick-win recommendations
   ----------------------------------------------------------------- */

import type { EnrichedStackRow } from '@/lib/reportHelpers';

interface QuickWinProps {
  stack: EnrichedStackRow[];
  pain: {
    pain: string;
    suggestion: string;
  }[];
}

export default function QuickWins({ stack, pain }: QuickWinProps) {
  /* ─ trivial sample logic – replace with your real algo ─ */
  const wins = [
    ...(pain.slice(0, 2).map(p => ({
      title: `Fix: ${p.pain}`,
      desc: p.suggestion,
    }))),
    ...(stack
      .filter(s => s.integrationCount === 0)
      .slice(0, 1)
      .map(s => ({
        title: `Integrate ${s.name}`,
        desc: `Connect ${s.name} with CRM to remove manual re-keying.`,
      }))),
  ];

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Quick Wins (next 30 days)</h2>

      <ul className="space-y-3">
        {wins.map(win => (
          <li key={win.title}>
            <h3 className="font-medium">{win.title}</h3>
            <p className="text-sm text-gray-600">{win.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
