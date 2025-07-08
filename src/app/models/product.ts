export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  quantity: number;
  price: number;
  categoryId: number;
  location: string;
}

export interface ProductResponse {
  data: Product[];
  page: number;
  total: number;
}

export interface ProductDto {
  id: number;
  name: string;
  sku: string;
  description: string;
  quantity: number;
  price: number;
  categoryName: string;
  location: string;
}
