import create from 'zustand';
import { IProduct } from 'types';

export interface IProductSlice {
  items: IProduct[];
  addItems: (items: IProduct[]) => void;
}
export const useStoreProducts = create<IProductSlice>((set) => ({
  items: [],
  addItems: (items: IProduct[]) => {
    set({ items });
  },
}));
