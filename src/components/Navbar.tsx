import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Moon,
  Sun,
  Globe,
  Clock,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { Language, ToolDefinition } from '../types';
import { getTranslation } from '../translations';
import { searchTools } from '../data/toolsRegistry';
import { categories } from '../data/categories';
import { PWAInstallButton } from './PWAInstallButton';
import { DynamicIcon } from './DynamicIcon';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  lang: Language;
  onToggleLang: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenHistory: () => void;
  recentCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  lang,
  onToggleLang,
  darkMode,
  onToggleDarkMode,
  onOpenHistory,
  recentCount,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults: ToolDefinition[] = searchQuery.trim() ? searchTools(searchQuery).slice(0, 8) : [];

  // Close search on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTool = (slug: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setMobileMenuOpen(false);
    onNavigate(`/${slug}/`);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            id="brand-logo-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('/');
            }}
            className="flex items-center gap-2.5 text-left focus:outline-hidden"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white shadow-sm shadow-blue-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                Everything Converter
              </span>
              <span className="block text-[10px] font-medium text-slate-500 dark:text-slate-400">
                100+ Free Online Tools
              </span>
            </div>
          </button>
        </div>

        {/* Global Live Search Bar */}
        <div className="relative hidden md:block flex-1 max-w-md" ref={searchRef}>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder={getTranslation(lang, 'searchPlaceholder')}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 transition-all focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
            />
          </div>

          {/* Search Dropdown */}
          {isSearchOpen && searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-12 max-h-96 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              {searchResults.length > 0 ? (
                <div className="space-y-1">
                  {searchResults.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleSelectTool(tool.slug)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400">
                        <DynamicIcon name={tool.iconName} className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {lang === 'hi' ? tool.nameHi : tool.name}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {tool.category.replace('-', ' ')}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                  {lang === 'hi' ? 'कोई टूल नहीं मिला' : 'No tools found for your query'}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* PWA Install Button */}
          <PWAInstallButton lang={lang} />

          {/* History Drawer Trigger */}
          <button
            id="recent-history-btn"
            onClick={onOpenHistory}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition"
            title={getTranslation(lang, 'recentTools')}
          >
            <Clock className="h-4 w-4" />
            {recentCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white">
                {recentCount}
              </span>
            )}
          </button>

          {/* Language Toggle (EN / HI) */}
          <button
            id="lang-toggle-btn"
            onClick={onToggleLang}
            className="flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 px-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition"
            title="Switch Language / भाषा बदलें"
          >
            <Globe className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleDarkMode}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition"
            title={darkMode ? getTranslation(lang, 'lightMode') : getTranslation(lang, 'darkMode')}
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-4 md:hidden dark:border-slate-800 dark:bg-slate-900 space-y-4">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={getTranslation(lang, 'searchPlaceholder')}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>

          {searchQuery.trim() && searchResults.length > 0 && (
            <div className="max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-950">
              {searchResults.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleSelectTool(tool.slug)}
                  className="flex w-full items-center gap-2.5 rounded-lg p-2 text-left text-xs font-semibold text-slate-900 dark:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800"
                >
                  <DynamicIcon name={tool.iconName} className="h-4 w-4 text-blue-600" />
                  <span>{lang === 'hi' ? tool.nameHi : tool.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Major Categories List */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {getTranslation(lang, 'allCategories')}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate(`/${cat.slug}/`);
                  }}
                  className={`flex items-center gap-2 rounded-xl p-2.5 text-left text-xs font-medium transition ${
                    currentPath.includes(cat.slug)
                      ? 'bg-blue-50 font-bold text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <DynamicIcon name={cat.iconName} className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span className="truncate">{lang === 'hi' ? cat.nameHi : cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
