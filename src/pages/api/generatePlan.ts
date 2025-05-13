/**
 * POST /api/generatePlan
 * Body: { idea: string }
 *
 * Returns: { roadmap: string }
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // set in .env.local and Vercel dashboard
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { idea } = req.body as { idea?: string };

    if (!idea || idea.trim().length < 10) {
      return res.status(400).json({ error: 'Idea is too short.' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an AI consultant. Build a concise 3-step automation roadmap.',
        },
        { role: 'user', content: `We’d love AI to handle: ${idea}` },
      ],
      max_tokens: 250,
    });

    const roadmap = completion.choices[0].message?.content ?? 'No response.';
    res.status(200).json({ roadmap });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate roadmap.' });
  }
}
