export type IndustryRecord = {
  software: string[];
  pain_points: string[];
};

export type IndustryMap = Record<string, IndustryRecord>;

export type Integration = {
  integrates_with: string[];
};
export type IntegrationMap = Record<string, Integration>;
