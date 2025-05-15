import OpenAI from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { selectors, userInfo } = JSON.parse(req.body);

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    max_tokens: 2200,
    temperature: 0.4,
    messages: [
      {
        role: 'system',
        content: `
You are an AI Transformation Consultant.
Return JSON with these keys:
execSummary, unusedIntegrations (array),
impactMatrix (array: {item, effort, impact}),
playbooks (array: {title, trigger, flow, owner, kpi, sample}),
rollout (array: {day, task, owner}),
risks (array: {risk, mitigation}).
Never return markdown, only valid JSON.
      `.trim()
      },
      {
        role: 'user',
        content: JSON.stringify({
          industry: selectors.industry,
          software: selectors.software,
          painPoints: selectors.painPoints,
          companyName: userInfo.business,
        })
      }
    ]
  });

  res.status(200).json(completion.choices[0].message.content);
}
