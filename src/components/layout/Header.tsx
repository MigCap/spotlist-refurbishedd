import { Fragment, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';

import { useRouter } from 'next/router';

import { ChevronLeftIcon } from '@heroicons/react/outline';

import { useSession, signOut } from 'next-auth/react';

import { ChevronDownIcon } from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';
import { debounce as _debounce } from 'lodash';

function Header() {
  const { data: session } = useSession();

  const router = useRouter();

  const [clientWindowHeight, setClientWindowHeight] = useState<any>('');

  const handleScroll = useCallback((e: any) => {
    setClientWindowHeight(e.target.scrollTop);
  }, []);

  useEffect(() => {
    const container = document.querySelector('.main');
    if (typeof window !== 'undefined' && container) {
      container?.addEventListener('scroll', handleScroll);
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  });

  return (
    <header
      className={clsx(
        'duration-2000 sticky text-white top-0 transition-all z-50 motion-safe:animate-fadeIn',
        clientWindowHeight > 300 &&
          'bg-gradient-to-b from-gray-700 h-20 to-black animate-fadeIn'
      )}
      data-animate-type='motion-safe:animate-fadeIn'
    >
      <div className='absolute left-18 ml-6 text-white top-5'>
        <button
          type='button'
          onClick={() => router.pathname !== '/login' && router.back()}
          className='bg-black p-2 rounded-full'
        >
          <ChevronLeftIcon className='h-5 w-5' />
        </button>
      </div>
      <div className='absolute right-8 text-white top-5'>
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
            <Menu.Items className='absolute bg-gray-900 mt-2 origin-top-right right-0 ring-1 ring-black ring-opacity-5 rounded-md shadow-lg text-sm w-56 focus:outline-none'>
              <div className='cursor-pointer m-1 px-3 py-2 rounded-md hover:bg-gray-800'>
                <Menu.Item>
                  <h1>Profile</h1>
                  {/* <h1>
                    Good {getDayPart()},{' '}
                    <span className='pl-3'>{session?.user?.name}</span>
                  </h1> */}
                </Menu.Item>
              </div>
              <div className='cursor-pointer m-1 px-3 py-2 rounded-md hover:bg-gray-800'>
                <Menu.Item>
                  <div
                    className='flex items-center justify-between space-x-2'
                    onClick={() => signOut()}
                  >
                    <span className='opacity-80'>Log out</span>
                    {/* <LogoutIcon className='h-5 w-5' /> */}
                  </div>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
}

export default Header;

// const isBrowser = typeof window !== `undefined`;

// function getScrollPosition({ element, useWindow }: any) {
//   if (!isBrowser)
//     return {
//       x: 0,
//       y: 0,
//     };

//   const target = element ? element.current : document.body;
//   const position = target.getBoundingClientRect();

//   return useWindow
//     ? {
//         x: window.scrollX,
//         y: window.scrollY,
//       }
//     : {
//         x: position.left,
//         y: position.top,
//       };
// }

// export function useScrollPosition(
//   effect: any,
//   deps: any,
//   element: any,
//   useWindow: any,
//   wait: any
// ) {
//   const position = useRef(
//     getScrollPosition({
//       useWindow,
//     })
//   );
//   console.log(`🚀 ~ position`, position);

//   let throttleTimeout: any = null;

//   const callBack = () => {
//     const currPos = getScrollPosition({
//       element,
//       useWindow,
//     });
//     effect({
//       prevPos: position.current,
//       currPos,
//     });
//     position.current = currPos;
//     throttleTimeout = null;
//   };

//   useLayoutEffect(() => {
//     const handleScroll = () => {
//       if (wait) {
//         if (throttleTimeout === null) {
//           throttleTimeout = setTimeout(callBack, wait);
//         }
//       } else {
//         callBack();
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, deps);
// }

// function useNearScreen({ elRef }: any) {
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     let observer: any;

//     const onChange = (entries: any, observer: any) => {
//       const el = entries[0];
//       if (el.isIntersecting) {
//         setShow(true);
//         observer.disconnect();
//       }
//     };

//     Promise.resolve(
//       typeof IntersectionObserver !== 'undefined'
//         ? IntersectionObserver
//         : import('intersection-observer')
//     ).then(() => {
//       observer = new IntersectionObserver(onChange, {
//         rootMargin: '100px',
//       });

//       observer?.observe(elRef.current);
//     });

//     return () => {
//       observer && observer.disconnect();
//     };
//   });

//   return show;
// }
