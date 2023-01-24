import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { NextComponentType } from 'next';
// eslint-disable-next-line max-len
import { PayPalScriptProvider } from '@paypal/react-paypal-js/dist/types/components/PayPalScriptProvider';
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
