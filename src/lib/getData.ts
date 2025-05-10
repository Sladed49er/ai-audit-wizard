import industryJson from "@/data/industry-ui-enriched.json";
import integrationJson from "@/data/integration-data-updated.json";
import type { IndustryMap, IntegrationMap } from "@/types/Data";

const industries: any = industryJson;
const integrations = integrationJson as IntegrationMap;

/* ─────────────────────────────────────────────────────────── */
/* basic helpers                                               */
/* ─────────────────────────────────────────────────────────── */

export const getIndustries = () => Object.keys(industries);

/** 
 * Returns up to 15 software names for the chosen industry.
 * Handles:
 *   • simple string arrays  
 *   • array-of-objects → uses each .name  
 *   • object maps of { key: name }
 */
export const getIndustrySoftware = (industry: string): string[] => {
  const list = industries[industry]?.software;

  // array of strings or objects
  if (Array.isArray(list)) {
    return list
      .map((item: any) => (typeof item === "string" ? item : item.name))
      .slice(0, 15);
  }

  // object map → array
  if (list && typeof list === "object") {
    return Object.values(list as Record<string, any>)
      .map((item: any) => (typeof item === "string" ? item : item.name))
      .slice(0, 15);
  }

  return [];
};

/** 
 * Returns up to 10 pain-point strings.
 * Handles:
 *   • new format  { pain_points: { frictions: [ ... ] } }  
 *   • legacy simple array  
 *   • object map of { key: string }
 */
export const getIndustryPain = (industry: string): string[] => {
  const raw = industries[industry]?.pain_points;

  // new structure: { frictions: [ ... ] }
  if (raw?.frictions && Array.isArray(raw.frictions)) {
    return raw.frictions.slice(0, 10);
  }

  // simple array
  if (Array.isArray(raw)) {
    return raw.slice(0, 10);
  }

  // object map → array
  if (raw && typeof raw === "object") {
    return Object.values(raw as Record<string, string>).slice(0, 10);
  }

  return [];
};

/** integrations map is already flat: { "EZLynx": { integrates_with: [...] } } */
export const getIntegrationList = (software: string): string[] =>
  integrations[software]?.integrates_with ?? [];
