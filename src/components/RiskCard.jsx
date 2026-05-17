import { motion } from 'framer-motion';

const iconMap = {
  privacy: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  strangers: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197" />
    </svg>
  ),
  money: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  ),
  addiction: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const colorMap = {
  privacy: { bg: 'from-blue-500/20 to-blue-600/5', border: 'border-blue-500/20', icon: 'text-blue-400', hover: 'hover:border-blue-500/40' },
  strangers: { bg: 'from-red-500/20 to-red-600/5', border: 'border-red-500/20', icon: 'text-red-400', hover: 'hover:border-red-500/40' },
  money: { bg: 'from-amber-500/20 to-amber-600/5', border: 'border-amber-500/20', icon: 'text-amber-400', hover: 'hover:border-amber-500/40' },
  addiction: { bg: 'from-purple-500/20 to-purple-600/5', border: 'border-purple-500/20', icon: 'text-purple-400', hover: 'hover:border-purple-500/40' },
};

const titles = {
  privacy: 'مخاطر الخصوصية وتسريب البيانات',
  strangers: 'التواصل مع الغرباء والاستدراج',
  money: 'استنزاف الأموال والدفع العشوائي',
  addiction: 'الإدمان الرقمي والمحتوى غير الملائم',
};

const descriptions = {
  privacy: 'تجمع كثير من الألعاب بيانات حساسة عن أطفالك مثل الموقع والعمر وجهات الاتصال، وقد تتعرض للتسريب أو الاستغلال.',
  strangers: 'الدردشة المفتوحة والرسائل الخاصة تعرض طفلك لمخاطر التحرش والاستدراج الرقمي من أشخاص مجهولين.',
  money: 'العملات الافتراضية والصناديق العشوائية تُغري الأطفال بإنفاق مبالغ كبيرة من بطاقاتك دون علمك.',
  addiction: 'التصميم المدمن للألعاب يستهلك وقت طفلك ويعرّضه لمحتوى عنيف أو غير لائق.',
};

export default function RiskCard({ type, index }) {
  const colors = colorMap[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`group glass-card rounded-2xl p-6 sm:p-8 border ${colors.border} ${colors.hover} transition-all duration-500 hover:translate-y-[-4px] hover:shadow-xl cursor-default`}
      id={`risk-card-${type}`}
    >
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center ${colors.icon} mb-5 group-hover:scale-110 transition-transform duration-300`}>
        {iconMap[type]}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{titles[type]}</h3>
      <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{descriptions[type]}</p>
    </motion.div>
  );
}
