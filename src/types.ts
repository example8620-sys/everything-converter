export type Language = 'en' | 'hi';
export type Theme = 'light' | 'dark';

export type UnitCategory =
  | 'length'
  | 'weight'
  | 'temperature'
  | 'area'
  | 'volume'
  | 'speed'
  | 'time'
  | 'data'
  | 'pressure'
  | 'energy'
  | 'power'
  | 'cooking'
  | 'angle'
  | 'fuel'
  | 'torque'
  | 'sound'
  | string;

export type ToolCategory =
  | 'image-tools'
  | 'unit-converters'
  | 'calculators'
  | 'text-tools'
  | 'developer-tools'
  | 'time-date-tools'
  | 'number-tools'
  | 'digital-data'
  | 'pdf-tools';

export interface FAQItem {
  question: string;
  answer: string;
  questionHi?: string;
  answerHi?: string;
}

export interface FormulaStep {
  title: string;
  formula: string;
  explanation: string;
  titleHi?: string;
  explanationHi?: string;
}

export interface ExampleItem {
  input: string;
  output: string;
  note?: string;
  noteHi?: string;
}

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  nameHi: string;
  category: ToolCategory;
  description: string;
  descriptionHi: string;
  iconName: string;
  badge?: string;
  isPopular?: boolean;
  isEveryday?: boolean;
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
  h1: string;
  formula?: string;
  howItWorks?: string;
  howItWorksHi?: string;
  formulas?: FormulaStep[];
  examples?: ExampleItem[];
  faqs?: FAQItem[];
  relatedSlugs: string[];
}

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  nameHi: string;
  slug: string;
  description: string;
  descriptionHi: string;
  iconName: string;
}

export interface UnitDefinition {
  id: string;
  name: string;
  nameHi?: string;
  symbol: string;
  ratioToBase: number; // multiply by ratioToBase to get standard base unit
  offset?: number; // for temperature like Celsius to Kelvin
}

export interface UnitCategoryConfig {
  id: string;
  name: string;
  nameHi: string;
  baseUnit: string;
  units: UnitDefinition[];
}
