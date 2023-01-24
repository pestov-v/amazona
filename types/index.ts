export enum PaymentMethod {
  PayPal = 'PayPal',
  Stripe = 'Stripe',
  Cash = 'Cash',
}
export const DEFAULT_PAYMENT_METHOD = PaymentMethod.PayPal;

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface IProduct {
  _id?: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
  isFeatured?: boolean;
  banner?: string;
  createdAt?: string;
  updatedAt?: string;
}
export type ICartProduct = IProduct & { quantity: number };

export interface IAddress {
  name: string;
  address: string;
  city: string;
  postalCode: number;
  country: string;
}

export interface IOrder {
  user: IUser;
  orderItems: ICartProduct[];
  shippingAddress: IAddress;
  paymentMethod: PaymentMethod;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt: Date;
  deliveredAt: Date;
}

export type OrderItems = Pick<
  ICartProduct,
  '_id' | 'name' | 'image' | 'quantity' | 'price'
>;
export interface IOrderResponse {
  _id: string;
  user: string;
  isPaid: boolean;
  isDelivered: boolean;
  orderItems: OrderItems[];
  itemsPrice: number;
  paymentMethod: PaymentMethod;
  shippingAddress: IAddress;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  deliveredAt?: Date;
  paidAt?: Date;
}
