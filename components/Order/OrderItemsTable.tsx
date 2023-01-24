import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { OrderItems } from 'types';

interface IProps {
  items: OrderItems[];
}
export const OrderItemsTable: FC<IProps> = ({ items = [] }) => {
  console.log(items);

  return (
    <table className='min-w-full mb-2'>
      <thead className='border-b'>
        <tr>
          <th className='px-5 text-left'>Item</th>
          <th className='p-5 text-right'>Quantity</th>
          <th className='p-5 text-right'>Price</th>
          <th className='p-5 text-right'>Subtotal</th>
        </tr>
      </thead>
      <tbody className='max-h-80 overflow-y-scroll'>
        {items.map((p) => (
          <tr key={p._id} className='border-b'>
            <td>
              <Link
                href={`/product/${p._id}`}
                className='flex items-center gap-2'
              >
                <Image src={p.image} alt={p.name} width={50} height={50} />
                <span>{p.name}</span>
              </Link>
            </td>
            <td className='p-5 text-right'>{p.quantity}</td>
            <td className='p-5 text-right'>${p.price}</td>
            <td className='p-5 text-right'>${p.quantity * p.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
