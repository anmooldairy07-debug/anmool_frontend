export interface Product {
  _id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  category: string;
  weight: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  features: string[];
  badge?: "bestseller" | "new" | "organic" | "premium" | null;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  user: { _id: string; name: string; email: string; phone: string; avatar: string; address?: string };
  items: { product: string; name: string; price: number; quantity: number }[];
  total: number;
  status: "pending" | "confirmed" | "out_for_delivery" | "delivered" | "cancelled";
  cancelReason: string;
  hiddenByUser: boolean;
  deliveryDate: string;
  deliveryTime: string;
  paymentMethod: "coins" | "cod";
  shippingAddress: string;
  phone: string;
  assignedTo: { _id: string; name: string; phone: string } | string | null;
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  coins: number;
  role: "user" | "admin";
  avatar: string;
  createdAt: string;
}

export interface CoinPackage {
  _id: string;
  coins: number;
  price: number;
  bonus: number;
  popular: boolean;
}

export interface DeliveryPartner {
  _id: string;
  name: string;
  email: string;
  phone: string;
  timeSlots: string[];
  active: boolean;
  createdAt: string;
}
