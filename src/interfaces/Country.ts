export interface Country {
  name: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
  languages: Language[];
}

export interface Language {
  code: string;
  name: string;
}
