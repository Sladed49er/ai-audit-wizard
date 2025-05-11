// ─────────────────────────────────────────────────────────────
// src/lib/getData.ts
// Centralised helpers for industry + integration look-ups
// ─────────────────────────────────────────────────────────────
import industryJson       from '@/data/industry-ui-enriched.json';
import integrationJson    from '@/data/integration-data-updated.json';

import type {
  IndustryMap,
  IntegrationMap,
  IndustryRecord,
} from '@/types/Data';

/* ─── raw constants ────────────────────────────────────────── */
/*  The `satisfies` operator forces the imported JSON to match
    the TS type without casting, so the editor stays happy.    */
const industries   = industryJson   satisfies IndustryMap;
const integrations = integrationJson satisfies IntegrationMap;

/* ─── industry helpers ─────────────────────────────────────── */
export const getIndustries = (): string[] =>
  Object.keys(industries);

/** Return software array (capped with optional slice) */
export const getIndustrySoftware = (
  industry: string,
  slice = 999,
): string[] =>
  (industries[industry]?.software ?? []).slice(0, slice);

/** Return pain-points array (capped with optional slice) */
export const getIndustryPain = (
  industry: string,
  slice = 999,
): string[] =>
  industries[industry]?.pain_points?.frictions.slice(0, slice) ?? [];

/* ─── integration helpers ─────────────────────────────────── */
export const getIntegrationMap = (): IntegrationMap => integrations;

/** Software → array of “integrates with …” strings (or empty) */
export const getIntegratesWith = (software: string): string[] =>
  integrations[software]?.integrates_with ?? [];

/* ─── fail-safe: stub data for local dev (no JSON yet) ────── */
export const isIndustryLoaded = (key: string): key is keyof IndustryMap =>
  key in industries;

export const isSoftwareKnown = (sw: string): sw is keyof IntegrationMap =>
  sw in integrations;
