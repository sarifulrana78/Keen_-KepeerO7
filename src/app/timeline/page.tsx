'use client';

import { useEffect, useState } from 'react';
import { Phone, MessageSquare, Video, Clock } from 'lucide-react';
import { TimelineEntry, InteractionType } from '@/types';
import { getTimeline } from '@/lib/timelineStore';

const iconMap: Record<InteractionType, { icon: typeof Phone; color: string; bg: string }> = {
  Call: { icon: Phone, color: '#1a6b5a', bg: '#e8f5f1' },
  Text: { icon: MessageSquare, color: '#6366f1', bg: '#eef2ff' },
  Video: { icon: Video, color: '#0ea5e9', bg: '#e0f2fe' },
};

const filterOptions: { label: string; value: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'Call', value: 'Call' },
  { label: 'Text', value: 'Text' },
  { label: 'Video', value: 'Video' },
];

const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function TimelinePage() {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = () => setEntries(getTimeline());
    load();
    window.addEventListener('timeline-updated', load);
    return () => window.removeEventListener('timeline-updated', load);
  }, []);

  const filtered = entries
    .filter((e) => filter === 'all' || e.type === filter)
    .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sort === 'newest' ? -diff : diff;
    });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Timeline</h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
        >
          {filterOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label === 'All' ? 'Filter timeline' : o.label}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {filterOptions.map((o) => (
          <button
            key={o.value}
            onClick={() => setFilter(o.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === o.value
                ? 'text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
            style={filter === o.value ? { backgroundColor: '#1a6b5a' } : {}}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* Timeline List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Clock size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg font-medium">No interactions yet</p>
          <p className="text-gray-400 text-sm mt-1">Go to a friend's page and log a call, text, or video!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((entry) => {
            const meta = iconMap[entry.type];
            const Icon = meta.icon;
            return (
              <div
                key={entry.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4 hover:shadow-md transition-all duration-200"
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: meta.bg }}
                >
                  <Icon size={18} style={{ color: meta.color }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{entry.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(entry.date)}</p>
                </div>

                {/* Type badge */}
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: meta.bg, color: meta.color }}
                >
                  {entry.type}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
