import Link from 'next/link';
import React, { FC } from 'react';
import { IProduct } from 'types';

interface IProps {
  product: IProduct;
}
export const ProductItem: FC<IProps> = ({ product }) => {
  return (
    <div className='card'>
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className='rounded shadow'
        />
      </Link>

      <div className='flex flex-col justify-center items-center p-5'>
        <Link href={`/product/${product.slug}`}>
          <h2 className='text-lg'>{product.name}</h2>
        </Link>
        <p className='mb-2'>{product.brand}</p>
        <p>${product.price}</p>
        <button className='primary-button' type='button'>
          Add to cart
        </button>
      </div>
    </div>
  );
};
