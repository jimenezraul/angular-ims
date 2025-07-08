export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface CategoryResponse {
  data: Category[],
  total: number
}
