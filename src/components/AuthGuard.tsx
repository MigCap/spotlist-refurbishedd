import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

function AuthGuard({ children }: any) {
  const { data: session, status } = useSession();

  const loading = status === 'loading';

  const hasUser = !!session?.user;

  const router = useRouter();

  useEffect(() => {
    if (!loading && !hasUser) {
      router.push('/login');
    }
  }, [hasUser, loading, router]);

  if (loading || !hasUser) {
    return (
      <div className='bg-gradient-to-b flex flex-col from-gray-800 items-center justify-center min-h-screen to-black w-full'>
        <div className='flex items-center justify-center'>
          <div className='animate-spin border-green-700 border-l-4 h-24 rounded-full w-24'></div>
        </div>
      </div>
    );
  }

  return children;
}

export default AuthGuard;
