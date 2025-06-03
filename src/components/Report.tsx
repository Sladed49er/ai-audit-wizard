// File: src/components/Report/Report.tsx
import React from "react";

/* ──────── types ──────── */
export type Integration = { integration: string; reason: string; potentialBenefit: string };
export type Initiative  = { initiative : string; benefit: string };
export type Playbook    = { name: string; steps: string[] };
export type Phase       = { phase: string; duration: string; activities: string[] };
export type Risk        = { risk: string; mitigation: string };

export type ReportData = {
  execSummary?: string;
  unusedIntegrations?: Integration[];
  impactMatrix?: {
    highImpact?: Initiative[];
    mediumImpact?: Initiative[];
    lowImpact?: Initiative[];
  };
  playbooks?: Playbook[];
  rollout?: { phases?: Phase[] };
  risks?: Risk[];
};
export type ReportProps = { data: ReportData };

/* helper that always returns an array */
const safe = <T,>(arr: T[] | undefined) => arr ?? [];

/* ──────── component ──────── */
export default function Report({ data }: ReportProps) {
  return (
    <div className="space-y-8 text-sm">

      {/* Executive summary */}
      {data.execSummary && (
        <section>
          <h2 className="text-xl font-semibold">Executive Summary</h2>
          <p className="mt-2 whitespace-pre-wrap">{data.execSummary}</p>
        </section>
      )}

      {/* Impact matrix */}
      {data.impactMatrix && (
        <section>
          <h2 className="text-xl font-semibold">Impact Matrix</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {(["highImpact","mediumImpact","lowImpact"] as const).map(key=>(
              <div key={key}>
                <h3 className="font-medium capitalize">{key.replace("Impact"," Impact")}</h3>
                <ul className="list-disc list-inside">
                  {safe(data.impactMatrix?.[key]).map((it,i)=>(
                    <li key={i}><strong>{it.initiative}</strong>: {it.benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Unused integrations */}
      {!!safe(data.unusedIntegrations).length && (
        <section>
          <h2 className="text-xl font-semibold">Unused Integrations</h2>
          <ul className="list-disc list-inside">
            {safe(data.unusedIntegrations).map((u,i)=>(
              <li key={i}><strong>{u.integration}</strong> — {u.reason}. <em>{u.potentialBenefit}</em></li>
            ))}
          </ul>
        </section>
      )}

      {/* Playbooks */}
      {!!safe(data.playbooks).length && (
        <section>
          <h2 className="text-xl font-semibold">Playbooks</h2>
          {safe(data.playbooks).map((pb,i)=>(
            <div key={i} className="mb-4">
              <h3 className="font-medium">{pb.name}</h3>
              <ol className="list-decimal list-inside ml-4">
                {pb.steps.map((s,j)=><li key={j}>{s}</li>)}
              </ol>
            </div>
          ))}
        </section>
      )}

      {/* Roll-out timeline */}
      {!!safe(data.rollout?.phases).length && (
        <section>
          <h2 className="text-xl font-semibold">Roll-out Timeline</h2>
          <table className="w-full text-left border">
            <thead className="bg-gray-100">
              <tr><th className="border px-2 py-1">Phase</th>
                  <th className="border px-2 py-1">Duration</th>
                  <th className="border px-2 py-1">Activities</th></tr>
            </thead>
            <tbody>
              {safe(data.rollout?.phases).map((p,i)=>(
                <tr key={i}>
                  <td className="border px-2 py-1">{p.phase}</td>
                  <td className="border px-2 py-1">{p.duration}</td>
                  <td className="border px-2 py-1">
                    <ul className="list-disc list-inside">
                      {p.activities.map((a,j)=><li key={j}>{a}</li>)}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Risks */}
      {!!safe(data.risks).length && (
        <section>
          <h2 className="text-xl font-semibold">Risks & Mitigations</h2>
          <ul className="list-disc list-inside">
            {safe(data.risks).map((r,i)=>(
              <li key={i}><strong>{r.risk}</strong>: {r.mitigation}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

