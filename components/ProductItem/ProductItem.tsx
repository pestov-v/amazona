import Link from 'next/link';
import React, { FC, MouseEvent } from 'react';
import { useStoreCart } from 'store/cart';
import { IProduct } from 'types';
import data from 'utils/data';

interface IProps {
  product: IProduct;
}
export const ProductItem: FC<IProps> = ({ product }) => {
  const addItem = useStoreCart((state) => state.addItem);

  const addItemHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // e.stopPropagation();
    const prod = data.products.find((p) => p.slug === product.slug);
    addItem(prod);
  };
  return (
    <Link href={`/product/${product.slug}`} className='card'>
      <img src={product.image} alt={product.name} className='rounded shadow' />

      <div className='flex flex-col justify-center items-center p-5'>
        <h2 className='text-lg px-2'>{product.name}</h2>
        <p className='mb-1'>{product.brand}</p>
        <p className='mb-4'>${product.price}</p>
        <button
          className='primary-button'
          type='button'
          onClick={addItemHandler}
        >
          Add to cart
        </button>
      </div>
    </Link>
  );
};
