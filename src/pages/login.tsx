import { getProviders, signIn } from 'next-auth/react';

// import NextImage from '@/components/NextImage';

function Login({ providers }: any) {
  return (
    <div className='bg-black flex flex-col items-center justify-center min-h-screen w-full'>
      <img
        className='mb-5 w-40'
        src='/images/spotify-logo.png'
        alt='spotify-logo'
      />
      <h1 className='font-bold mb-5 py-5 text-2xl text-white'>
        Spotify clone v2.0
      </h1>
      {Object.values(providers).map((provider: any) => {
        return (
          <div key={provider.name}>
            <button
              className='bg-[#18D860] duration-500 p-5 rounded-full shadow-md text-white transform transition motion-safe:hover:scale-110 focus:outline-none'
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: '/',
                })
              }
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
