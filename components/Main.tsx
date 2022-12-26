import React from 'react';
import data from 'utils/data';
import { ProductItem } from './ProductItem';

export const Main = () => {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {data.products.map((product) => (
        <ProductItem product={product} key={product.slug} />
      ))}
    </div>
  );
};
