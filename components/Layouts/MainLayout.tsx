import { ReactNode } from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

import { Header } from 'components/Layouts/Header/Header';
import { Footer } from 'components/Layouts/Footer';

interface IProps {
  title?: string;
  children: ReactNode;
  mainClassName?: string;
}
export const MainLayout = (props: IProps) => {
  const { children, title, mainClassName = '' } = props;

  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name='description' content='Ecommerce website' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ToastContainer position='bottom-center' limit={1} />

      <div className='app flex min-h-screen flex-col justify-between'>
        <Header />
        <main className={`container m-auto mt-4 px-4 ${mainClassName}`}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};
