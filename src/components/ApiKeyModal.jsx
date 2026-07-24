import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, Check, Sparkles, ExternalLink } from 'lucide-react';
import { getGeminiApiKey, setGeminiApiKey } from '../services/aiGameService';

export default function ApiKeyModal({ isOpen, onClose }) {
  const [key, setKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setKey(getGeminiApiKey());
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setGeminiApiKey(key);
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setGeminiApiKey('');
    setKey('');
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-md bg-navy-950 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative"
          style={{ background: 'rgba(6, 15, 40, 0.98)' }}
          onClick={(e) => e.stopPropagation()}
          dir="rtl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">مفتاح الذكاء الاصطناعي</h3>
              <p className="text-xs text-slate-400 mt-0.5">Google Gemini API Key</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-5">
            ربط البحث بمفتاح Gemini API الخاص بك يمنحك قدرة فورية على تحليل أي لعبة جديدة موجودة على الإنترنت واستخراج محاذير السلامة للأطفال.
          </p>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                مفتاح API الخاص بك:
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all dir-ltr"
                />
                <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              </div>
            </div>

            {saved && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2"
              >
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>تم حفظ إعدادات المفتاح بنجاح!</span>
              </motion.div>
            )}

            <div className="flex items-center justify-between gap-3 pt-2">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>احصل على مفتاح مجاني من Google</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                {key && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-3 py-2 rounded-xl text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                  >
                    مسح
                  </button>
                )}
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-lg transition-all"
                >
                  حفظ المفتاح
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
