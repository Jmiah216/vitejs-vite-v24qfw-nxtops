/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format a date range to a readable string
 */
export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return `${formatDate(start)} - ${formatDate(end)}`;
}

/**
 * Format a month/year date to a readable string
 */
export function formatMonthYear(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
}

/**
 * Get relative time string (e.g. "2 days ago")
 */
export function getRelativeTimeString(date: Date): string {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const daysDiff = Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  
  if (Math.abs(daysDiff) < 1) {
    return 'today';
  }
  return rtf.format(daysDiff, 'day');
}