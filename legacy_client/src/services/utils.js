import { format } from 'date-fns';

// ── Currency ───────────────────────────────────────────

export function formatCurrency(value) {
  const usd = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  const inrValue = value * 83.0;
  const inr = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(inrValue);

  return `${usd} (${inr})`;
}

// ── Percent ────────────────────────────────────────────

export function formatPercent(value) {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

// ── Number ─────────────────────────────────────────────

export function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

// ── Compact number (e.g. 1.2M) ────────────────────────

export function formatCompact(value) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(value);
}

// ── Date ───────────────────────────────────────────────

export function formatDate(timestamp) {
  return format(new Date(timestamp), 'MMM dd, yyyy');
}

// ── Time ───────────────────────────────────────────────

export function formatTime(timestamp) {
  return format(new Date(timestamp), 'HH:mm:ss');
}

// ── DateTime ───────────────────────────────────────────

export function formatDateTime(timestamp) {
  return format(new Date(timestamp), 'MMM dd, yyyy HH:mm');
}

// ── Class Name merge helper ────────────────────────────

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// ── Conditional color class based on value sign ────────

export function getChangeColor(value) {
  if (value > 0) return 'text-accent-green';
  if (value < 0) return 'text-accent-red';
  return 'text-dark-300';
}

export function getChangeBg(value) {
  if (value > 0) return 'bg-accent-green/10 text-accent-green';
  if (value < 0) return 'bg-accent-red/10 text-accent-red';
  return 'bg-dark-700/50 text-dark-300';
}
