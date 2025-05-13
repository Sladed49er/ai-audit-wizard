/* -----------------------------------------------------------------
   src/components/Report/Roadmap.tsx
   Shows a roadmap section in the Report. It receives a raw HTML
   string (often wrapped in ```html fences) and cleans it before
   injecting it into the DOM.
   ----------------------------------------------------------------- */

'use client';

import { cleanMarkdownHtml } from '@/lib/cleanMarkdownHtml';

interface Props {
  html: string;        // raw roadmap HTML string from generator / API
}

export default function Roadmap({ html }: Props) {
  const cleaned = cleanMarkdownHtml(html);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">
        30 / 60 / 120 / 365-day Roadmap
      </h2>

      {/* inject cleaned markup */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: cleaned }}
      />
    </div>
  );
}
