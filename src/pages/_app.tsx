import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { getSession, SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import AuthGuard from '@/components/AuthGuard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  const isLogin = router.pathname === '/login';

  return (
    <>
      <Seo templateTitle='Spotlists 2.0' />

      <SessionProvider session={session}>
        <RecoilRoot>
          {!isLogin ? (
            <AuthGuard>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AuthGuard>
          ) : (
            <Component {...pageProps} />
          )}
        </RecoilRoot>
      </SessionProvider>
    </>
  );
}

export default MyApp;

export async function getServerSideProps(context: any) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
