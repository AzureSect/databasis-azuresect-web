export interface Material {
  id: number;
  name: string;
  description?: string;
  stockQuantity: number;
}

export interface ProductComposition {
  id: number;
  material: Material;
  quantityNeeded: number;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  value: number;
  composition: ProductComposition[];
}
