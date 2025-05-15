import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  const { idea, software, pains, industry } = req.body;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are an IT-consultant that delivers AI-automation roadmaps. ' +
          'Respond ONLY in minified JSON with keys: ' +
          'execSummary, impactMatrix, quickWins, rolloutTimeline, roi, appendix.',
      },
      { role: 'user', content: JSON.stringify({ idea, software, pains, industry }) },
    ],
    max_tokens: 900,
  });

  const json = completion.choices[0].message?.content ?? '{}';

  try {
    const data = JSON.parse(json);
    return res.status(200).json({ report: data });
  } catch {
    return res.status(500).json({ error: 'Failed to parse AI response.' });
  }
}
