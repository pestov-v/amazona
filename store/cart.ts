import create from 'zustand';
import Cookies from 'js-cookie';
import {
  DEFAULT_PAYMENT_METHOD,
  IAddress,
  ICartProduct,
  IProduct,
  PaymentMethod,
} from 'types';

const cartItems = Cookies.get('cartItems')
  ? JSON.parse(Cookies.get('cartItems'))
  : [];
const shippingAddress = Cookies.get('address')
  ? JSON.parse(Cookies.get('address'))
  : undefined;
const paymentMethod = Cookies.get('paymentMethod')
  ? (Cookies.get('paymentMethod') as PaymentMethod)
  : DEFAULT_PAYMENT_METHOD;

const setCookieItems = (items: ICartProduct[]) => {
  Cookies.set('cartItems', JSON.stringify(items));
};
const setCookieAddress = (address: IAddress) => {
  Cookies.set('address', JSON.stringify(address));
};

export interface ICartSlice {
  items: ICartProduct[];
  clearItems: () => void;
  addItem: (product: IProduct) => void;
  removeItem: (id: string) => void;
  shippingAddress: IAddress | undefined;
  saveShippingAddress: (address: IAddress) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (payment: PaymentMethod) => void;
  clearPaymentMethod: () => void;
  reset: () => void;
  changeQuantity: (id: string, quantity: number) => void;
}
export const useStoreCart = create<ICartSlice>((set) => ({
  items: cartItems,
  clearItems: () =>
    set(() => {
      setCookieItems([]);
      return { items: [] };
    }),
  addItem: (product) =>
    set(({ items }) => {
      const newItems = items.find((i) => i._id === product._id)
        ? items.map((i) =>
            i._id === product._id && i.quantity < i.countInStock
              ? {
                  ...i,
                  quantity: i.quantity + 1,
                }
              : i
          )
        : [...items, { ...product, quantity: 1 }];

      setCookieItems(newItems);
      return {
        items: newItems,
      };
    }),
  removeItem: (id) =>
    set(({ items }) => {
      const newItems = items.filter((i) => i._id !== id);
      setCookieItems(newItems);
      return { items: newItems };
    }),
  reset: () =>
    set(() => {
      setCookieItems([]);
      Cookies.remove('address');

      return { items: [] };
    }),
  shippingAddress,
  saveShippingAddress: (address) =>
    set(() => {
      setCookieAddress(address);
      return { shippingAddress: address };
    }),
  paymentMethod,
  setPaymentMethod: (payment) =>
    set(() => {
      Cookies.set('paymentMethod', payment);
      return { paymentMethod: payment };
    }),
  clearPaymentMethod() {
    Cookies.remove('paymentMethod');
    set(() => ({ paymentMethod: DEFAULT_PAYMENT_METHOD }));
  },
  changeQuantity: (id, quantity) =>
    set(({ items }) => {
      const newItems = items.map((i) =>
        i._id === id ? { ...i, quantity } : i
      );
      setCookieItems(newItems);
      return {
        items: newItems,
      };
    }),
}));
