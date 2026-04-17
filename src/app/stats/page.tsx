'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, Sector } from 'recharts';
import { TimelineEntry, InteractionType } from '@/types';
import { getTimeline } from '@/lib/timelineStore';
import { Phone, MessageSquare, Video } from 'lucide-react';

const COLORS: Record<InteractionType, string> = {
  Call: '#1a6b5a',
  Text: '#6366f1',
  Video: '#0ea5e9',
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

  const renderCustomLabel = (props: any) => {
    const { x, y, percent } = props;
    return (
      <text x={x} y={y} fill="#ffffff" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={700}>
        {percent ? `${Math.round(percent * 100)}%` : ''}
      </text>
    );
  };

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;

    const midAngle = (startAngle + endAngle) / 2;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const ex = cx + (outerRadius + 30) * cos;
    const ey = cy + (outerRadius + 30) * sin;
    const mx = cx + (outerRadius + 50) * cos;
    const my = cy + (outerRadius + 50) * sin;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 12}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={1}
        />
        <path d={`M${sx},${sy}L${ex},${ey}L${mx},${my}`} stroke={fill} fill="none" strokeWidth={2} />
        <circle cx={mx} cy={my} r={6} fill={fill} stroke="white" strokeWidth={2} />
        <rect x={mx + 12} y={my - 36} width={76} height={56} rx={6} fill="white" stroke={fill} strokeWidth={1.5} />
        <text x={mx + 50} y={my - 16} textAnchor="middle" fill="#1a1a2e" fontSize={13} fontWeight={700}>
          {payload.name} : {value}
        </text>
        <text x={mx + 50} y={my + 4} textAnchor="middle" fill="#64748b" fontSize={11} fontWeight={600}>
          {Math.round(percent * 100)}%
        </text>
      </g>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 text-center mb-16">Friendship Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
          <p className="text-4xl font-bold text-slate-900">{counts.Call}</p>
          <p className="mt-3 text-sm text-slate-500">Total Calls</p>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
          <p className="text-4xl font-bold text-slate-900">{counts.Text}</p>
          <p className="mt-3 text-sm text-slate-500">Total Texts</p>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
          <p className="text-4xl font-bold text-slate-900">{counts.Video}</p>
          <p className="mt-3 text-sm text-slate-500">Total Videos</p>
        </div>
      </div>

      {/* Chart Card */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-xl p-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-base font-semibold text-slate-600 text-center mb-12">By Interaction Type</p>

          {total === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-5 rounded-full border-8 border-slate-100 flex items-center justify-center">
                <span className="text-4xl">📊</span>
              </div>
              <p className="text-slate-700 font-semibold mb-2">No interactions recorded yet.</p>
              <p className="text-slate-400 text-sm">Log calls, texts, or videos from a friend's page to see analytics.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-12">
              <div className="w-full h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={78}
                      outerRadius={130}
                      paddingAngle={4}
                      dataKey="value"
                      cornerRadius={24}
                      label={renderCustomLabel}
                      labelLine={false}
                      activeIndex={activeIndex ?? undefined}
                      activeShape={renderActiveShape}
                      onMouseEnter={(_, index) => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      {chartData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={COLORS[entry.name as InteractionType]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string) => [`${value} interaction${value !== 1 ? 's' : ''}`, name]}
                      contentStyle={{ borderRadius: '12px', border: '1px solid #f0f0f0', fontSize: '13px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm font-semibold text-slate-700">
                {(['Text', 'Call', 'Video'] as InteractionType[]).map((type) => (
                  <div key={type} className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[type] }} />
                    <span>{type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
