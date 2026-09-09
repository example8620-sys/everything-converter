import React, { useState, useMemo } from 'react';
import { Copy, Check, RotateCcw, Utensils } from 'lucide-react';
import { Language } from '../../types';
import { getTranslation } from '../../translations';

interface Ingredient {
  id: string;
  name: string;
  nameHi: string;
  gramsPerCup: number;
}

const INGREDIENTS: Ingredient[] = [
  { id: 'all-purpose-flour', name: 'All-Purpose Flour (Maida)', nameHi: 'मैदा (All-Purpose Flour)', gramsPerCup: 125 },
  { id: 'whole-wheat-flour', name: 'Whole Wheat Flour (Atta)', nameHi: 'गेहूं का आटा (Atta)', gramsPerCup: 130 },
  { id: 'granulated-sugar', name: 'Granulated White Sugar', nameHi: 'सफेद चीनी (Granulated)', gramsPerCup: 200 },
  { id: 'brown-sugar', name: 'Brown Sugar (Packed)', nameHi: 'ब्राउन शुगर (Packed)', gramsPerCup: 220 },
  { id: 'powdered-sugar', name: 'Powdered / Icing Sugar', nameHi: 'पीसी चीनी (Powdered)', gramsPerCup: 120 },
  { id: 'butter', name: 'Butter', nameHi: 'मक्खन (Butter)', gramsPerCup: 227 },
  { id: 'water', name: 'Water', nameHi: 'पानी (Water)', gramsPerCup: 240 },
  { id: 'milk', name: 'Whole Milk', nameHi: 'दूध (Whole Milk)', gramsPerCup: 245 },
  { id: 'vegetable-oil', name: 'Vegetable / Cooking Oil', nameHi: 'खाना पकाने का तेल (Oil)', gramsPerCup: 218 },
  { id: 'honey', name: 'Honey / Syrup', nameHi: 'शहद (Honey)', gramsPerCup: 340 },
  { id: 'rice', name: 'Raw White Rice', nameHi: 'कच्चा चावल (Rice)', gramsPerCup: 185 },
  { id: 'cocoa-powder', name: 'Cocoa Powder', nameHi: 'कोको पाउडर', gramsPerCup: 100 },
  { id: 'rolled-oats', name: 'Rolled Oats', nameHi: 'ओट्स (Rolled Oats)', gramsPerCup: 90 },
];

export const CookingConverterEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  const [selectedIngredient, setSelectedIngredient] = useState<string>('all-purpose-flour');
  const [quantity, setQuantity] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('cup');
  const [toUnit, setToUnit] = useState<string>('gram');
  const [copied, setCopied] = useState<boolean>(false);

  const ingredient = useMemo(
    () => INGREDIENTS.find((i) => i.id === selectedIngredient) || INGREDIENTS[0],
    [selectedIngredient]
  );

  const numVal = parseFloat(quantity) || 0;

  // Conversion logic based on ingredient density
  // 1 US Cup = 240 ml volume.
  // grams per ml = gramsPerCup / 240.
  const result = useMemo(() => {
    if (numVal <= 0) return 0;
    const density = ingredient.gramsPerCup / 240; // g/ml

    // Convert input to grams
    let inGrams = 0;
    if (fromUnit === 'cup') inGrams = numVal * ingredient.gramsPerCup;
    else if (fromUnit === 'tbsp') inGrams = numVal * (ingredient.gramsPerCup / 16);
    else if (fromUnit === 'tsp') inGrams = numVal * (ingredient.gramsPerCup / 48);
    else if (fromUnit === 'gram') inGrams = numVal;
    else if (fromUnit === 'kg') inGrams = numVal * 1000;
    else if (fromUnit === 'oz') inGrams = numVal * 28.3495;
    else if (fromUnit === 'lb') inGrams = numVal * 453.592;
    else if (fromUnit === 'ml') inGrams = numVal * density;
    else if (fromUnit === 'liter') inGrams = numVal * 1000 * density;

    // Convert grams to target
    if (toUnit === 'gram') return inGrams;
    if (toUnit === 'kg') return inGrams / 1000;
    if (toUnit === 'oz') return inGrams / 28.3495;
    if (toUnit === 'lb') return inGrams / 453.592;
    if (toUnit === 'cup') return inGrams / ingredient.gramsPerCup;
    if (toUnit === 'tbsp') return inGrams / (ingredient.gramsPerCup / 16);
    if (toUnit === 'tsp') return inGrams / (ingredient.gramsPerCup / 48);
    if (toUnit === 'ml') return inGrams / density;
    if (toUnit === 'liter') return inGrams / (density * 1000);

    return inGrams;
  }, [numVal, fromUnit, toUnit, ingredient]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${result.toFixed(2)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setQuantity('1');
    setFromUnit('cup');
    setToUnit('gram');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5">
          <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Utensils className="h-4 w-4 text-blue-600" />
            <span>Select Ingredient (Density Aware):</span>
          </label>
          <select
            value={selectedIngredient}
            onChange={(e) => setSelectedIngredient(e.target.value)}
            className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          >
            {INGREDIENTS.map((ing) => (
              <option key={ing.id} value={ing.id}>
                {lang === 'hi' ? ing.nameHi : ing.name} (1 Cup = {ing.gramsPerCup}g)
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500">{getTranslation(lang, 'from')}</label>
            <div className="flex gap-2">
              <input
                type="number"
                step="any"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-1/2 h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-900 focus:border-blue-500 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-1/2 h-11 rounded-xl border border-slate-200 bg-white px-2 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <option value="cup">Cups (US)</option>
                <option value="tbsp">Tablespoons (Tbsp)</option>
                <option value="tsp">Teaspoons (Tsp)</option>
                <option value="gram">Grams (g)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="oz">Ounces (oz)</option>
                <option value="lb">Pounds (lbs)</option>
                <option value="ml">Milliliters (ml)</option>
              </select>
            </div>
          </div>

          {/* Result */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500">{getTranslation(lang, 'to')}</label>
            <div className="flex gap-2">
              <div className="flex w-1/2 h-11 items-center justify-between rounded-xl border border-blue-200 bg-blue-50/50 px-3 text-sm font-black text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
                <span>{result > 0 ? Number(result.toFixed(2)).toLocaleString() : '0'}</span>
                <button onClick={handleCopy} className="text-blue-600 hover:text-blue-800" title="Copy">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-1/2 h-11 rounded-xl border border-slate-200 bg-white px-2 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <option value="gram">Grams (g)</option>
                <option value="cup">Cups (US)</option>
                <option value="tbsp">Tablespoons (Tbsp)</option>
                <option value="tsp">Teaspoons (Tsp)</option>
                <option value="oz">Ounces (oz)</option>
                <option value="lb">Pounds (lbs)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="ml">Milliliters (ml)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800 text-xs text-slate-500">
          <span>
            Density factor: <strong>1 Cup {ingredient.name} = {ingredient.gramsPerCup} Grams</strong>
          </span>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
