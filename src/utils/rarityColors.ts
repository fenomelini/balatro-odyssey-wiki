/**
 * Maps rarity integer (1–4) to CSS classes for border and text.
 */

export interface RarityStyle {
  border: string;
  text: string;
  bg: string;
  label_en: string;
  label_pt: string;
  animate: boolean;
}

export const RARITY_STYLES: Record<number, RarityStyle> = {
  1: {
    border: 'border-blue-400',
    text:   'text-blue-300',
    bg:     'bg-blue-400/10',
    label_en: 'Common',
    label_pt: 'Comum',
    animate: false,
  },
  2: {
    border: 'border-green-400',
    text:   'text-green-400',
    bg:     'bg-green-400/10',
    label_en: 'Uncommon',
    label_pt: 'Incomum',
    animate: false,
  },
  3: {
    border: 'border-red-400',
    text:   'text-red-400',
    bg:     'bg-red-400/10',
    label_en: 'Rare',
    label_pt: 'Raro',
    animate: false,
  },
  4: {
    border: 'border-legendary',
    text:   'text-legendary',
    bg:     'bg-legendary/10',
    label_en: 'Legendary',
    label_pt: 'Lendário',
    animate: false,
  },
};

export function getRarityStyle(rarity: number): RarityStyle {
  return RARITY_STYLES[rarity] ?? RARITY_STYLES[1];
}
