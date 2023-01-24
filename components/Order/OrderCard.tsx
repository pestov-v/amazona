import { FC, ReactNode } from 'react';
import Link from 'next/link';

interface IProps {
  title: string;
  content: ReactNode;
  link?: string;
  linkTitle?: string;
}
export const OrderCard: FC<IProps> = ({ title, content, link, linkTitle }) => {
  return (
    <div className='card p-5'>
      <h2 className='mb-2 text-lg font-semibold'>{title}</h2>
      <div>{content}</div>
      {link && (
        <Link href={link} className='text-blue-500'>
          {linkTitle}
        </Link>
      )}
    </div>
  );
};
