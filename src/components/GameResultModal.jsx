import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, ShieldAlert, ShieldX, CheckCircle, AlertTriangle, XCircle, Sparkles } from 'lucide-react';

const safetyConfig = {
  safe: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', label: 'آمنة', Icon: ShieldCheck },
  caution: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', label: 'تحتاج حذر', Icon: ShieldAlert },
  danger: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', label: 'خطرة', Icon: ShieldX },
};

const riskLevelConfig = {
  safe: { color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', Icon: CheckCircle, label: 'آمن' },
  caution: { color: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30', Icon: AlertTriangle, label: 'حذر' },
  danger: { color: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30', Icon: XCircle, label: 'خطر' },
};

const riskLabels = {
  privacy: '🛡️ الخصوصية',
  strangers: '👥 التواصل مع الغرباء',
  money: '💳 الأموال',
  addiction: '⏰ الإدمان والمحتوى',
};

export default function GameResultModal({ game, onClose }) {
  if (!game) return null;
  const safety = safetyConfig[game.overallSafety] || safetyConfig['caution'];

  // Lock body scroll when modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        id="game-result-modal"
      >
        <div 
          className="h-full flex items-start justify-center px-5 sm:px-8"
          dir="rtl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl my-10 sm:my-16 rounded-3xl border border-white/10 max-h-[calc(100vh-5rem)] overflow-y-auto modal-scroll"
            style={{ background: 'rgba(6, 15, 40, 0.95)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`relative p-6 sm:p-8 border-b ${safety.border} ${safety.bg} rounded-t-3xl`}>
              <button
                onClick={onClose}
                className="absolute top-4 left-4 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4" style={{ paddingLeft: '48px' }}>
                <span className="text-4xl sm:text-5xl flex-shrink-0">{game.icon}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">{game.name}</h2>
                  <p className="text-slate-400 text-xs sm:text-sm mt-0.5">{game.nameAr} • التصنيف العمري: {game.ageRating}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full ${safety.bg} border ${safety.border} text-sm font-bold ${safety.color}`}>
                  <safety.Icon className="w-4 h-4" />
                  {safety.label}
                </span>

                {game.isAiGenerated && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>تم التحليل بالذكاء الاصطناعي</span>
                  </span>
                )}
              </div>
              <p className="text-slate-300 mt-4 text-xs sm:text-sm leading-relaxed">{game.description}</p>
            </div>


            {/* Risk Details */}
            <div className="p-5 sm:p-8 space-y-5">
              <h3 className="text-lg sm:text-xl font-bold text-white">تحليل المخاطر التفصيلي</h3>
              {Object.entries(game.risks).map(([key, risk]) => {
                const rlc = riskLevelConfig[risk.level];
                return (
                  <div key={key} className="rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:p-5">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="font-semibold text-white text-sm flex-1">{riskLabels[key]}</span>
                      <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${rlc.bg} ${rlc.border} ${rlc.color} font-bold`}>
                        <rlc.Icon className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{rlc.label}</span>
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm mb-3 leading-relaxed">{risk.details}</p>
                    <div className="space-y-2 bg-blue-500/5 rounded-lg p-3">
                      <p className="text-xs font-semibold text-blue-400">💡 نصائح للأبوين:</p>
                      {risk.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                          <span className="leading-relaxed">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
