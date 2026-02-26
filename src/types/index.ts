export interface Material {
  id?: number;
  name: string;
  stockQuantity: number;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  composition: ProductComposition[];
}

export interface ProductComposition {
  materialId: number;
  materialName?: string;
  quantityNeeded: number;
}
