import Link from 'next/link';
import React from 'react';
import { useStoreCart } from 'store/cart';

export const CartIcon = () => {
  const items = useStoreCart((state) => state.items);
  const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <Link href='/cart' className='p-2'>
      Cart
      {!!items.length && (
        <span
          className={`ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white ${
            totalItems > 9 ? 'px-1' : ''
          } ${totalItems > 99 ? 'py-[0.3em] px-[0.4em]' : ''}`}
        >
          {totalItems < 100 ? totalItems : '99+'}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
