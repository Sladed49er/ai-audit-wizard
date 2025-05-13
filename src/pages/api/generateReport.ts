/* -------------------------------------------------------------------
   API: /api/generateReport   (2-step to avoid 3.5-Turbo 4 096 token cap)
   ------------------------------------------------------------------- */
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const MODEL  = process.env.OPENAI_MODEL || 'gpt-3.5-turbo-0125';

type Json = Record<string, unknown>;

/** helper – one chat completion, returns *string* content */
async function ask(prompt: string, payload: unknown): Promise<string> {
  const chat = await openai.chat.completions.create({
    model: MODEL,
    temperature: 0.3,
    max_tokens: 2048,        // comfortably below 4 096
    messages: [
      { role: 'system', content: prompt },
      { role: 'user',   content: JSON.stringify(payload) },
    ],
  });
  return (chat.choices[0].message.content || '').trim();
}

/** Strips ```json fences (if the model sneaks them in) */
function stripFences(s: string) {
  return s
    .replace(/^\s*```(?:json)?\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
}

/* ------------------- route handler ------------------------------- */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { selectors, userInfo } = req.body;

  try {
    /* -------- Call 1: summary + impact -------------------------- */
    const prompt1 = `
Return pure JSON with ONLY these keys:
execSummary, unusedIntegrations, impactMatrix.

• execSummary: 120-150-word paragraph
• unusedIntegrations: array of 5-7 objects
  { "integration": string, "reason": string, "potentialBenefit": string }
• impactMatrix: { highImpact, mediumImpact, lowImpact }
  each an array of 3+ { "initiative": string, "benefit": string }
NO markdown, NO code fences.
`.trim();

    const part1Raw   = stripFences(await ask(prompt1, { selectors, userInfo }));
    const part1: Json = JSON.parse(part1Raw);

    /* -------- Call 2: playbooks + rollout + risks --------------- */
    const prompt2 = `
Return pure JSON with ONLY these keys:
playbooks, rollout, risks.

• playbooks: array of 3-5
  { "name": string, "steps": [string] /* 5-7 steps */ }
• rollout: { phases: [ { "phase": string, "duration": string, "activities": [string] } ] }
• risks: array of 4-6
  { "risk": string, "mitigation": string }
NO markdown, NO code fences.
`.trim();

    const part2Raw   = stripFences(await ask(prompt2, { selectors, userInfo }));
    const part2: Json = JSON.parse(part2Raw);

    /* -------- merge & reply ------------------------------------ */
    const full: Json = { ...part1, ...part2 };
    res.status(200).json(full);

  } catch (err: any) {
    console.error('generateReport error', err);
    res.status(500).json({ error: err.message || String(err) });
  }
}
