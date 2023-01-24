import { MainLayout } from 'components/Layouts/MainLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';

const UnauthorizedPage = () => {
  const {
    query: { message },
  } = useRouter();

  return (
    <MainLayout
      title='Unathorized page'
      mainClassName='flex flex-col items-center justify-center w-full h-full'
    >
      <h1 className='text-2xl mt-12 mb-4'>Access Denied!</h1>
      {message && (
        <div className='mb-4 text-red-500 font-bold text-xl'>{message}</div>
      )}
      <Link href='/login' className='text-lg text-blue-600 font-semibold'>
        Login
      </Link>
    </MainLayout>
  );
};

export default UnauthorizedPage;
