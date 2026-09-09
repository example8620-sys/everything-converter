import { UnitCategoryConfig, UnitDefinition } from '../types';

export const unitCategories: Record<string, UnitCategoryConfig> = {
  length: {
    id: 'length',
    name: 'Length & Distance',
    nameHi: 'लंबाई और दूरी',
    baseUnit: 'm',
    units: [
      { id: 'mm', name: 'Millimeter', nameHi: 'मिलीमीटर', symbol: 'mm', ratioToBase: 0.001 },
      { id: 'cm', name: 'Centimeter', nameHi: 'सेंटीमीटर', symbol: 'cm', ratioToBase: 0.01 },
      { id: 'm', name: 'Meter', nameHi: 'मीटर', symbol: 'm', ratioToBase: 1 },
      { id: 'km', name: 'Kilometer', nameHi: 'किलोमीटर', symbol: 'km', ratioToBase: 1000 },
      { id: 'in', name: 'Inch', nameHi: 'इंच', symbol: 'in', ratioToBase: 0.0254 },
      { id: 'ft', name: 'Foot', nameHi: 'फीट', symbol: 'ft', ratioToBase: 0.3048 },
      { id: 'yd', name: 'Yard', nameHi: 'गज (यार्ड)', symbol: 'yd', ratioToBase: 0.9144 },
      { id: 'mi', name: 'Mile', nameHi: 'मील', symbol: 'mi', ratioToBase: 1609.344 },
      { id: 'nmi', name: 'Nautical Mile', nameHi: 'समुद्री मील', symbol: 'nmi', ratioToBase: 1852 },
    ],
  },
  weight: {
    id: 'weight',
    name: 'Weight & Mass',
    nameHi: 'वजन और द्रव्यमान',
    baseUnit: 'kg',
    units: [
      { id: 'mg', name: 'Milligram', nameHi: 'मिलीग्राम', symbol: 'mg', ratioToBase: 0.000001 },
      { id: 'g', name: 'Gram', nameHi: 'ग्राम', symbol: 'g', ratioToBase: 0.001 },
      { id: 'kg', name: 'Kilogram', nameHi: 'किलोग्राम', symbol: 'kg', ratioToBase: 1 },
      { id: 't', name: 'Metric Tonne', nameHi: 'मीट्रिक टन', symbol: 't', ratioToBase: 1000 },
      { id: 'oz', name: 'Ounce', nameHi: 'औंस', symbol: 'oz', ratioToBase: 0.028349523125 },
      { id: 'lb', name: 'Pound', nameHi: 'पाउंड', symbol: 'lb', ratioToBase: 0.45359237 },
      { id: 'st', name: 'Stone', nameHi: 'स्टोन', symbol: 'st', ratioToBase: 6.35029318 },
    ],
  },
  temperature: {
    id: 'temperature',
    name: 'Temperature',
    nameHi: 'तापमान',
    baseUnit: 'c',
    units: [
      { id: 'c', name: 'Celsius', nameHi: 'सेल्सियस', symbol: '°C', ratioToBase: 1 },
      { id: 'f', name: 'Fahrenheit', nameHi: 'फ़ारेनहाइट', symbol: '°F', ratioToBase: 1 },
      { id: 'k', name: 'Kelvin', nameHi: 'केल्विन', symbol: 'K', ratioToBase: 1 },
      { id: 'r', name: 'Rankine', nameHi: 'रैनकाइन', symbol: '°R', ratioToBase: 1 },
    ],
  },
  area: {
    id: 'area',
    name: 'Area',
    nameHi: 'क्षेत्रफल',
    baseUnit: 'sqm',
    units: [
      { id: 'sqmm', name: 'Square Millimeter', nameHi: 'वर्ग मिलीमीटर', symbol: 'mm²', ratioToBase: 0.000001 },
      { id: 'sqcm', name: 'Square Centimeter', nameHi: 'वर्ग सेंटीमीटर', symbol: 'cm²', ratioToBase: 0.0001 },
      { id: 'sqm', name: 'Square Meter', nameHi: 'वर्ग मीटर', symbol: 'm²', ratioToBase: 1 },
      { id: 'sqkm', name: 'Square Kilometer', nameHi: 'वर्ग किलोमीटर', symbol: 'km²', ratioToBase: 1000000 },
      { id: 'sqin', name: 'Square Inch', nameHi: 'वर्ग इंच', symbol: 'in²', ratioToBase: 0.00064516 },
      { id: 'sqft', name: 'Square Foot', nameHi: 'वर्ग फुट', symbol: 'ft²', ratioToBase: 0.09290304 },
      { id: 'sqyd', name: 'Square Yard', nameHi: 'वर्ग गज', symbol: 'yd²', ratioToBase: 0.83612736 },
      { id: 'acre', name: 'Acre', nameHi: 'एकड़', symbol: 'ac', ratioToBase: 4046.8564224 },
      { id: 'ha', name: 'Hectare', nameHi: 'हेक्टेयर', symbol: 'ha', ratioToBase: 10000 },
    ],
  },
  volume: {
    id: 'volume',
    name: 'Volume & Capacity',
    nameHi: 'आयतन और क्षमता',
    baseUnit: 'l',
    units: [
      { id: 'ml', name: 'Milliliter', nameHi: 'मिलीलीटर', symbol: 'ml', ratioToBase: 0.001 },
      { id: 'l', name: 'Liter', nameHi: 'लीटर', symbol: 'L', ratioToBase: 1 },
      { id: 'cum', name: 'Cubic Meter', nameHi: 'घन मीटर', symbol: 'm³', ratioToBase: 1000 },
      { id: 'cucm', name: 'Cubic Centimeter', nameHi: 'घन सेंटीमीटर', symbol: 'cm³', ratioToBase: 0.001 },
      { id: 'gal_us', name: 'Gallon (US)', nameHi: 'गैलन (यूएस)', symbol: 'gal', ratioToBase: 3.785411784 },
      { id: 'qt', name: 'Quart (US)', nameHi: 'क्वार्ट', symbol: 'qt', ratioToBase: 0.946352946 },
      { id: 'pt', name: 'Pint (US)', nameHi: 'पिंट', symbol: 'pt', ratioToBase: 0.473176473 },
      { id: 'cup', name: 'Cup (US)', nameHi: 'कप', symbol: 'cup', ratioToBase: 0.2365882365 },
      { id: 'tbsp', name: 'Tablespoon (US)', nameHi: 'बड़ा चम्मच (tbsp)', symbol: 'tbsp', ratioToBase: 0.01478676478 },
      { id: 'tsp', name: 'Teaspoon (US)', nameHi: 'छोटा चम्मच (tsp)', symbol: 'tsp', ratioToBase: 0.00492892159 },
    ],
  },
  speed: {
    id: 'speed',
    name: 'Speed',
    nameHi: 'गति',
    baseUnit: 'mps',
    units: [
      { id: 'mps', name: 'Meters per Second', nameHi: 'मीटर प्रति सेकंड', symbol: 'm/s', ratioToBase: 1 },
      { id: 'kmh', name: 'Kilometers per Hour', nameHi: 'किलोमीटर प्रति घंटा', symbol: 'km/h', ratioToBase: 0.2777777778 },
      { id: 'mph', name: 'Miles per Hour', nameHi: 'मील प्रति घंटा', symbol: 'mph', ratioToBase: 0.44704 },
      { id: 'knot', name: 'Knot (Nautical)', nameHi: 'नॉट', symbol: 'kn', ratioToBase: 0.5144444444 },
      { id: 'fps', name: 'Feet per Second', nameHi: 'फीट प्रति सेकंड', symbol: 'ft/s', ratioToBase: 0.3048 },
    ],
  },
  pressure: {
    id: 'pressure',
    name: 'Pressure',
    nameHi: 'दबाव (प्रेशर)',
    baseUnit: 'pa',
    units: [
      { id: 'pa', name: 'Pascal', nameHi: 'पास्कल', symbol: 'Pa', ratioToBase: 1 },
      { id: 'kpa', name: 'Kilopascal', nameHi: 'किलोपास्कल', symbol: 'kPa', ratioToBase: 1000 },
      { id: 'bar', name: 'Bar', nameHi: 'बार', symbol: 'bar', ratioToBase: 100000 },
      { id: 'psi', name: 'Pound per Square Inch', nameHi: 'पाउंड प्रति वर्ग इंच', symbol: 'psi', ratioToBase: 6894.757293 },
      { id: 'atm', name: 'Standard Atmosphere', nameHi: 'वायुमंडलीय दबाव', symbol: 'atm', ratioToBase: 101325 },
      { id: 'mmhg', name: 'Millimeter of Mercury', nameHi: 'पारे का मिमी (mmHg)', symbol: 'mmHg', ratioToBase: 133.322387415 },
    ],
  },
  energy: {
    id: 'energy',
    name: 'Energy',
    nameHi: 'ऊर्जा',
    baseUnit: 'j',
    units: [
      { id: 'j', name: 'Joule', nameHi: 'जूल', symbol: 'J', ratioToBase: 1 },
      { id: 'kj', name: 'Kilojoule', nameHi: 'किलोजूल', symbol: 'kJ', ratioToBase: 1000 },
      { id: 'cal', name: 'Calorie (Thermochemical)', nameHi: 'कैलोरी', symbol: 'cal', ratioToBase: 4.184 },
      { id: 'kcal', name: 'Kilocalorie (Food cal)', nameHi: 'किलोकैलोरी', symbol: 'kcal', ratioToBase: 4184 },
      { id: 'wh', name: 'Watt-hour', nameHi: 'वाट-घंटा', symbol: 'Wh', ratioToBase: 3600 },
      { id: 'kwh', name: 'Kilowatt-hour', nameHi: 'किलोवाट-घंटा (यूनिट)', symbol: 'kWh', ratioToBase: 3600000 },
      { id: 'btu', name: 'British Thermal Unit', nameHi: 'बीटीयू (BTU)', symbol: 'BTU', ratioToBase: 1055.05585 },
    ],
  },
  power: {
    id: 'power',
    name: 'Power',
    nameHi: 'शक्ति (पावर)',
    baseUnit: 'w',
    units: [
      { id: 'w', name: 'Watt', nameHi: 'वाट', symbol: 'W', ratioToBase: 1 },
      { id: 'kw', name: 'Kilowatt', nameHi: 'किलोवाट', symbol: 'kW', ratioToBase: 1000 },
      { id: 'mw', name: 'Megawatt', nameHi: 'मेगावाट', symbol: 'MW', ratioToBase: 1000000 },
      { id: 'hp', name: 'Horsepower (Mechanical)', nameHi: 'अश्वशक्ति (हॉर्सपावर)', symbol: 'hp', ratioToBase: 745.699872 },
    ],
  },
  data: {
    id: 'data',
    name: 'Digital Data Storage',
    nameHi: 'डिजिटल डेटा स्टोरेज',
    baseUnit: 'byte',
    units: [
      { id: 'bit', name: 'Bit', nameHi: 'बिट', symbol: 'b', ratioToBase: 0.125 },
      { id: 'byte', name: 'Byte', nameHi: 'बाइट', symbol: 'B', ratioToBase: 1 },
      { id: 'kb', name: 'Kilobyte', nameHi: 'किलोबाइट (KB)', symbol: 'KB', ratioToBase: 1024 },
      { id: 'mb', name: 'Megabyte', nameHi: 'मेगाबाइट (MB)', symbol: 'MB', ratioToBase: 1048576 },
      { id: 'gb', name: 'Gigabyte', nameHi: 'गीगाबाइट (GB)', symbol: 'GB', ratioToBase: 1073741824 },
      { id: 'tb', name: 'Terabyte', nameHi: 'टेराबाइट (TB)', symbol: 'TB', ratioToBase: 1099511627776 },
      { id: 'pb', name: 'Petabyte', nameHi: 'पेटाबाइट (PB)', symbol: 'PB', ratioToBase: 1125899906842624 },
    ],
  },
  time: {
    id: 'time',
    name: 'Time',
    nameHi: 'समय',
    baseUnit: 's',
    units: [
      { id: 'ms', name: 'Millisecond', nameHi: 'मिलीसेकंड', symbol: 'ms', ratioToBase: 0.001 },
      { id: 's', name: 'Second', nameHi: 'सेकंड', symbol: 's', ratioToBase: 1 },
      { id: 'min', name: 'Minute', nameHi: 'मिनट', symbol: 'min', ratioToBase: 60 },
      { id: 'h', name: 'Hour', nameHi: 'घंटा', symbol: 'hr', ratioToBase: 3600 },
      { id: 'd', name: 'Day', nameHi: 'दिन', symbol: 'day', ratioToBase: 86400 },
      { id: 'wk', name: 'Week', nameHi: 'सप्ताह', symbol: 'wk', ratioToBase: 604800 },
      { id: 'mo', name: 'Month (Average)', nameHi: 'महीना (औसत)', symbol: 'mo', ratioToBase: 2629800 },
      { id: 'yr', name: 'Year (Calendar)', nameHi: 'वर्ष', symbol: 'yr', ratioToBase: 31557600 },
    ],
  },
};

export const cookingIngredients = [
  { id: 'water', name: 'Water / Milk', density: 1.0, note: '1 cup = 237g' },
  { id: 'flour', name: 'All-Purpose Flour', density: 0.529, note: '1 cup = 125g' },
  { id: 'sugar_granulated', name: 'Granulated White Sugar', density: 0.845, note: '1 cup = 200g' },
  { id: 'sugar_powdered', name: 'Powdered / Icing Sugar', density: 0.507, note: '1 cup = 120g' },
  { id: 'butter', name: 'Butter', density: 0.959, note: '1 cup = 227g' },
  { id: 'oil', name: 'Vegetable / Olive Oil', density: 0.92, note: '1 cup = 218g' },
  { id: 'honey', name: 'Honey / Molasses', density: 1.42, note: '1 cup = 336g' },
  { id: 'rice', name: 'Uncooked White Rice', density: 0.824, note: '1 cup = 195g' },
  { id: 'oats', name: 'Rolled Oats', density: 0.38, note: '1 cup = 90g' },
];

export function convertValue(
  val: number,
  fromUnitId: string,
  toUnitId: string,
  categoryKey: string,
  useDecimalData = false
): number {
  if (isNaN(val)) return 0;
  if (fromUnitId === toUnitId) return val;

  // Temperature has non-linear conversions (offsets)
  if (categoryKey === 'temperature') {
    let kelvin: number;
    if (fromUnitId === 'c') kelvin = val + 273.15;
    else if (fromUnitId === 'f') kelvin = (val - 32) * (5 / 9) + 273.15;
    else if (fromUnitId === 'k') kelvin = val;
    else if (fromUnitId === 'r') kelvin = val * (5 / 9);
    else kelvin = val;

    if (toUnitId === 'c') return kelvin - 273.15;
    if (toUnitId === 'f') return (kelvin - 273.15) * (9 / 5) + 32;
    if (toUnitId === 'k') return kelvin;
    if (toUnitId === 'r') return kelvin * (9 / 5);
    return kelvin;
  }

  const category = unitCategories[categoryKey];
  if (!category) return val;

  const fromUnit = category.units.find((u) => u.id === fromUnitId);
  const toUnit = category.units.find((u) => u.id === toUnitId);
  if (!fromUnit || !toUnit) return val;

  // If data category and user requested decimal (1000-based) storage:
  if (categoryKey === 'data' && useDecimalData) {
    const decimalRatios: Record<string, number> = {
      bit: 0.125,
      byte: 1,
      kb: 1000,
      mb: 1000000,
      gb: 1000000000,
      tb: 1000000000000,
      pb: 1000000000000000,
    };
    const fromR = decimalRatios[fromUnitId] || fromUnit.ratioToBase;
    const toR = decimalRatios[toUnitId] || toUnit.ratioToBase;
    const inBytes = val * fromR;
    return inBytes / toR;
  }

  const baseValue = val * fromUnit.ratioToBase;
  return baseValue / toUnit.ratioToBase;
}

export function getCategoryUnits(category: string): UnitDefinition[] {
  const normalized = category.replace(/-converter$/, '').replace('digital-', '');
  return (
    unitCategories[normalized]?.units ||
    unitCategories[category]?.units ||
    unitCategories['length'].units
  );
}

export function convertUnits(
  category: string,
  val: number,
  fromUnitId: string,
  toUnitId: string,
  useDecimalData = false
): number {
  const normalized = category.replace(/-converter$/, '').replace('digital-', '');
  return convertValue(val, fromUnitId, toUnitId, normalized, useDecimalData);
}

