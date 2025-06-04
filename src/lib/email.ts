/* ------------------------------------------------------------------
   Thin wrapper around Resend e-mail service
   ------------------------------------------------------------------ */
import { Resend } from 'resend';
import { render } from '@react-email/render';
import ReportEmail from '@/emails/ReportEmail';

const resend = new Resend(process.env.RESEND_API_KEY!);

/**
 * Sends the Integration Roadmap to both the participant and
 * Netstar’s ops mailbox.
 */
export async function sendReportEmail(
  plan: any,
  recipient: string,
  reportId: string
) {
  const html = render(
    <ReportEmail
      plan={plan}
      publicUrl={`${process.env.NEXT_PUBLIC_SITE_URL}/report?id=${reportId}`}
    />
  );

  await resend.emails.send({
    from: process.env.REPORT_FROM!,                  // e.g. reports@everysolutionit.com
    to: [recipient, 'info@everysolutionit.com'],
    subject: 'Your Executive AI Integration Roadmap',
    html
  });
}

