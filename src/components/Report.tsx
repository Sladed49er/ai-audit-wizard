// File: src/components/Report.tsx

import React from "react";

// Define types for each data section

export type Integration = {
  integration: string;
  reason: string;
  potentialBenefit: string;
};

export type Initiative = {
  initiative: string;
  benefit: string;
};

export type Playbook = {
  name: string;
  steps: string[];
};

export type Phase = {
  phase: string;
  duration: string;
  activities: string[];
};

export type Risk = {
  risk: string;
  mitigation: string;
};

export type ReportData = {
  execSummary?: string;
  unusedIntegrations?: Integration[];
  impactMatrix?: {
    highImpact?: Initiative[];
    mediumImpact?: Initiative[];
    lowImpact?: Initiative[];
  };
  playbooks?: Playbook[];
  rollout?: {
    phases?: Phase[];
  };
  risks?: Risk[];
};

export type ReportProps = {
  data: ReportData;
};

export default function Report({ data }: ReportProps) {
  return (
    <div className="space-y-8 text-sm">
      {data.execSummary && (
        <section>
          <h2 className="text-xl font-semibold">Executive Summary</h2>
          <p className="mt-2 text-gray-700 whitespace-pre-wrap">{data.execSummary}</p>
        </section>
      )}

      {data.impactMatrix && (
        <section>
          <h2 className="text-xl font-semibold">Impact Matrix</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {(["highImpact", "mediumImpact", "lowImpact"] as const).map((key) => (
              <div key={key}>
                <h3 className="font-medium capitalize">
                  {key.replace("Impact", " Impact")}
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                  {data.impactMatrix?.[key]?.map((item, i) => (
                    <li key={i}>
                      <strong>{item.initiative}</strong>: {item.benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.unusedIntegrations && (
        <section>
          <h2 className="text-xl font-semibold">Unused Integrations</h2>
          <ul className="list-disc list-inside text-gray-700">
            {data.unusedIntegrations.map((item, i) => (
              <li key={i}>
                <strong>{item.integration}</strong> — {item.reason}. <em>{item.potentialBenefit}</em>
              </li>
            ))}
          </ul>
        </section>
      )}

      {data.playbooks && (
        <section>
          <h2 className="text-xl font-semibold">Playbooks</h2>
          {data.playbooks.map((pb, i) => (
            <div key={i} className="mb-4">
              <h3 className="font-medium">{pb.name}</h3>
              <ol className="list-decimal list-inside ml-4 text-gray-700">
                {pb.steps.map((step, j) => (
                  <li key={j}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </section>
      )}

      {data.rollout?.phases && (
        <section>
          <h2 className="text-xl font-semibold">Roll-out Timeline</h2>
          <table className="w-full text-left border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Phase</th>
                <th className="border px-2 py-1">Duration</th>
                <th className="border px-2 py-1">Activities</th>
              </tr>
            </thead>
            <tbody>
              {data.rollout.phases.map((ph, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{ph.phase}</td>
                  <td className="border px-2 py-1">{ph.duration}</td>
                  <td className="border px-2 py-1">
                    <ul className="list-disc list-inside">
                      {ph.activities.map((act, j) => (
                        <li key={j}>{act}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {data.risks && (
        <section>
          <h2 className="text-xl font-semibold">Risks & Mitigations</h2>
          <ul className="list-disc list-inside text-gray-700">
            {data.risks.map((risk, i) => (
              <li key={i}>
                <strong>{risk.risk}</strong>: {risk.mitigation}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

