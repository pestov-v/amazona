import React, { FC } from 'react';

interface IProps {
  name: string;
  category: string;
  brand: string;
  rating: number;
  numReviews: number;
  description: string;
}
export const ProductDescription: FC<IProps> = (props) => {
  const { name, category, brand, rating, numReviews, description } = props;

  return (
    <ul>
      <li>
        <h1 className='text-lg'>{name}</h1>
      </li>
      <li>Category: {category}</li>
      <li>Brand: {brand}</li>
      <li>
        {rating} of {numReviews} reviews
      </li>
      <li>Description: {description}</li>
    </ul>
  );
};
