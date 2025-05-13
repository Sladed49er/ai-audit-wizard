/* -------------------------------------------------------------
   cleanMarkdownHtml.ts
   Removes any leading explanation text plus the opening ```html
   code-fence, and strips a trailing ``` fence if present.
   Handles upper/lower-case and extra whitespace.
   ------------------------------------------------------------- */
export function cleanMarkdownHtml(raw: string): string {
  if (!raw) return '';

  // 1⃣  Remove everything up to (and including) the first ```html fence.
  //     [\s\S] lets the dot match newlines so we can span multiple lines.
  let cleaned = raw.replace(/^[\s\S]*?```html\s*/i, '');

  // 2⃣  Remove a trailing ``` fence, if any.
  cleaned = cleaned.replace(/```[\s\n]*$/i, '');

  // 3⃣  Trim stray whitespace and return.
  return cleaned.trim();
}
