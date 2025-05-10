import industryJson     from "@/data/industry-ui-enriched.json";
import integrationJson  from "@/data/integration-data-updated.json";
import type { IntegrationMap } from "@/types/Data";

/* ------------------------------------------------------------------
   We intentionally cast the bulky JSON blobs to `any` so that
   Next.js’ production type-checker won’t bail on structural mismatch.
   ------------------------------------------------------------------ */
const industries: any = industryJson;
const integrations = integrationJson as IntegrationMap;

/* ─────────────────────────────────────────────────────────── */
/* Helpers                                                    */
/* ─────────────────────────────────────────────────────────── */

export const getIndustries = () => Object.keys(industries);

/** Up to 15 software names (handles arrays of strings *or* objects) */
export const getIndustrySoftware = (industry: string): string[] => {
  const list = industries[industry]?.software;

  if (Array.isArray(list)) {
    // array of strings  OR  array of objects with .name
    return list
      .map((item: any) => (typeof item === "string" ? item : item.name))
      .slice(0, 15);
  }

  if (list && typeof list === "object") {
    // object map → array
    return Object.values(list as Record<string, any>)
      .map((item: any) => (typeof item === "string" ? item : item.name))
      .slice(0, 15);
  }

  return [];
};

/** Up to 10 pain-point strings (handles new + legacy shapes) */
export const getIndustryPain = (industry: string): string[] => {
  const raw = industries[industry]?.pain_points;

  // new format: { frictions: [ ... ] }
  if (raw?.frictions && Array.isArray(raw.frictions)) {
    return raw.frictions.slice(0, 10);
  }

  // simple array
  if (Array.isArray(raw)) return raw.slice(0, 10);

  // object map
  if (raw && typeof raw === "object") {
    return Object.values(raw as Record<string, string>).slice(0, 10);
  }

  return [];
};

/** Flat lookup in integration-data JSON */
export const getIntegrationList = (software: string): string[] =>
  integrations[software]?.integrates_with ?? [];
