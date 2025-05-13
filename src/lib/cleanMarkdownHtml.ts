/* -------------------------------------------------------------
   cleanMarkdownHtml.ts
   Strips any Markdown code-fence (```html … ```) and intro line
   from a string that the LLM returned.
   ------------------------------------------------------------- */
export function cleanMarkdownHtml(raw: string): string {
  if (!raw) return '';

  // 1. Remove the “Here’s an HTML representation…” lead-in
  //    + the opening ```html fence (case-insensitive).
  //    [\s\S] matches newlines too, so we don’t need the `s` flag.
  const noIntro = raw.replace(/^[\s\S]*?```html\s*/i, '');

  // 2. Remove a trailing ``` fence if present.
  return noIntro.replace(/```$/i, '').trim();
}
