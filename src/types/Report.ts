/* -----------------------------------------------------------
   Central type definitions used by every report card
   ----------------------------------------------------------- */
export interface ExecSummary {
  summary: string;
}

export interface ImpactMatrix {
  highImpact:  string[];
  mediumImpact:string[];
  lowImpact:   string[];
}

export interface Playbook {
  name:  string;
  steps: string[];
}

export interface RiskItem {
  risk:        string;
  mitigation:  string;
}

export interface RolloutPhase {
  phase:      string;
  duration:   string;
  activities: string[];
}

export interface LlmReport {
  execSummary:        string;           // simple paragraph
  unusedIntegrations: string[];         // list of names
  impactMatrix:       ImpactMatrix;
  playbooks:          Playbook[];
  rollout:            { phases: RolloutPhase[] };
  risks:              RiskItem[];
}
