import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch, size = 'large' }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  const isLarge = size === 'large';

  return (
    <form onSubmit={handleSubmit} dir="ltr"
      className={`search-glow w-full max-w-2xl mx-auto flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 ${isLarge ? 'p-2 sm:p-3' : 'p-2'}`}>
      <button type="submit"
        className={`flex-shrink-0 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${isLarge ? 'px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base min-w-[48px] sm:min-w-0' : 'px-5 py-2.5 text-sm'}`}
        id="game-search-button">
        <Search className={`${isLarge ? 'w-5 h-5' : 'w-4 h-4'} flex-shrink-0`} />
        <span className="hidden sm:inline">ابحث</span>
      </button>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
        placeholder={isLarge ? "ابحث عن لعبة... (مثال: Roblox, PUBG, Minecraft)" : "ابحث عن لعبة..."}
        dir="rtl"
        className={`flex-1 min-w-0 bg-transparent outline-none text-white placeholder-slate-400 px-2 sm:px-3 text-right ${isLarge ? 'text-sm sm:text-lg py-2' : 'text-sm py-1'}`}
        id="game-search-input" />
    </form>
  );
}
