export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  min_stock: number;
  size: string;
  type: string;
  compatible_models: string[];
  repair_time: number;
  repair_cost: number;
  description: string;
}

export type ProductFormData = Omit<Product, 'id'>;
