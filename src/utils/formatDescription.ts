/**
 * Converts Balatro Lua color tags to styled HTML spans with Tailwind classes.
 * e.g. "{C:mult}+10{}" → "<span class='text-red-400'>+10</span>"
 *
 * @param line   Single description line from Lua localization.
 * @param vars   Optional ordered substitution values for #1#, #2#, … placeholders.
 */

const TAG_MAP: Record<string, string> = {
  // Balatro base color codes
  'C:mult':         'text-red-400 font-semibold',
  'C:chips':        'text-orange-300 font-semibold',
  'C:attention':    'text-yellow-300 font-semibold',
  'C:money':        'text-yellow-400 font-semibold',
  'C:inactive':     'text-gray-400',
  'C:green':        'text-green-400 font-semibold',
  'C:red':          'text-red-400 font-semibold',
  'C:blue':         'text-blue-400 font-semibold',
  'C:white':        'text-white',
  'C:dark_grey':    'text-gray-500',
  'C:legendary':    'text-legendary font-semibold',
  'C:polychrome':   'text-violet-300 font-semibold',
  // XMult badge — styled like in-game red chip
  'X:mult,C:white': 'inline-flex items-center bg-red-700 text-white px-1.5 rounded font-black leading-none',
  // Card types
  'C:tarot':        'text-purple-400 font-semibold',
  'C:planet':       'text-blue-400 font-semibold',
  'C:spectral':     'text-cyan-400 font-semibold',
  // Suits
  'C:hearts':       'text-red-500 font-semibold',
  'C:diamonds':     'text-orange-500 font-semibold',
  'C:spades':       'text-slate-300 font-semibold',
  'C:clubs':        'text-green-500 font-semibold',
  // Special
  'C:dark_edition': 'text-violet-300 font-semibold',
};

export function formatDescriptionLine(
  line: string,
  vars?: (string | number | null | undefined)[]
): string {
  let result = '';
  let i = 0;
  let openSpans = 0;

  while (i < line.length) {
    if (line[i] === '{') {
      const end = line.indexOf('}', i);
      if (end === -1) { result += line[i++]; continue; }
      const tag = line.slice(i + 1, end);

      if (tag === '') {
        if (openSpans > 0) { result += '</span>'; openSpans--; }
        i = end + 1;
        continue;
      }

      const cssClass = TAG_MAP[tag];
      if (cssClass) { result += `<span class="${cssClass}">`; openSpans++; }
      i = end + 1;
      continue;
    }

    // Variable placeholder #N#
    if (line[i] === '#') {
      const end = line.indexOf('#', i + 1);
      if (end !== -1) {
        const n = parseInt(line.slice(i + 1, end), 10);
        const val = vars && !Number.isNaN(n) ? vars[n - 1] : undefined;
        if (val !== undefined && val !== null) {
          result += `<span class="text-yellow-300 font-semibold">${val}</span>`;
        } else {
          result += `<span class="text-yellow-300 font-semibold">?</span>`;
        }
        i = end + 1;
        continue;
      }
    }

    if (line[i] === '<') result += '&lt;';
    else if (line[i] === '>') result += '&gt;';
    else if (line[i] === '&') result += '&amp;';
    else result += line[i];
    i++;
  }

  while (openSpans > 0) { result += '</span>'; openSpans--; }
  return result;
}

/**
 * Convert an array of description lines to rich HTML.
 * Lines joined with a space (Lua line breaks are UI formatting, not semantic).
 */
export function formatDescription(
  lines: string[],
  vars?: (string | number | null | undefined)[]
): string {
  return lines.map(l => formatDescriptionLine(l, vars)).join(' ');
}

/**
 * Strip all Lua color tags — returns plain text for search indexing.
 * vars: optional substitution values for #1#, #2#, … placeholders.
 */
export function stripDescription(
  lines: string[],
  vars?: (string | number | null | undefined)[]
): string {
  return lines
    .map(line =>
      line
        .replace(/\{[^}]*\}/g, '')
        .replace(/#(\d+)#/g, (_, n) => {
          const val = vars && vars[parseInt(n, 10) - 1];
          return val !== undefined && val !== null ? String(val) : '?';
        })
        .trim()
    )
    .join(' ');
}
