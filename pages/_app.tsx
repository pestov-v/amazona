import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { NextComponentType } from 'next';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Auth } from 'HOC/Auth';
import 'styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

type TCustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
};

function MyApp({ Component, pageProps }: TCustomAppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <PayPalScriptProvider deferLoading={true} options={{ 'client-id': '' }}>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </PayPalScriptProvider>
    </SessionProvider>
  );
}

export default MyApp;
