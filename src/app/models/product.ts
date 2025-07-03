export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
  location: string;
}

export interface ProductResponse {
  data: Product[],
  page: number,
  total: number
}
