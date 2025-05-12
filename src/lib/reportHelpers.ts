import integrations from '@/data/integration-data-updated.json';

export function enrichStack(software: string[]) {
  return software.map(name => {
    const meta: any = (integrations as any)[name] ?? {};
    return {
      name,
      integrationCount: meta.integrates_with?.length ?? 0,
      mainFunctions:    meta.main_functions          ?? [],
      verified:         meta.verified               ?? false,
    };
  });
}

export function mapPainPoints(selected: string[]) {
  const suggestions: Record<string,string> = {
    "Manual onboarding processes": "Automate intake with Typeform + Zapier",
    "Inconsistent client follow-up": "CRM tasks triggered by email events",
  };
  return selected.map(p => ({ pain: p, suggestion: suggestions[p] ?? "See appendix" }));
}
