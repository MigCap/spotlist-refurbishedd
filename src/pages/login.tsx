import { getProviders, signIn } from 'next-auth/react';

// import NextImage from '@/components/NextImage';

function Login({ providers }: any) {
  return (
    <div className='bg-black flex flex-col items-center justify-center min-h-screen w-full'>
      {/* <NextImage
        width='52rem'
        height='52rem'
        src='/images/spotify-logo.png'
        alt='spotify-logo'
        useSkeleton
      /> */}
      <img
        className='mb-5 w-52'
        src='/images/spotify-logo.png'
        alt='spotify-logo'
      />
      {Object.values(providers).map((provider: any) => {
        return (
          <div key={provider.name}>
            <button
              className='bg-[#18D860] duration-500 p-5 rounded-full shadow-md text-white transform transition motion-safe:hover:scale-110 focus:outline-none'
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              Login with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
