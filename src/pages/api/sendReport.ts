// src/pages/api/sendReport.ts
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Dynamically import Nodemailer *inside* the request handler
 * so Webpack never bundles it for the client build.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  // Runtime (server-side) import
  const nodemailer = (await import('nodemailer')).default;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  const { to, html } = req.body as { to: string; html: string };

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM!,               // "Every Solution IT <info@…>"
      to,
      subject: 'Your AI Opportunity Roadmap',
      html,
    });
    res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('email error', err);
    res.status(500).json({ error: err.message ?? 'SMTP error' });
  }
}
