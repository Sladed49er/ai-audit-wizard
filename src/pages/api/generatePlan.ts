/* -------------------------------------------------------------------
   API: /api/generatePlan
   Much richer prompt + GPT-4o                                       */
/* eslint-disable @typescript-eslint/no-explic-any */

import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const MODEL  = 'gpt-4o-mini';          // fast + large context

type Json = Record<string, any>;

/* helper – chat once, return content string */
async function ask(prompt: string, payload: unknown) {
  const chat = await openai.chat.completions.create({
    model: MODEL,
    temperature: 0.25,
    max_tokens: 4096,
    messages: [
      { role: 'system', content: prompt },
      { role: 'user',   content: JSON.stringify(payload) },
    ],
  });
  return (chat.choices[0].message.content ?? '').trim();
}

/* strip ``` fences if the model adds them */
const strip = (s: string) =>
  s.replace(/^\s*```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).send('Method Not Allowed');

  const { selectors, userInfo } = req.body;

  /* ---------------- prompt ------------------------------------- */
  const prompt = `
You are an AI-transformation consultant.

Return **pure JSON** (no markdown, no fences) with EXACTLY these keys:

execSummary        – 140-180 words paragraph

impactMatrix       – object with keys highImpact / mediumImpact / lowImpact.
                     Each is array of **3-4** objects
                     { "initiative": str, "benefit": str }

unusedIntegrations – array of **6-8**
                     { "integration": str, "reason": str, "potentialBenefit": str }

playbooks          – array of **4-6**
                     { "name": str, "steps": [ str x5-8 ] }

rollout            – { "phases": [ { "phase": str, "duration": str,
                                     "activities": [ str x4-6 ] } ] }
                     Provide **6-8 phases** covering 12 months.

risks              – array of **6-8**
                     { "risk": str, "mitigation": str }

If any field is uncertain, fabricate sensible, domain-relevant content.
`.trim();

  /* ---------------- call + parse ------------------------------- */
  try {
    let raw = await ask(prompt, { selectors, userInfo });
    raw     = strip(raw);

    let json: Json;
    try {
      json = JSON.parse(raw);
    } catch {
      /* one quick retry if parsing fails */
      raw  = strip(await ask(prompt, { selectors, userInfo, retry: true }));
      json = JSON.parse(raw);
    }

    return res.status(200).json(json);

  } catch (err: any) {
    console.error('generatePlan error', err);
    return res.status(500).json({ error: err.message ?? String(err) });
  }
}
