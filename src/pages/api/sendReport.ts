// src/pages/api/sendReport.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true', // 465 → true
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { to, html } = req.body as { to: string; html: string };

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,           // alias, e.g. info@everysolutionit.com
      to,
      subject: 'Your AI Opportunity Roadmap',
      html,
    });
    res.status(200).json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
