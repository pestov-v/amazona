import React, { FC } from 'react';

interface IProps {
  price: number;
  inStock: boolean;
  addToCart: () => void;
}
export const ProductPriceCard: FC<IProps> = ({ price, inStock, addToCart }) => {
  return (
    <div className='card p-5'>
      <div className='flex justify-between font-semibold mb-2'>
        <span>Price</span>
        <span>${price}</span>
      </div>

      <div className='flex justify-between font-semibold mb-2'>
        <span>Status</span>
        <span className={inStock ? 'text-green-600' : 'text-red-500'}>
          {inStock ? 'In stock' : 'Unavailable'}
        </span>
      </div>

      <button className='primary-button w-full' onClick={addToCart}>
        Add to cart
      </button>
    </div>
  );
};
