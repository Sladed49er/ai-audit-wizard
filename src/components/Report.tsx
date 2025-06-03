// File: src/components/Report.tsx
// Same imports & types … unchanged …

export default function Report({ data }: ReportProps) {
  /* helpers that always return an array */
  const ai = (arr: Initiative[]  | undefined)   => arr ?? [];
  const ai2 = (arr: Integration[] | undefined)  => arr ?? [];
  const phs = (arr: Phase[]       | undefined)  => arr ?? [];
  const rsk = (arr: Risk[]        | undefined)  => arr ?? [];
  const pb  = (arr: Playbook[]    | undefined)  => arr ?? [];

  return (
    <div className="space-y-8 text-sm">
      {/* ---------- Executive Summary ---------- */}
      {data.execSummary && (
        <section>
          <h2 className="text-xl font-semibold">Executive Summary</h2>
          <p className="mt-2 whitespace-pre-wrap">{data.execSummary}</p>
        </section>
      )}

      {/* ---------- Impact Matrix --------------- */}
      {data.impactMatrix && (
        <section>
          <h2 className="text-xl font-semibold">Impact Matrix</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {(["highImpact","mediumImpact","lowImpact"] as const).map((key) => (
              <div key={key}>
                <h3 className="font-medium capitalize">
                  {key.replace("Impact"," Impact")}
                </h3>
                <ul className="list-disc list-inside">
                  {ai(data.impactMatrix?.[key]).map((item,i)=>(
                    <li key={i}><strong>{item.initiative}</strong>: {item.benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Unused Integrations --------- */}
      {!!ai2(data.unusedIntegrations).length && (
        <section>
          <h2 className="text-xl font-semibold">Unused Integrations</h2>
          <ul className="list-disc list-inside">
            {ai2(data.unusedIntegrations).map((u,i)=>(
              <li key={i}>
                <strong>{u.integration}</strong> — {u.reason}. <em>{u.potentialBenefit}</em>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------- Playbooks ------------------- */}
      {!!pb(data.playbooks).length && (
        <section>
          <h2 className="text-xl font-semibold">Playbooks</h2>
          {pb(data.playbooks).map((p,i)=>(
            <div key={i} className="mb-4">
              <h3 className="font-medium">{p.name}</h3>
              <ol className="list-decimal list-inside ml-4">
                {p.steps.map((s,j)=><li key={j}>{s}</li>)}
              </ol>
            </div>
          ))}
        </section>
      )}

      {/* ---------- Roll-out timeline ----------- */}
      {!!phs(data.rollout?.phases).length && (
        <section>
          <h2 className="text-xl font-semibold">Roll-out Timeline</h2>
          <table className="w-full text-left border">
            <thead className="bg-gray-100">
              <tr><th className="border px-2 py-1">Phase</th>
                  <th className="border px-2 py-1">Duration</th>
                  <th className="border px-2 py-1">Activities</th></tr>
            </thead>
            <tbody>
              {phs(data.rollout?.phases).map((p,i)=>(
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

      {/* ---------- Risks ----------------------- */}
      {!!rsk(data.risks).length && (
        <section>
          <h2 className="text-xl font-semibold">Risks &amp; Mitigations</h2>
          <ul className="list-disc list-inside">
            {rsk(data.risks).map((r,i)=>(
              <li key={i}><strong>{r.risk}</strong>: {r.mitigation}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
