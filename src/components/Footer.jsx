import { Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-navy-950/80">
      <div className="section-container py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">صمام الأمان</h3>
                <p className="text-xs text-blue-400">SafeGaming</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              منصة مستقلة تهدف لحماية أطفالنا من مخاطر الألعاب الإلكترونية من خلال التوعية والتحليل.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {[
                { href: '#hero', label: 'الرئيسية' },
                { href: '#about', label: 'من نحن' },
                { href: '#risks', label: 'المخاطر' },
                { href: '#search', label: 'ابحث عن لعبة' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">تواصل معنا</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              لديك اقتراح أو تريد إضافة لعبة جديدة؟ تواصل معنا عبر البريد الإلكتروني.
            </p>
            <a href="mailto:info@safegaming.com" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
              info@safegaming.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center sm:text-right">
            © {new Date().getFullYear()} صمام الأمان - SafeGaming. جميع الحقوق محفوظة.
          </p>
          <p className="text-slate-500 text-xs flex items-center gap-1">
            صُنع بـ <Heart className="w-3 h-3 text-red-400 fill-red-400" /> لحماية أطفالنا
          </p>
        </div>
      </div>
    </footer>
  );
}
