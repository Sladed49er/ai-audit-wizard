/* -------------------------------------------------------------------
   src/pages/api/generateReport.ts
   Calls OpenAI (GPT-4o or fallback) and guarantees JSON output.
   ------------------------------------------------------------------- */

import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { selectors, userInfo } = req.body;

  try {
    /* ── GPT call ─────────────────────────────────────────────── */
    const chat = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      max_tokens: 2200,
      temperature: 0.4,
      messages: [
        {
          role: 'system',
          content: `
You are an AI Transformation Consultant.
Return pure JSON with keys:
execSummary, unusedIntegrations, impactMatrix,
playbooks, rollout, risks.
NO markdown, no code fences.
          `.trim(),
        },
        { role: 'user', content: JSON.stringify({ selectors, userInfo }) },
      ],
    });

    /* ── clean + parse ────────────────────────────────────────── */
    const raw = chat.choices[0].message.content ?? '{}';

    const cleaned = raw
      .replace(/^[\s\S]*?```(?:json|html)?\s*/i, '') // remove leading fence
      .replace(/```[\s\n]*$/i, '')                  // remove trailing fence
      .trim();

    let json;
    try {
      json = JSON.parse(cleaned);
    } catch (e) {
      console.error('❌  GPT returned non-JSON. Raw:', cleaned);
      return res
        .status(500)
        .json({ error: 'LLM returned non-JSON', raw: cleaned });
    }

    return res.status(200).json(json);
  } catch (err: any) {
    console.error('❌  OpenAI error', err);
    return res.status(500).json({ error: err.message });
  }
}
