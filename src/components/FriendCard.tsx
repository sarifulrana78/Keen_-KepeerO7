'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Friend } from '@/types';
import { Clock } from 'lucide-react';

interface Props {
  friend: Friend;
}

const statusConfig = {
  'overdue': { label: 'Overdue', bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  'almost due': { label: 'Almost Due', bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  'on-track': { label: 'On Track', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
};

export default function FriendCard({ friend }: Props) {
  const status = statusConfig[friend.status];

  return (
    <Link href={`/friends/${friend.id}`} className="block group">
      <div className="bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer">
        {/* Avatar */}
        <div className="flex justify-center mb-3">
          <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-100 group-hover:ring-green-300 transition-all duration-200">
            <Image
              src={friend.picture}
              alt={friend.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        </div>

        {/* Name */}
        <h3 className="font-bold text-gray-900 text-base mb-1">{friend.name}</h3>

        {/* Days since contact */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-gray-400 mb-4">
          <Clock size={12} />
          <span>{friend.days_since_contact}d ago</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
          {friend.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Status badge */}
        <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${status.bg} ${status.text}`}>
          {status.label}
        </div>
      </div>
    </Link>
  );
}
