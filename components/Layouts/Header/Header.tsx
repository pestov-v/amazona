import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu } from '@headlessui/react';
import { useStoreCart } from 'store/cart';
import { CartIcon } from './CartIcon';

export const Header = () => {
  const { data: session } = useSession();
  const reset = useStoreCart((s) => s.reset);
  const logoutHandler = () => {
    reset();
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <header>
      <nav className='flex h-12 justify-between items-center shadow-md px-4 dark:shadow-gray-800'>
        <Link href='/' className='text-lg font-bold px-2'>
          amazona
        </Link>
        <div>
          <CartIcon />

          {session?.user ? (
            <Menu as='div' className='relative inline-block'>
              <Menu.Button className='text-blue-600'>
                {session.user.name}
              </Menu.Button>
              <Menu.Items
                className='
                absolute right-0 w-56 origin-top-right rounded-md border
                bg-neutral-50 dark:bg-neutral-800 shadow-lg dark:shadow-neutral-900
              '
              >
                <Menu.Item>
                  <Link href='/profile' className='dropdown-link'>
                    Profile
                  </Link>
                </Menu.Item>

                <Menu.Item>
                  <Link href='/order-history' className='dropdown-link'>
                    Order history
                  </Link>
                </Menu.Item>

                <Menu.Item>
                  <Link
                    href='/'
                    className='dropdown-link'
                    onClick={logoutHandler}
                  >
                    Logout
                  </Link>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link href='/login' className='p-2 ml-2'>
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
