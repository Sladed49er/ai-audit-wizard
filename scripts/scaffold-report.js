/* ------------------------------------------------------------------
   One-time generator for the expanded Report screen
   ------------------------------------------------------------------ */
import { promises as fs } from 'fs';
import path from 'path';

const ROOT = process.cwd();

/* ---------- helper ------------------------------------------------ */
const writeIfMissing = async (rel, content) => {
  const full = path.join(ROOT, rel);
  await fs.mkdir(path.dirname(full), { recursive: true });
  try {
    await fs.access(full);   // file exists
    console.log('skip   ', rel);
  } catch {
    await fs.writeFile(full, content.trimStart() + '\n');
    console.log('create ', rel);
  }
};

/* ---------- boilerplate files ------------------------------------ */
const FILES = {
  /* helper */
  'src/lib/reportHelpers.ts': `
import integrations from '@/data/integration-data-updated.json';

export function enrichStack(software: string[]) {
  return software.map(name => {
    const meta: any = (integrations as any)[name] ?? {};
    return {
      name,
      integrationCount: meta.integrates_with?.length ?? 0,
      mainFunctions:    meta.main_functions ?? [],
      verified:         !!meta.verified,
    };
  });
}

export function mapPainPoints(selected: string[]) {
  const suggestions: Record<string,string> = {
    "Manual onboarding processes": "Use Typeform + Zapier to auto-create CRM records",
    "Inconsistent client follow-up": "CRM tasks triggered by email opens",
  };
  return selected.map(p => ({ pain: p, suggestion: suggestions[p] ?? "See appendix" }));
}
`,

  /* parent */
  'src/components/Report/index.tsx': `
import { useAuditState } from '@/context/AuditContext';
import { enrichStack, mapPainPoints } from '@/lib/reportHelpers';

import SummaryCard       from './SummaryCard';
import IndustryInsights  from './IndustryInsights';
import StackTable        from './StackTable';
import PainPointGrid     from './PainPointGrid';
import QuickWins         from './QuickWins';
import Roadmap           from './Roadmap';
import RoiEstimate       from './RoiEstimate';
import Appendix          from './Appendix';

export default function Report() {
  const [state] = useAuditState();
  const { name, business } = state.userInfo;
  const { industry, software, painPoints } = state.selectors;

  const stack      = enrichStack(software);
  const painMatrix = mapPainPoints(painPoints);

  return (
    <section className="space-y-10 pb-20">
      <SummaryCard name={name} business={business} />
      <IndustryInsights industry={industry} />
      <StackTable stack={stack} />
      <PainPointGrid analysis={painMatrix} />
      <QuickWins stack={stack} pain={painMatrix} />
      <Roadmap />
      <RoiEstimate pain={painMatrix} />
      <Appendix stack={stack} />
    </section>
  );
}
`,

  /* stubs for each section */
  'src/components/Report/SummaryCard.tsx': `
export default function SummaryCard({ name, business }:{name:string;business:string}) {
  return (
    <div className="card">
      <h1 className="text-xl font-semibold">Executive Summary</h1>
      <p>{\`Hi \${name || "team"}, here’s a quick snapshot of where \${business || "your company"} can gain efficiency.\`}</p>
    </div>
  );
}
`,
  'src/components/Report/IndustryInsights.tsx': `
export default function IndustryInsights({ industry }:{industry:string}) {
  return (
    <div className="card">
      <h2 className="font-semibold">Industry context</h2>
      <p>{industry} peers are adopting AI-driven automation at a rapid clip.</p>
    </div>
  );
}
`,
  'src/components/Report/StackTable.tsx': `
export default function StackTable({ stack }:{stack:any[]}) {
  return (
    <div className="card overflow-x-auto">
      <h2 className="font-semibold">Current tech stack</h2>
      <table className="min-w-full text-sm">
        <thead><tr><th>Name</th><th># Integrations</th><th>Verified</th></tr></thead>
        <tbody>
          {stack.map(row => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.integrationCount}</td>
              <td>{row.verified ? "✓" : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
`,
  'src/components/Report/PainPointGrid.tsx': `
export default function PainPointGrid({ analysis }:{analysis:any[]}) {
  return (
    <div className="card">
      <h2 className="font-semibold">Pain-point analysis</h2>
      <ul className="space-y-2">
        {analysis.map(a => (
          <li key={a.pain}><strong>{a.pain}:</strong> {a.suggestion}</li>
        ))}
      </ul>
    </div>
  );
}
`,
  'src/components/Report/QuickWins.tsx': `
export default function QuickWins() {
  return (
    <div className="card">
      <h2 className="font-semibold">Quick-win automations</h2>
      <p>3–5 recipes will appear here.</p>
    </div>
  );
}
`,
  'src/components/Report/Roadmap.tsx': `
export default function Roadmap() {
  return (
    <div className="card">
      <h2 className="font-semibold">30-60-90 day roadmap</h2>
      <ol className="list-decimal pl-5 space-y-1">
        <li>Week 1–2: baseline integrations</li>
        <li>Week 3–6: automate onboarding workflow</li>
        <li>Week 7–12: BI dashboards & advanced analytics</li>
      </ol>
    </div>
  );
}
`,
  'src/components/Report/RoiEstimate.tsx': `
export default function RoiEstimate({ pain }:{pain:any[]}) {
  const hours = pain.length * 2;   // crude placeholder
  const rate  = 65;
  const annual = hours * rate * 52;
  return (
    <div className="card">
      <h2 className="font-semibold">Estimated ROI</h2>
      <p>Potential annual savings: <strong>\${annual.toLocaleString()}</strong></p>
    </div>
  );
}
`,
  'src/components/Report/Appendix.tsx': `
export default function Appendix({ stack }:{stack:any[]}) {
  return (
    <div className="card">
      <h2 className="font-semibold">Appendix – full stack detail</h2>
      <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-2 rounded">
{JSON.stringify(stack, null, 2)}
      </pre>
    </div>
  );
}
`,
};

/* ---------- run --------------------------------------------------- */
(async () => {
  for (const [rel, content] of Object.entries(FILES)) {
    await writeIfMissing(rel, content);
  }

  /* Add a Tailwind “card” class if not present */
  const cssPath = path.join(ROOT, 'styles', 'globals.css');
  try {
    let css = '';
    try { css = await fs.readFile(cssPath, 'utf-8'); } catch {}
    if (!css.includes('.card')) {
      css += '\n.card{@apply rounded-xl bg-white p-6 shadow-sm border border-gray-200;}\n';
      await fs.mkdir(path.dirname(cssPath), { recursive: true });
      await fs.writeFile(cssPath, css);
      console.log('patched styles/globals.css with .card class');
    } else {
      console.log('skip   .card style (already present)');
    }
  } catch (err) {
    console.error('❌ Failed to patch CSS:', err);
  }

  console.log('✅ Report scaffold complete – run `npm run dev`');
})();
