import React from 'react';
import Link from 'next/link';
import CartIcon from './CartIcon';

export const Header = () => {
  return (
    <header>
      <nav className='flex h-12 justify-between items-center shadow-md px-4 dark:shadow-gray-800'>
        <Link href='/' className='text-lg font-bold px-2'>
          amazona
        </Link>
        <div>
          <CartIcon />
          <Link href='/login' className='p-2'>
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};
