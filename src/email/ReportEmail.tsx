/* ------------------------------------------------------------------
   Executive AI – Integration Roadmap e-mail (React-Email template)
   ------------------------------------------------------------------ */
import {
  Html, Head, Preview, Body, Container,
  Heading, Section, Text, Link, Hr
} from '@react-email/components';

type Plan = {
  execSummary: string;
  impactMatrix: string;   // already HTML by the time we send
  rollout: string;
};

interface Props { plan: Plan; publicUrl: string }

export default function ReportEmail({ plan, publicUrl }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Your Integration Roadmap is ready</Preview>

      <Body style={{ fontFamily: 'Inter, Arial, sans-serif', background: '#f9fafb' }}>
        <Container style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: '#ffffff',
          padding: '32px',
          borderRadius: '8px'
        }}>
          <Heading as="h2" style={{ margin: 0 }}>
            Executive AI – Integration Roadmap
          </Heading>

          <Section style={{ marginTop: '24px' }}>
            <Text style={{ whiteSpace: 'pre-wrap' }}>{plan.execSummary}</Text>
          </Section>

          <Hr style={{ borderColor: '#e5e7eb' }} />

          <Section
            style={{ marginTop: '24px' }}
            dangerouslySetInnerHTML={{ __html: plan.impactMatrix }}
          />

          <Section style={{ marginTop: '24px' }}>
            <Text style={{ whiteSpace: 'pre-wrap' }}>{plan.rollout}</Text>
          </Section>

          <Hr style={{ borderColor: '#e5e7eb' }} />

          <Section style={{ marginTop: '16px' }}>
            <Text>
              View the fully interactive version:&nbsp;
              <Link href={publicUrl}>{publicUrl}</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

