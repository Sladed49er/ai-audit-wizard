import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

/* use GPT-4o if you set OPENAI_API_KEY, else return a stub plan */
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;

  /* ─── fallback for local dev without a key ─── */
  if (!process.env.OPENAI_API_KEY) {
    return res.status(200).json({ plan: getStubPlan(body) });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      messages: [
        { role: 'system', content: 'You are an AI consultant. Output HTML for a roadmap.' },
        { role: 'user', content: JSON.stringify(body) },
      ],
    });
    res.status(200).json({ plan: completion.choices[0].message.content });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? 'OpenAI error' });
  }
}

/* ─── simple stub so local flow always works ─── */
function getStubPlan(data: any) {
  return /* html */ `
    <h1>AI Opportunity Roadmap</h1>
    <h2>Top 3 Opportunities</h2>
    <ul>
      <li>Automate lead data entry</li>
      <li>Predict churn risk</li>
      <li>Voice-to-note for calls</li>
    </ul>
    <h2>14-Day Quick-Start</h2>
    <ol>
      <li>Identify stakeholders</li>
      <li>Map current process</li>
      <li>Pick pilot workflow</li>
      <!-- … -->
    </ol>
  `;
}
