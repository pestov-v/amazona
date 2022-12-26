import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Header } from 'components/Layouts/Header/Header';
import { Footer } from 'components/Layouts/Footer';

interface IProps {
  title?: string;
  children: ReactNode;
}
export const Layout = (props: IProps) => {
  const { children, title } = props;

  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name='description' content='Ecommerce website' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex min-h-screen flex-col justify-between'>
        <Header />
        <main className='container m-auto mt-4 px-4'>{children}</main>
        <Footer />
      </div>
    </>
  );
};
