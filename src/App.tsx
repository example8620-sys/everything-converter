import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Language, Theme } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HistoryDrawer } from './components/HistoryDrawer';
import { OfflineIndicator } from './components/OfflineIndicator';

// Pages
import { HomePage } from './pages/HomePage';
import { ToolPage } from './pages/ToolPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('everything_converter_lang');
    return saved === 'hi' ? 'hi' : 'en';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('everything_converter_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  // Apply dark mode class to root html element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('everything_converter_theme', theme);
  }, [theme]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('everything_converter_lang', lang);
  }, [lang]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 selection:bg-blue-500 selection:text-white">
        <OfflineIndicator lang={lang} />

        <Navbar
          lang={lang}
          theme={theme}
          onToggleLang={toggleLang}
          onToggleTheme={toggleTheme}
          onOpenHistory={() => setIsHistoryOpen(true)}
        />

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage lang={lang} />} />
            <Route path="/about" element={<AboutPage lang={lang} />} />
            <Route path="/privacy" element={<PrivacyPage lang={lang} />} />
            <Route path="/terms" element={<TermsPage lang={lang} />} />
            <Route path="/contact" element={<ContactPage lang={lang} />} />
            <Route path="/:slug" element={<ToolPage lang={lang} />} />
            <Route path="*" element={<NotFoundPage lang={lang} />} />
          </Routes>
        </main>

        <Footer lang={lang} />

        <HistoryDrawer
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          lang={lang}
        />
      </div>
    </BrowserRouter>
  );
}
