import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { RecoilRoot } from 'recoil';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import Layout from '@/components/layout/Layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  console.log(`🚀 ~ MyApp ~ session`, session);
  const router = useRouter();

  const resetWindowScrollPosition = useCallback(
    () => window.scrollTo(0, 0),
    []
  );

  useEffect(() => {
    Router.events.on('routeChangeComplete', resetWindowScrollPosition);

    return () => {
      Router.events.off('routeChangeComplete', resetWindowScrollPosition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLogin = router.pathname === '/login';

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        {!isLogin ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
