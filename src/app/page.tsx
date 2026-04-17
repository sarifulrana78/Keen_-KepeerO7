'use client';

import { useEffect, useState } from 'react';
import { Plus, Users, CheckCircle, AlertCircle, Activity } from 'lucide-react';
import FriendCard from '@/components/FriendCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Friend } from '@/types';

export default function HomePage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async fetch for loading animation
    const timer = setTimeout(async () => {
      const data = await import('@/data/friends.json');
      setFriends(data.default as Friend[]);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const totalFriends = friends.length;
  const onTrack = friends.filter((f) => f.status === 'on-track').length;
  const needAttention = friends.filter((f) => f.status === 'overdue' || f.status === 'almost due').length;
  const interactionsThisMonth = 12; // static demo value

  const summaryCards = [
    { label: 'Total Friends', value: totalFriends, icon: Users, color: '#1a6b5a' },
    { label: 'On Track', value: onTrack, icon: CheckCircle, color: '#22c55e' },
    { label: 'Need Attention', value: needAttention, icon: AlertCircle, color: '#f97316' },
    { label: 'Interactions This Month', value: interactionsThisMonth, icon: Activity, color: '#6366f1' },
  ];

  return (
    <div>
      {/* Banner */}
      <section className="relative py-24 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Friends to keep close <span className="block mt-2">in your life</span>
          </h1>
          <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
          <button
            className="inline-flex items-center gap-2 px-8 py-3.5 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            style={{ backgroundColor: '#1a3a33' }}
          >
            <Plus size={20} />
            Add a Friend
          </button>

          {/* Summary Cards */}
          {!loading && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
              {summaryCards.map(({ label, value, color }) => (
                <div key={label} className="bg-white rounded-xl py-10 px-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <p className="text-4xl font-black text-gray-900 mb-3">{value}</p>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Friends Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Friends</h2>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
