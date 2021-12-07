import { useSession } from 'next-auth/react';

import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Player from '@/components/Player';

export default function Layout({ children }: { children: React.ReactNode }) {
  // const { data: session, status } = useSession();
  const { data: session } = useSession();

  // Put Header or Footer Here

  if (!session) return null;

  return (
    <>
      <div className='bg-black h-screen overflow-hidden'>
        <main className='flex'>
          <Sidebar />
          <div className='flex-grow h-screen main overflow-y-scroll scrollbar-hide'>
            <Header />
            {children}
          </div>
        </main>

        <div className='bottom-0 sticky'>
          <Player />
        </div>
      </div>
    </>
  );
}
