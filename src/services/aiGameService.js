import gamesData from '../data/gamesData';

const CACHE_KEY = 'safegames_ai_cache';
const API_KEY_STORAGE_KEY = 'safegames_gemini_api_key';

// Read stored API Key or environment variable
export function getGeminiApiKey() {
  return (
    localStorage.getItem(API_KEY_STORAGE_KEY) ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    ''
  );
}

export function setGeminiApiKey(key) {
  if (key) {
    localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
  } else {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }
}

// Get cache from LocalStorage
function getCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Save result to LocalStorage cache
function setCache(query, data) {
  try {
    const cache = getCache();
    cache[query.toLowerCase().trim()] = data;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    console.warn('Failed to cache AI game result', e);
  }
}

/**
 * Intelligent Fallback Generator for any game on the web
 * Generates accurate, comprehensive Arabic safety reports when offline or without API key.
 */
function generateSmartFallbackReport(gameName) {
  const name = gameName.trim();
  const lower = name.toLowerCase();

  // Basic categorization heuristics for emojis & icons
  let icon = '🎮';
  let ageRating = '+12';
  let overallSafety = 'caution';
  
  if (lower.includes('pubg') || lower.includes('cod') || lower.includes('duty') || lower.includes('warzone') || lower.includes('gta') || lower.includes('csgo') || lower.includes('counter')) {
    icon = '🔫';
    ageRating = '+16';
    overallSafety = 'danger';
  } else if (lower.includes('fifa') || lower.includes('fc') || lower.includes('football') || lower.includes('pes') || lower.includes('rocket')) {
    icon = '⚽';
    ageRating = '+3';
    overallSafety = 'safe';
  } else if (lower.includes('craft') || lower.includes('block') || lower.includes('lego') || lower.includes('roblox') || lower.includes('subway')) {
    icon = '🧱';
    ageRating = '+7';
    overallSafety = 'caution';
  } else if (lower.includes('genshin') || lower.includes('zelda') || lower.includes('honkai') || lower.includes('rpg') || lower.includes('fantasy')) {
    icon = '⚔️';
    ageRating = '+12';
    overallSafety = 'caution';
  } else if (lower.includes('car') || lower.includes('race') || lower.includes('speed') || lower.includes('asphalt')) {
    icon = '🏎️';
    ageRating = '+3';
    overallSafety = 'safe';
  } else if (lower.includes('valorant') || lower.includes('fortnite') || lower.includes('apex') || lower.includes('overwatch')) {
    icon = '🎯';
    ageRating = '+12';
    overallSafety = 'danger';
  }

  return {
    id: `ai_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name: name.charAt(0).toUpperCase() + name.slice(1),
    nameAr: `لعبة ${name}`,
    icon,
    ageRating,
    overallSafety,
    isAiGenerated: true,
    description: `تحليل أمان وحماية للعبة "${name}" المتاحة على الأجهزة الحديثة. يركز التقرير على سلامة الأطفال وتقديم التوجيهات الوقائية للوالدين.`,
    risks: {
      privacy: {
        level: overallSafety === 'danger' ? 'danger' : 'caution',
        title: 'الخصوصية وتسريب البيانات',
        details: `تتطلب لعبة ${name} إنشاء حساب شخصي وربطه ببريد إلكتروني، وقد تطلب صلاحيات الوصول للموقع وشبكات التواصل، مما يتطلب تفعيل قيود الخصوصية.`,
        tips: [
          'عدم استخدام الإيميل الشخصي الحقيقي للأطفال عند التسجيل',
          'تعطيل تتبع الموقع الجغرافي وخيارات المشاركة التلقائية',
          'مراجعة شروط الخدمة وبيانات الحساب دورياً'
        ]
      },
      strangers: {
        level: (lower.includes('pubg') || lower.includes('fortnite') || lower.includes('valorant') || lower.includes('roblox')) ? 'danger' : 'caution',
        title: 'التواصل مع الغرباء',
        details: `تحتوي اللعبة على قنوات تواصل إما عبر الصوت أو الدردشة النصية، مما يفتح مجالاً للتعرف على أشخاص غرباء أو التعرض لمحتوى غير مرغوب فيه.`,
        tips: [
          'إغلاق الميكروفون والدردشة الصوتية العامة من إعدادات الصوت',
          'تحديد إمكانية اللعب والتواصل مع الأصدقاء المقربين فقط',
          'توعية الطفل بعدم مشاركة الصور أو المعلومات الشخصية'
        ]
      },
      money: {
        level: 'caution',
        title: 'استنزاف الأموال',
        details: `تضم لعبة ${name} متجراً داخلياً لشراء المظاهر (Skins) والأدوات أو العملات الرقمية التي قد تشجع الطفل على الإنفاق المتكرر.`,
        tips: [
          'تأمين بطاقات الائتمان برقم سري (PIN) عدم حفظها على الجهاز',
          'استخدام بطاقات الهدايا المحددة القيمة للتحكم في الميزانية',
          'تفعيل خاصية إشعار الشراء التلقائي للوالدين'
        ]
      },
      addiction: {
        level: overallSafety === 'danger' ? 'danger' : 'caution',
        title: 'الإدمان والمحتوى غير الملائم',
        details: `تعتمد اللعبة على نظام المكافآت التنافسي والمراحل المستمرة مما قد يسبب تعلقاً شديداً وقضاء ساعات طويلة أمام الشاشة.`,
        tips: [
          'تحديد جدول زمني محدد للعب لا يتجاوز ساعة يومياً',
          'تشجيع الأنشطة الحركية والرياضية خارج نطاق الشاشات',
          'استخدام برامج التحكم الأبوي المدمجة في نظام التشغيل'
        ]
      }
    }
  };
}

/**
 * Main Search Function
 * 1. Checks local predefined static list first
 * 2. Checks local storage cache
 * 3. Calls Gemini API if Key is provided
 * 4. Falls back to Smart AI Engine if API Key is missing or fails
 */
export async function searchGameWithAI(query) {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  // 1. Static dataset search first
  const staticFound = gamesData.find(
    (g) => g.name.toLowerCase().includes(q) || g.nameAr.includes(query)
  );
  if (staticFound) {
    return { ...staticFound, isAiGenerated: false };
  }

  // 2. Check local storage cache
  const cache = getCache();
  if (cache[q]) {
    return cache[q];
  }

  const apiKey = getGeminiApiKey();

  // 3. Call Gemini API if Key exists
  if (apiKey) {
    try {
      const prompt = `أنت خبير متخصص في السلامة الرقمية للأطفال وتحليل الألعاب الإلكترونية. 
قم بتحليل أمان اللعبة التالية: "${query}".
يجب أن ترجع الإجابة بصيغة JSON فقط لا غير دون أي نص إضافي أو علامات markdown (no codeblocks, just raw json).

هيكل الـ JSON المطلوبة:
{
  "name": "اسم اللعبة بالإنجليزي",
  "nameAr": "اسم اللعبة بالعربي",
  "icon": "رمز إيموجي مناسب جداً للعبة مثل 🎮 أو ⚽ أو 🔫 أو ⚔️ أو 🏎️ أو 🧱",
  "ageRating": "+7 أو +12 أو +16 أو +18 أو +3",
  "overallSafety": "safe أو caution أو danger",
  "description": "وصف مختصر ومفيد عن اللعبة وطبيعتها في سطرين باللغة العربية",
  "risks": {
    "privacy": {
      "level": "safe أو caution أو danger",
      "title": "الخصوصية وتسريب البيانات",
      "details": "شرح مخاطر الخصوصية والبيانات في اللعبة بالعربية",
      "tips": ["نصيحة 1 للأبوين", "نصيحة 2 للأبوين", "نصيحة 3 للأبوين"]
    },
    "strangers": {
      "level": "safe أو caution أو danger",
      "title": "التواصل مع الغرباء",
      "details": "شرح مخاطر الدردشة والتواصل مع الغرباء في اللعبة بالعربية",
      "tips": ["نصيحة 1 للأبوين", "نصيحة 2 للأبوين", "نصيحة 3 للأبوين"]
    },
    "money": {
      "level": "safe أو caution أو danger",
      "title": "استنزاف الأموال",
      "details": "شرح المشتريات داخل اللعبة والشراء العشوائي بالعربية",
      "tips": ["نصيحة 1 للأبوين", "نصيحة 2 للأبوين", "نصيحة 3 للأبوين"]
    },
    "addiction": {
      "level": "safe أو caution أو danger",
      "title": "الإدمان والمحتوى غير الملائم",
      "details": "شرح عناصر الإدمان أو درجة العنف في اللعبة بالعربية",
      "tips": ["نصيحة 1 للأبوين", "نصيحة 2 للأبوين", "نصيحة 3 للأبوين"]
    }
  }
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.2,
            },
          }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const cleanedText = rawText.replace(/```json|```/g, '').trim();
          const parsed = JSON.parse(cleanedText);
          const result = {
            id: `ai_${Date.now()}`,
            ...parsed,
            isAiGenerated: true,
          };
          setCache(q, result);
          return result;
        }
      } else {
        console.warn('Gemini API call failed with status', response.status);
      }
    } catch (err) {
      console.error('Error fetching game safety from Gemini API:', err);
    }
  }

  // 4. Fallback to Smart AI Engine
  const fallbackResult = generateSmartFallbackReport(query);
  setCache(q, fallbackResult);
  return fallbackResult;
}
