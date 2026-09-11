import { createContext, useContext, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import translations from '../data/translations';

const LanguageContext = createContext(null);

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
];

const DASHBOARD_PREFIX = '/dashboard';

function isDashboardRoute(pathname) {
  return pathname === DASHBOARD_PREFIX || pathname.startsWith(DASHBOARD_PREFIX + '/');
}

export function LanguageProvider({ children }) {
  const location = useLocation();
  const onDashboard = isDashboardRoute(location.pathname);

  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('site_language');
    return saved || 'en';
  });

  const setLanguage = (code) => {
    setLanguageState(code);
    localStorage.setItem('site_language', code);
  };

  const t = useMemo(() => {
    return (key) => {
      if (onDashboard) return key;
      if (language === 'en') return key;
      const langMap = translations[language];
      if (langMap && langMap[key]) return langMap[key];
      return key;
    };
  }, [language, onDashboard]);

  const value = useMemo(
    () => ({ language, setLanguage, t, languages: LANGUAGES, onDashboard }),
    [language, t, onDashboard]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
