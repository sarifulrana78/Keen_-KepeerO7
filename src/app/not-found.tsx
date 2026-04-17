import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="mb-6">
        <span className="text-8xl font-black text-gray-100 select-none">404</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
      <p className="text-gray-500 max-w-sm mb-8">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        style={{ background: 'linear-gradient(135deg, #1a6b5a, #2d9b84)' }}
      >
        <Home size={18} />
        Back to Home
      </Link>
    </div>
  );
}
