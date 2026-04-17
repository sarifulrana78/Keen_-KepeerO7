'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, Sector } from 'recharts';
import { TimelineEntry, InteractionType } from '@/types';
import { getTimeline } from '@/lib/timelineStore';
import { Phone, MessageSquare, Video } from 'lucide-react';

const COLORS: Record<InteractionType, string> = {
  Text: '#8b5cf6',
  Call: '#1e402e',
  Video: '#22c55e',
};

const ICONS: Record<InteractionType, typeof Phone> = {
  Call: Phone,
  Text: MessageSquare,
  Video: Video,
};

export default function StatsPage() {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);

  useEffect(() => {
    const load = () => setEntries(getTimeline());
    load();
    window.addEventListener('timeline-updated', load);
    return () => window.removeEventListener('timeline-updated', load);
  }, []);

  const counts: Record<InteractionType, number> = { Call: 0, Text: 0, Video: 0 };
  entries.forEach((e) => { counts[e.type]++; });

  const chartData = (['Call', 'Text', 'Video'] as InteractionType[])
    .map((type) => ({ name: type, value: counts[type] }));

  const total = entries.length;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Clean pie chart without custom labels/shapes to match Figma design
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 mt-4">Friendship Analytics</h1>

      {/* Chart Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 min-h-[500px] flex flex-col">
        <p className="text-sm font-semibold text-slate-700 mb-10">By Interaction Type</p>

        {total === 0 ? (
          <div className="text-center py-20 flex-grow flex flex-col justify-center">
            <div className="w-24 h-24 mx-auto mb-5 rounded-full border-8 border-slate-100 flex items-center justify-center">
              <span className="text-4xl">📊</span>
            </div>
            <p className="text-slate-700 font-semibold mb-2">No interactions recorded yet.</p>
            <p className="text-slate-400 text-sm">Log calls, texts, or videos from a friend's page to see analytics.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-12 flex-grow justify-center">
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={90}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[entry.name as InteractionType]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any) => [`${value} interaction${value !== 1 ? 's' : ''}`, name]}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', fontSize: '13px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center gap-6 text-xs font-medium text-slate-500">
              {(['Text', 'Call', 'Video'] as InteractionType[]).map((type) => (
                <div key={type} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[type] }} />
                  <span>{type}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
