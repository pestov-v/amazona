import create from 'zustand';
import { IProduct } from 'types';

type ICartProduct = IProduct & { quantity: number };
export interface ICartSlice {
  items: ICartProduct[];
  addItem: (product: IProduct) => void;
}
export const useStoreCart = create<ICartSlice>((set) => ({
  items: [],
  addItem: (product) =>
    set(({ items }) => {
      console.log(
        product,
        items.find((i) => i.slug === product.slug),
        items
      );

      const newItems = items.find((i) => i.slug === product.slug)
        ? items.map((i) =>
            i.slug === product.slug && i.quantity < i.countInStock
              ? {
                  ...i,
                  quantity: i.quantity + 1,
                }
              : i
          )
        : [...items, { ...product, quantity: 1 }];

      console.log(newItems);

      return {
        items: newItems,
      };
    }),
}));
