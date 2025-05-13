/* -------------------------------------------------------------
   src/lib/reportHelpers.ts
   Central helpers for the Report screen
   ------------------------------------------------------------- */

import integrations from '@/data/integration-data-updated.json';

/* ---------- Type used across StackTable, Roadmap, etc. ------ */
export interface EnrichedStackRow {
  name: string;
  integrationCount: number;
  mainFunctions: string[];
  verified: boolean;
  logo?: string;            // optional Clearbit or vendor-provided logo
}

/* ---------- Build a rich stack array from raw software names -- */
export function enrichStack(software: string[]): EnrichedStackRow[] {
  return software.map(rawName => {
    const meta: any = (integrations as any)[rawName] ?? {};

    return {
      name: rawName,
      integrationCount: meta.integrates_with?.length ?? 0,
      mainFunctions: Array.isArray(meta.main_functions)
        ? meta.main_functions
        : [],
      verified: !!meta.verified,
      logo:
        meta.logo ||
        (meta.domain
          ? `https://logo.clearbit.com/${meta.domain}`
          : undefined),
    };
  });
}

/* ---------- Map pain points to quick suggestions ------------- */
export function mapPainPoints(selected: string[]) {
  const suggestions: Record<string, string> = {
    'Manual onboarding processes':
      'Use Typeform → Zapier → CRM to auto-create clients and tasks.',
    'Disjointed communication tools':
      'Consolidate onto Slack + Zoom; log meetings back to CRM automatically.',
    'Limited AMS integrations':
      'Leverage Vertafore Orange Partner API to sync policies nightly.',
  };

  return selected.map(p => ({
    pain: p,
    suggestion: suggestions[p] ?? 'See appendix for detailed guidance.',
  }));
}
