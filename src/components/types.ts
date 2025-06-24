export interface Product {
  id: number;
  user_id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}
