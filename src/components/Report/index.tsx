import { useAuditState } from '@/context/AuditContext';
import { enrichStack, mapPainPoints } from '@/lib/reportHelpers';

import SummaryCard       from './SummaryCard';
import IndustryInsights  from './IndustryInsights';
import StackTable        from './StackTable';
import PainPointGrid     from './PainPointGrid';
import QuickWins         from './QuickWins';
import Roadmap           from './Roadmap';
import RoiEstimate       from './RoiEstimate';
import Appendix          from './Appendix';

export default function Report() {
  const [state] = useAuditState();
  const { name, business } = state.userInfo;
  const { industry, software, painPoints } = state.selectors;

  const stack      = enrichStack(software);
  const painMatrix = mapPainPoints(painPoints);

  return (
    <section className="space-y-10 pb-20">
      <SummaryCard name={name} business={business} />
      <IndustryInsights industry={industry} />
      <StackTable stack={stack} />
      <PainPointGrid analysis={painMatrix} />
      <QuickWins stack={stack} pain={painMatrix} />
      <Roadmap />
      <RoiEstimate pain={painMatrix} />
      <Appendix stack={stack} />
    </section>
  );
}
