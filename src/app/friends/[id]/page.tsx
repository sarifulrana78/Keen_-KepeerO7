'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Phone, MessageSquare, Video, Clock, Bell, Archive, Trash2, Target, Calendar, Edit2 } from 'lucide-react';
import { Friend, InteractionType, TimelineEntry } from '@/types';
import { addTimelineEntry } from '@/lib/timelineStore';

const statusConfig = {
  'overdue': { label: 'Overdue', bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  'almost due': { label: 'Almost Due', bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  'on-track': { label: 'On Track', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
};

const checkInButtons: { type: InteractionType; icon: typeof Phone; label: string; color: string }[] = [
  { type: 'Call', icon: Phone, label: 'Call', color: '#1a6b5a' },
  { type: 'Text', icon: MessageSquare, label: 'Text', color: '#6366f1' },
  { type: 'Video', icon: Video, label: 'Video', color: '#0ea5e9' },
];

const toastMessages: Record<InteractionType, string> = {
  Call: '📞 Call logged!',
  Text: '💬 Text logged!',
  Video: '🎥 Video call logged!',
};

export default function FriendDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [friend, setFriend] = useState<Friend | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await import('@/data/friends.json');
      const found = (data.default as Friend[]).find((f) => f.id === Number(id));
      setFriend(found ?? null);
      setLoading(false);
    }
    load();
  }, [id]);

  const handleCheckIn = (type: InteractionType) => {
    if (!friend) return;
    const entry: TimelineEntry = {
      id: `${Date.now()}-${Math.random()}`,
      friendId: friend.id,
      friendName: friend.name,
      type,
      date: new Date().toISOString(),
      title: `${type} with ${friend.name}`,
    };
    addTimelineEntry(entry);
    toast.success(toastMessages[type]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: '#e8f5f1', borderTopColor: '#1a6b5a' }} />
      </div>
    );
  }

  if (!friend) return notFound();

  const status = statusConfig[friend.status];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ===== LEFT COLUMN ===== */}
        <div className="lg:col-span-1 space-y-5">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 text-center">
            <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-slate-50">
              <Image
                src={friend.picture}
                alt={friend.name}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">{friend.name}</h1>

            <div className="flex flex-col items-center gap-2 mb-4">
              <span className="inline-flex items-center justify-center rounded-full px-3.5 py-1.5 text-sm font-semibold text-white bg-red-500">
                {status.label}
              </span>
              <span className="inline-flex items-center justify-center rounded-full px-3.5 py-1.5 text-sm font-semibold text-[#14532d] bg-emerald-100 uppercase tracking-[0.18em]">
                {friend.tags[0] ?? 'Friend'}
              </span>
            </div>

            <p className="text-sm text-slate-500 italic leading-relaxed mb-4">"{friend.bio}"</p>
            <p className="text-xs text-slate-400 uppercase tracking-[0.18em] mb-2">Preferred: email</p>
            <a href={`mailto:${friend.email}`} className="text-sm font-semibold text-[#1a6b5a] hover:underline break-all">{friend.email}</a>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 space-y-3">
            <button className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
              <Bell size={16} className="inline-block mr-2 text-slate-600" />
              Snooze 2 Weeks
            </button>
            <button className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
              <Archive size={16} className="inline-block mr-2 text-slate-600" />
              Archive
            </button>
            <button className="w-full rounded-xl border border-red-100 bg-white px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition">
              <Trash2 size={16} className="inline-block mr-2" />
              Delete
            </button>
          </div>
        </div>

        {/* ===== RIGHT COLUMN ===== */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 text-center shadow-sm">
              <p className="text-4xl font-bold text-slate-900 mb-2">{friend.days_since_contact}</p>
              <p className="text-sm text-slate-500">Days Since Contact</p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 p-6 text-center shadow-sm">
              <p className="text-4xl font-bold text-slate-900 mb-2">{friend.goal}</p>
              <p className="text-sm text-slate-500">Goal (Days)</p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 p-6 text-center shadow-sm">
              <p className="text-2xl font-bold text-slate-900 mb-2">
                {new Date(friend.next_due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <p className="text-sm text-slate-500">Next Due</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Relationship Goal</h2>
              <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
                <Edit2 size={16} className="inline-block mr-2" />
                Edit
              </button>
            </div>
            <p className="text-sm text-slate-600">
              Connect every <span className="font-semibold text-slate-900">{friend.goal} days</span>
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-5">Quick Check-In</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {checkInButtons.map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  onClick={() => handleCheckIn(type)}
                  className="flex flex-col items-center justify-center gap-3 rounded-[20px] border border-slate-100 bg-slate-50 px-4 py-6 text-slate-900 hover:bg-white hover:shadow-sm transition"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                    <Icon size={24} className="text-slate-900" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-semibold">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
