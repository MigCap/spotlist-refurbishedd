import Songs from '@/components/Songs';

function Center() {
  return <Songs />;

  // return (
  {
    /* <header className='absolute right-8 text-white top-5'>
        <Menu as='div' className='inline-block relative text-left'>
          <div>
            <Menu.Button>
              <div className='bg-gray-900 cursor-pointer flex items-center opacity-90 p-1 rounded-full space-x-3 hover:opacity-80'>
                <img
                  className='h-8 rounded-full w-8 lg:h-10 lg:w-10'
                  src={session?.user?.image as string}
                  alt={session?.user?.image as string}
                />
                <div className='hidden pr-2 lg:flex lg:items-center'>
                  <h2>{session?.user?.name}</h2>
                  <ChevronDownIcon className='h-5 ml-2 w-5' />
                </div>
              </div>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute bg-black mt-2 origin-top-right right-0 ring-1 ring-black ring-opacity-5 rounded-md shadow-lg w-56 focus:outline-none'>
              <div className='px-3 py-2 rounded-md'>
                <Menu.Item>
                  <h1>
                    Good {getDayPart()},{' '}
                    <span className='pl-3'>{session?.user?.name}</span>
                  </h1>
                </Menu.Item>
              </div>
              <div className='cursor-pointer px-3 py-2 rounded-md hover:bg-gray-900'>
                <Menu.Item>
                  <div
                    className='flex items-center justify-between space-x-2'
                    onClick={() => signOut()}
                  >
                    <span className='opacity-80'>Log out</span>
                  </div>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </header> */
  }

  {
    /* <LogoutIcon className='h-5 w-5' /> */
  }

  {
    /* <section
        className={`bg-gradient-to-b flex ${color} h-80 items-end p-8 space-x-7 text-white to-black`}
      >
        <img
          className='h-44 shadow-2xl w-44'
          src={playlist?.images?.[0]?.url}
          alt=''
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className='font-bold text-2xl md:text-3xl xl:text-5xl'>
            {playlist?.name}
          </h1>
        </div>
      </section> */
  }

  // );
}

export default Center;
