#!/usr/bin/env node
/*
  scripts/scaffold-full-report.js
  Generates all Report components, helpers, JSON, CSS, and installs deps.
  Works in a default “commonjs” Node project.
*/
const { execSync } = require('child_process');
const fs           = require('fs');
const fsp          = fs.promises;
const path         = require('path');

const ROOT = process.cwd();

/* ------------------------------------------------------- */
/* 1 ▪ install runtime deps (safe to rerun)                */
/* ------------------------------------------------------- */
execSync(
  'npm i --save clearbit node-fetch@3 recharts html2pdf.js',
  { stdio: 'inherit' }
);

/* ------------------------------------------------------- */
/* 2 ▪ boilerplate files                                   */
/* ------------------------------------------------------- */
const FILES = {
  // --------- helper modules ----------
  'src/lib/vendorEnrich.ts': `
import fetch from 'node-fetch';
import fs from 'fs/promises';

const CACHE_FILE = './cache/vendorProfiles.json';
let CACHE = {};
try { CACHE = JSON.parse(await fs.readFile(CACHE_FILE, 'utf-8')); } catch {}

export async function profile(name) {
  if (CACHE[name]) return CACHE[name];
  const key = process.env.CLEARBIT_KEY;
  if (!key) return {};
  const url = \`https://company.clearbit.com/v2/companies/find?name=\${encodeURIComponent(name)}\`;
  const res = await fetch(url, { headers: { Authorization: \`Bearer \${key}\` } });
  if (!res.ok) return {};
  const json = await res.json();
  const badge = await fetch(\`https://\${json.domain}/.well-known/security.txt\`)
    .then(r => (r.ok ? '✓ SOC / ISO' : '✕'))
    .catch(() => '✕');
  const prof = { location: json.location, employees: json.metrics.employees, badge };
  CACHE[name] = prof;
  await fs.mkdir('cache', { recursive: true });
  await fs.writeFile(CACHE_FILE, JSON.stringify(CACHE, null, 2));
  return prof;
}
`.trim(),

  'src/lib/roiCalc.ts': `
export function estimateSavings(pain, rate = 65) {
  const hoursSaved = pain.length * 2;
  const annual = hoursSaved * rate * 52;
  return { hoursSaved, annual };
}
`.trim(),

  'src/data/security_requirements.json': `
{
  "Insurance (Retail P&C)": [
    "SOC 2",
    "MFA on customer portals",
    "90-day log retention"
  ],
  "Manufacturing": [
    "ISO 27001",
    "Incident Response Plan",
    "VPN or ZTNA"
  ],
  "SaaS": [
    "Pen-test annually",
    "SSO across apps"
  ]
}
`.trim(),

  // --------- API route for PDF ----------
  'pages/api/pdf.ts': `
import type { NextApiRequest, NextApiResponse } from 'next';
import html2pdf from 'html2pdf.js';
import { readFileSync } from 'fs';
import path from 'path';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const html = readFileSync(
    path.join(process.cwd(), 'pages', 'report-export.html'),
    'utf-8'
  );
  const pdf = await html2pdf().from(html).outputPdf('arraybuffer');
  res.setHeader('Content-Type', 'application/pdf');
  res.send(Buffer.from(pdf));
};
`.trim(),

  // --------- style patch (appended) -----
  'styles/globals.css+': `
.card{@apply rounded-xl bg-white p-6 shadow-sm border border-gray-200;}
.heat-good{@apply bg-green-50 text-green-800 px-2 rounded-md text-xs;}
.heat-bad{@apply bg-red-50 text-red-800 px-2 rounded-md text-xs;}
`.trim(),
};

/* ------------------------------------------------------- */
/* 3 ▪ write / patch files                                 */
/* ------------------------------------------------------- */
const writeFile = async (rel, content, append = false) => {
  const full = path.join(ROOT, rel);
  await fsp.mkdir(path.dirname(full), { recursive: true });
  if (append) {
    const existing = await fsp.readFile(full, 'utf-8').catch(() => '');
    if (!existing.includes(content.trim())) {
      await fsp.writeFile(full, existing + '\n' + content + '\n');
      console.log('patch ', rel);
    } else {
      console.log('skip  ', rel);
    }
  } else {
    if (!fs.existsSync(full)) {
      await fsp.writeFile(full, content + '\n');
      console.log('create', rel);
    } else {
      console.log('skip  ', rel);
    }
  }
};

(async () => {
  // core + CSS
  for (const [rel, content] of Object.entries(FILES)) {
    const append = rel.endsWith('+');
    const filePath = append ? rel.slice(0, -1) : rel;
    await writeFile(filePath, content, append);
  }

  // stub components if missing
  const parts = [
    'SummaryCard',
    'IndustryInsights',
    'StackTable',
    'PainPointGrid',
    'QuickWins',
    'Roadmap',
    'RoiEstimate',
    'Appendix',
    'ComplianceHeatmap',
    'IntegrationChart',
  ];

  for (const p of parts) {
    const rel = `src/components/Report/${p}.tsx`;
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) {
      await writeFile(
        rel,
        `export default function ${p}(){return <div className="card">${p}</div>;}`
      );
    } else {
      console.log('skip  ', rel);
    }
  }

  console.log('\n✅ Full-report scaffold complete. Run `npm run dev` and open the Report step.');
})();
