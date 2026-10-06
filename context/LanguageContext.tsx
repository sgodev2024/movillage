'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteContent } from '@/data/content';

type Locale = 'vi' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: typeof siteContent['vi'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('vi');

  useEffect(() => {
    // Check localStorage or browser language
    const saved = localStorage.getItem('mo_village_lang') as Locale | null;
    if (saved && (saved === 'vi' || saved === 'en')) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('mo_village_lang', newLocale);
  };

  const toggleLocale = () => {
    const next = locale === 'vi' ? 'en' : 'vi';
    setLocale(next);
  };

  const t = siteContent[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
