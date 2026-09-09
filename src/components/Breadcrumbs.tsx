import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../translations';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
  lang: Language;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate, lang }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 flex items-center text-xs text-slate-500 dark:text-slate-400">
      <ol className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0">
        <li className="flex items-center">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{getTranslation(lang, 'breadcrumbHome')}</span>
          </button>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              {isLast ? (
                <span className="font-semibold text-slate-800 dark:text-slate-200" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <button
                  onClick={() => onNavigate(item.path)}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {item.name}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
