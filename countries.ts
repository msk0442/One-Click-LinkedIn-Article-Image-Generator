export interface Country {
  name: string;
  code: string;
  language: string;
}

// List of target countries for article generation
export const countries: Country[] = [
  { name: "USA", code: "US", language: "English" },
  { name: "Canada", code: "CA", language: "English" },
  { name: "Brazil", code: "BR", language: "Portuguese" },
  { name: "Mexico", code: "MX", language: "Spanish" },
  { name: "Pakistan", code: "PK", language: "English" },
  { name: "Bangladesh", code: "BD", language: "English" },
  { name: "China", code: "CN", language: "Mandarin Chinese" },
  { name: "India", code: "IN", language: "English" },
  { name: "Indonesia", code: "ID", language: "Indonesian" },
  { name: "Malaysia", code: "MY", language: "English" },
  { name: "Japan", code: "JP", language: "Japanese" },
  { name: "Sri Lanka", code: "LK", language: "Sinhala" },
  { name: "Kuwait", code: "KW", language: "English" },
  { name: "Qatar", code: "QA", language: "English" },
  { name: "Bahrain", code: "BH", language: "English" },
  { name: "UAE", code: "AE", language: "English" },
  { name: "Saudi Arabia", code: "SA", language: "English" },
  { name: "Oman", code: "OM", language: "English" }
];