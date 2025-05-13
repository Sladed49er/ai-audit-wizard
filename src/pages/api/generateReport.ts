import OpenAI from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
No markdown, no code fences.
          `.trim(),
        },
        {
          role: 'user',
          content: JSON.stringify({ selectors, userInfo }),
        },
      ],
    });

    res
      .status(200)
      .json(JSON.parse(chat.choices[0].message.content as string));
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
