import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import RiskCard from './components/RiskCard';
import GameResultModal from './components/GameResultModal';
import Footer from './components/Footer';
import gamesData from './data/gamesData';

function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (query) => {
    setNotFound(false);
    const q = query.toLowerCase();
    const found = gamesData.find(
      (g) => g.name.toLowerCase().includes(q) || g.nameAr.includes(query)
    );
    if (found) {
      setSelectedGame(found);
      setNotFound(false);
    } else {
      setSelectedGame(null);
      setNotFound(true);
    }
  };

  const safetyColors = {
    safe: 'border-emerald-500/30 hover:bg-emerald-500/5',
    caution: 'border-amber-500/30 hover:bg-amber-500/5',
    danger: 'border-red-500/30 hover:bg-red-500/5',
  };
  const dotColors = { safe: 'bg-emerald-500', caution: 'bg-amber-500', danger: 'bg-red-500' };

  return (
    <div className="min-h-screen font-tajawal w-full max-w-full">
      <Header />

      {/* ===== Hero Section ===== */}
      <section id="hero" className="relative hero-gradient" style={{ paddingTop: '150px', paddingBottom: '100px' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-[10%] w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 left-[15%] w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="section-container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>منصة حماية رقمية للأطفال</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
              احمِ أطفالك في
              <span className="gradient-text block mt-2">عالم الألعاب الرقمية</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed text-center">
              ابحث عن أي لعبة واكتشف مستوى أمانها. نساعدك على فهم المخاطر واتخاذ القرار الصحيح لحماية أبنائك.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center">
            <SearchBar onSearch={handleSearch} />
            {notFound && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="mt-5 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm" id="not-found-message">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span>هذه اللعبة غير مسجلة لدينا حالياً، سيقوم فريقنا بفحصها قريباً.</span>
              </motion.div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-slate-500 text-sm">جرّب البحث عن:</span>
            {gamesData.slice(0, 4).map((g) => (
              <button key={g.id} onClick={() => handleSearch(g.name)}
                className="px-3 py-1.5 rounded-full text-xs bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/10 transition-all cursor-pointer">
                {g.icon} {g.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-l from-transparent via-blue-500/20 to-transparent" />

      {/* ===== About Section ===== */}
      <section id="about" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="section-container text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}>
            <span className="text-blue-400 text-sm font-semibold tracking-wider mb-3 block">من نحن</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-8">
              منصة <span className="gradient-text">مستقلة وموثوقة</span>
            </h2>
            <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/5">
              <p className="text-slate-300 text-sm sm:text-base leading-loose">
                <strong className="text-white">صمام الأمان</strong> هي منصة مستقلة متخصصة في تحليل مستوى أمان الألعاب الإلكترونية
                ومساعدة الآباء والأمهات على اتخاذ قرارات مستنيرة بشأن ما يلعبه أطفالهم. نقوم بتحليل كل لعبة من
                أربعة محاور أساسية: الخصوصية، التواصل مع الغرباء، المخاطر المالية، والإدمان الرقمي.
              </p>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { num: '26+', label: 'لعبة تم تحليلها' },
                  { num: '4', label: 'محاور تقييم' },
                  { num: '100%', label: 'مجاني ومستقل' },
                  { num: '24/7', label: 'متاح دائماً' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-2">
                    <div className="text-xl sm:text-2xl font-black gradient-text">{stat.num}</div>
                    <div className="text-slate-400 text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-l from-transparent via-red-500/20 to-transparent" />

      {/* ===== Risks Section ===== */}
      <section id="risks" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="text-center mb-10">
            <span className="text-red-400 text-sm font-semibold tracking-wider mb-3 block">تعرّف على المخاطر</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
              مخاطر يجب أن <span className="text-red-400">تعرفها</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              أربعة محاور أساسية نقيّم من خلالها كل لعبة لحماية أطفالك
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {['privacy', 'strangers', 'money', 'addiction'].map((type, i) => (
              <RiskCard key={type} type={type} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-l from-transparent via-emerald-500/20 to-transparent" />

      {/* ===== Search Section ===== */}
      <section id="search" style={{ paddingTop: '80px', paddingBottom: '100px' }}>
        <div className="section-container text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
            <span className="text-emerald-400 text-sm font-semibold tracking-wider mb-3 block">ابحث الآن</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
              اكتشف مستوى أمان <span className="gradient-text">أي لعبة</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8">
              اكتب اسم اللعبة التي يلعبها طفلك واحصل على تقرير أمان شامل ونصائح عملية
            </p>
            <div className="flex justify-center w-full">
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="mt-10">
              <p className="text-slate-500 text-sm mb-5">أو اختر من الألعاب المُحلّلة</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {gamesData.map((game) => (
                  <button key={game.id} onClick={() => { setSelectedGame(game); setNotFound(false); }}
                    className={`glass-card rounded-xl p-3 sm:p-4 border ${safetyColors[game.overallSafety]} transition-all duration-300 hover:translate-y-[-2px] text-right cursor-pointer`}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl">{game.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white text-xs sm:text-sm truncate">{game.name}</div>
                        <div className="text-slate-400 text-[10px] sm:text-xs">{game.nameAr}</div>
                      </div>
                      <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${dotColors[game.overallSafety]} flex-shrink-0`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {selectedGame && <GameResultModal game={selectedGame} onClose={() => setSelectedGame(null)} />}
    </div>
  );
}

export default App;
