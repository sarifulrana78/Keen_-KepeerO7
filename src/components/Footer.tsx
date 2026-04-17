import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1f4f41] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-4">
              KeenKeeper
            </h2>
            <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-[0.3em] mb-6">
              Social Links
            </h3>
            <div className="flex items-center justify-center gap-4">
              <a href="#" className="w-11 h-11 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-110 shadow-lg">
                <svg className="w-5 h-5 text-[#1f4f41]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                </svg>
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-110 shadow-lg">
                <svg className="w-5 h-5 text-[#1f4f41]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-110 shadow-lg">
                <svg className="w-5 h-5 text-[#1f4f41]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <p>© 2026 KeenKeeper. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
