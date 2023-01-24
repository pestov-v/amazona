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
        <h1 className='text-2xl font-semibold mb-4'>{name}</h1>
      </li>
      <li>
        <strong>Category:</strong> {category}
      </li>
      <li>
        <strong>Brand:</strong> {brand}
      </li>
      <li>
        <strong>{rating}</strong> of <strong>{numReviews}</strong> reviews
      </li>
      <li>
        <strong>Description:</strong> {description}
      </li>
    </ul>
  );
};
