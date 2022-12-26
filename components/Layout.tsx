import React from 'react';
import Head from 'next/head';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

interface IProps {
  title?: string;
  children: JSX.Element;
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
