import { useState } from 'react';
import { Search, Loader2, Sparkles } from 'lucide-react';

export default function SearchBar({ onSearch, size = 'large', isLoading = false }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) onSearch(query.trim());
  };

  const isLarge = size === 'large';

  return (
    <form onSubmit={handleSubmit} dir="ltr"
      className={`search-glow w-full max-w-2xl mx-auto flex items-center gap-2 rounded-2xl border ${isLoading ? 'border-blue-500/50 bg-blue-500/10' : 'border-white/10 bg-white/5'} backdrop-blur-sm transition-all duration-500 ${isLarge ? 'p-2 sm:p-3' : 'p-2'}`}>
      <button type="submit" disabled={isLoading}
        className={`flex-shrink-0 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed ${isLarge ? 'px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base min-w-[48px] sm:min-w-0' : 'px-5 py-2.5 text-sm'}`}
        id="game-search-button">
        {isLoading ? (
          <>
            <Loader2 className={`${isLarge ? 'w-5 h-5' : 'w-4 h-4'} animate-spin flex-shrink-0`} />
            <span className="hidden sm:inline">جاري التحليل...</span>
          </>
        ) : (
          <>
            <Sparkles className={`${isLarge ? 'w-5 h-5' : 'w-4 h-4'} flex-shrink-0 text-blue-200`} />
            <span className="hidden sm:inline">تحليل الذكاء الاصطناعي</span>
          </>
        )}
      </button>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} disabled={isLoading}
        placeholder={isLarge ? "ابحث عن أي لعبة... (مثال: Valorant, FC 24, Genshin Impact, Clash of Clans)" : "ابحث عن أي لعبة على الويب..."}
        dir="rtl"
        className={`flex-1 min-w-0 bg-transparent outline-none text-white placeholder-slate-400 px-2 sm:px-3 text-right ${isLarge ? 'text-sm sm:text-lg py-2' : 'text-sm py-1'}`}
        id="game-search-input" />
    </form>
  );
}

