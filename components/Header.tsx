import React from 'react';
import Link from 'next/link';

export const Header = () => {
  return (
    <header>
      <nav className='flex h-12 justify-between items-center shadow-md px-4 dark:shadow-gray-800'>
        <Link href='/' className='text-lg font-bold'>
          amazona
        </Link>
        <div>
          <Link href='/cart' className='p-2'>
            Cart
          </Link>
          <Link href='/login' className='p-2'>
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};
