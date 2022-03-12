export interface Filter {
  age: number;
  city: string;
  sex: string;
  search?: {
    ageMin: number;
    ageMax: number;
    city?: string;
    sex?: string;
  } | null;
}
