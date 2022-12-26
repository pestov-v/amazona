import { useStoreCart } from './cart';
import { useStoreProducts } from './products';

// export interface IStore {
//   products: IProductSlice;
//   cart: ICartSlice;
// }
// export const createStore = () =>
//   create<IStore>()((...a) => ({
//     // products: useProductsSlice((state) => state),
//     products: { ...createProductSlice(...a) },
//     cart: { ...createCartSlice(...a) },
//   }));

// export const useAppStore = () => {
//   const store = createStore();
//   return store.getState();
// };

export const store = {
  useStoreCart,
  useStoreProducts,
};

// export default {
//     useStore
// }
