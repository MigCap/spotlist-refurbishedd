import { Router } from 'next/router';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef } from 'react';

import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Player from '@/components/Player';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const contentRef: any = useRef(null);

  const resetContentScrollPosition = useCallback(() => {
    contentRef?.current?.scrollIntoView();
    // contentRef?.current?.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start',
    //   inline: 'nearest',
    // });
  }, []);

  useEffect(() => {
    Router.events.on('routeChangeComplete', resetContentScrollPosition);

    return () => {
      Router.events.off('routeChangeComplete', resetContentScrollPosition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!session) return null;

  return (
    <>
      <div className='bg-black h-screen overflow-hidden'>
        <main className='flex'>
          <Sidebar className='h-screen hidden sm:w-[10rem] md:inline-flex lg:w-[12rem]' />
          <div className='w-[100%]'>
            <Header />
            <div className='flex-grow h-screen main overflow-y-scroll scrollbar-hide'>
              <div ref={contentRef}>{children}</div>
            </div>
          </div>
        </main>
        <Player />
      </div>
    </>
  );
}
