export const unitCategories = {
  length: {
    label: "Length",
    units: [
      { id: "m", label: "Meters", symbol: "m", factor: 1 },
      { id: "km", label: "Kilometers", symbol: "km", factor: 1000 },
      { id: "cm", label: "Centimeters", symbol: "cm", factor: 0.01 },
      { id: "mm", label: "Millimeters", symbol: "mm", factor: 0.001 },
      { id: "ft", label: "Feet", symbol: "ft", factor: 0.3048 },
      { id: "in", label: "Inches", symbol: "in", factor: 0.0254 },
      { id: "mi", label: "Miles", symbol: "mi", factor: 1609.344 },
    ],
  },
  mass: {
    label: "Mass",
    units: [
      { id: "kg", label: "Kilograms", symbol: "kg", factor: 1 },
      { id: "g", label: "Grams", symbol: "g", factor: 0.001 },
      { id: "mg", label: "Milligrams", symbol: "mg", factor: 0.000001 },
      { id: "lb", label: "Pounds", symbol: "lb", factor: 0.45359237 },
      { id: "oz", label: "Ounces", symbol: "oz", factor: 0.028349523125 },
      { id: "tonne", label: "Metric tonnes", symbol: "t", factor: 1000 },
    ],
  },
  temperature: {
    label: "Temperature",
    units: [
      { id: "c", label: "Celsius", symbol: "°C", toBase: (value) => value, fromBase: (value) => value },
      { id: "f", label: "Fahrenheit", symbol: "°F", toBase: (value) => (value - 32) * (5 / 9), fromBase: (value) => value * (9 / 5) + 32 },
      { id: "k", label: "Kelvin", symbol: "K", toBase: (value) => value - 273.15, fromBase: (value) => value + 273.15 },
    ],
  },
  area: {
    label: "Area",
    units: [
      { id: "m2", label: "Square meters", symbol: "m²", factor: 1 },
      { id: "km2", label: "Square kilometers", symbol: "km²", factor: 1_000_000 },
      { id: "ft2", label: "Square feet", symbol: "ft²", factor: 0.09290304 },
      { id: "ha", label: "Hectares", symbol: "ha", factor: 10_000 },
      { id: "acre", label: "Acres", symbol: "ac", factor: 4046.8564224 },
    ],
  },
  volume: {
    label: "Volume",
    units: [
      { id: "l", label: "Liters", symbol: "L", factor: 1 },
      { id: "ml", label: "Milliliters", symbol: "mL", factor: 0.001 },
      { id: "m3", label: "Cubic meters", symbol: "m³", factor: 1000 },
      { id: "gal", label: "US gallons", symbol: "US gal", factor: 3.785411784 },
      { id: "cup", label: "US cups", symbol: "cup", factor: 0.2365882365 },
      { id: "floz", label: "US fluid ounces", symbol: "fl oz", factor: 0.0295735295625 },
    ],
  },
  time: {
    label: "Time",
    units: [
      { id: "s", label: "Seconds", symbol: "s", factor: 1 },
      { id: "ms", label: "Milliseconds", symbol: "ms", factor: 0.001 },
      { id: "min", label: "Minutes", symbol: "min", factor: 60 },
      { id: "h", label: "Hours", symbol: "h", factor: 3600 },
      { id: "day", label: "Days", symbol: "d", factor: 86_400 },
      { id: "week", label: "Weeks", symbol: "wk", factor: 604_800 },
    ],
  },
  data: {
    label: "Digital storage",
    units: [
      { id: "b", label: "Bytes", symbol: "B", factor: 1 },
      { id: "kb", label: "Kilobytes (decimal)", symbol: "KB", factor: 1000 },
      { id: "mb", label: "Megabytes (decimal)", symbol: "MB", factor: 1_000_000 },
      { id: "gb", label: "Gigabytes (decimal)", symbol: "GB", factor: 1_000_000_000 },
      { id: "kib", label: "Kibibytes (binary)", symbol: "KiB", factor: 1024 },
      { id: "mib", label: "Mebibytes (binary)", symbol: "MiB", factor: 1_048_576 },
      { id: "gib", label: "Gibibytes (binary)", symbol: "GiB", factor: 1_073_741_824 },
    ],
  },
};

export const convertUnits = (value, categoryId, sourceId, targetId) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) throw new Error("Enter a finite number to convert.");
  const category = unitCategories[categoryId];
  if (!category) throw new Error("Choose a supported measurement category.");
  const source = category.units.find((unit) => unit.id === sourceId);
  const target = category.units.find((unit) => unit.id === targetId);
  if (!source || !target) throw new Error("Choose two units from the same category.");
  const baseValue = source.toBase ? source.toBase(numericValue) : numericValue * source.factor;
  const convertedValue = target.fromBase ? target.fromBase(baseValue) : baseValue / target.factor;
  return { value: convertedValue, source, target, category: category.label };
};
