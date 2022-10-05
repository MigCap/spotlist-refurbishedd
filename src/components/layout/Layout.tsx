import { useSession } from 'next-auth/react';

import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Player from '@/components/Player';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <>
      <div className='bg-black h-screen overflow-hidden'>
        <main className='flex h-screen'>
          <Sidebar className='hidden sm:w-1/5 md:inline-flex lg:w-1/4' />
          <div className='w-4/5 lg:w-3/4'>
            <Header />
            <div className='flex-grow h-screen main overflow-y-scroll scrollbar-hide'>
              <div className='children'>{children}</div>
            </div>
          </div>
        </main>
        <Player />
      </div>
    </>
  );
}
