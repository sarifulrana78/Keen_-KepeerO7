'use client';

import { TimelineEntry } from '@/types';

const STORAGE_KEY = 'keenkeeper_timeline';

export function getTimeline(): TimelineEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addTimelineEntry(entry: TimelineEntry): void {
  if (typeof window === 'undefined') return;
  const existing = getTimeline();
  const updated = [entry, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('timeline-updated'));
}

export function clearTimeline(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
