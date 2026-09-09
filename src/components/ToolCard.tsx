import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { ToolDefinition, Language } from '../types';
import { DynamicIcon } from './DynamicIcon';

interface ToolCardProps {
  tool: ToolDefinition;
  onSelect: (slug: string) => void;
  lang: Language;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect, lang }) => {
  return (
    <div
      id={`tool-card-${tool.slug}`}
      onClick={() => onSelect(tool.slug)}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-blue-500 cursor-pointer"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
            <DynamicIcon name={tool.iconName} className="h-5 w-5" />
          </div>
          {tool.badge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              <Star className="h-3 w-3 fill-current" />
              {tool.badge}
            </span>
          )}
        </div>

        <h3 className="mt-3.5 text-base font-bold tracking-tight text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors">
          {lang === 'hi' ? tool.nameHi : tool.name}
        </h3>

        <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-2">
          {lang === 'hi' ? tool.descriptionHi : tool.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span className="capitalize">{tool.category.replace('-', ' ')}</span>
        <span className="inline-flex items-center gap-1 text-blue-600 group-hover:translate-x-0.5 transition-transform dark:text-blue-400">
          <span>{lang === 'hi' ? 'खोलें' : 'Open'}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
};
