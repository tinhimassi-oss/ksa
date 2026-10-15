const EASTERN_ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

/**
 * Converts Western digits (0-9) to Eastern Arabic digits (٠-٩)
 */
export function toEasternNumerals(val: number | string | null | undefined): string {
  if (val === null || val === undefined) return '';
  const str = String(val);
  return str.replace(/\d/g, (digit) => EASTERN_ARABIC_DIGITS[parseInt(digit, 10)] || digit);
}

/**
 * Formats minutes and seconds with Eastern Arabic numerals (e.g., ٠٤:٣٠)
 */
export function formatTimeEastern(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const minsStr = mins < 10 ? `0${mins}` : `${mins}`;
  const secsStr = secs < 10 ? `0${secs}` : `${secs}`;
  return toEasternNumerals(`${minsStr}:${secsStr}`);
}

/**
 * Converts option index (0, 1, 2, 3) to Arabic letter (أ، ب، ج، د)
 */
export function getArabicOptionLetter(index: number): string {
  const letters = ['أ', 'ب', 'ج', 'د', 'هـ', 'و'];
  return letters[index] || toEasternNumerals(index + 1);
}
