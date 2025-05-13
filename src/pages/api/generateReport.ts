/* -----------------------------------------------------------------
   src/pages/api/generateReport.ts
   Calls OpenAI ChatCompletion and always returns *pure JSON*.
   ---------------------------------------------------------------- */
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { selectors, userInfo } = req.body;

  try {
    /* ---- ask GPT -------------------------------------------------- */
    const chat = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo-0125',
      temperature: 0.3,
      max_tokens : 16384,
      messages: [
        {
          role: 'system',
          content: `
You are an AI transformation consultant.
Return *pure JSON only* (no code fences, no markdown) with keys:
execSummary, unusedIntegrations, impactMatrix, playbooks, rollout, risks.
          `.trim(),
        },
        {
          role: 'user',
          content: JSON.stringify({ selectors, userInfo }),
        },
      ],
    });

    const raw = (chat.choices[0].message.content || '').trim();
    /* ---- validate JSON ------------------------------------------- */
    try {
      const json = JSON.parse(raw);
      return res.status(200).json(json);
    } catch {
      return res.status(500).json({
        error: 'LLM returned non-JSON',
        raw,                 // let the frontend log it
      });
    }
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}
