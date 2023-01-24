import { OrderItems } from 'types';

export const roundPrice = (num: number) =>
  Math.round(num * 100 + Number.EPSILON) / 100;

export const getPrices = (items: OrderItems[]) => {
  const itemsPrice = roundPrice(
    items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = roundPrice(itemsPrice * 0.15);
  const totalPrice = roundPrice(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};
