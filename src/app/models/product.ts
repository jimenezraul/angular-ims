export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  quantity: number;
  price: number;
  category: number;
  location: string;
}

export interface ProductResponse {
  data: Product[],
  page: number,
  total: number
}
