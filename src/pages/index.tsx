import clsx from 'clsx';
import { shuffle } from 'lodash';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { colors, routesConfig } from '@/lib/config';
import { getDayPart } from '@/lib/helper';
import useSpotify from '@/hooks/useSpotify';

import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import { playlistIdState, playlistsState } from '@/atoms/playlistsAtom';

export default function HomePage() {
  const playlists = useRecoilValue(playlistsState);
  const setPlaylistId = useSetRecoilState(playlistIdState);

  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo templateTitle='Spotlists 2.0' />

      <div
        className={`bg-gradient-to-b flex flex-col from-gray-700 min-h-screen p-8 pl-7 pt-16 text-white to-black`}
      >
        <h1 className='font-bold mb-4 mt-4 text-2xl md:text-2xl xl:text-3xl'>
          Good {getDayPart()}
        </h1>

        <div className='gap-4 grid grid-cols-2'>
          {playlists
            ?.slice(0, 4)
            ?.map(({ id, name, images }: any, i: number) => (
              <UnstyledLink
                key={id + name}
                href={`/playlist/${id}`}
                className=''
                onClick={() => setPlaylistId(id)}
              >
                <div className='bg-dark bg-opacity-80 cursor-pointer flex items-center rounded hover:bg-gray-700'>
                  <img
                    className='h-14 min-h-[4rem] min-w-[4rem] rounded-bl-sm rounded-tl-sm w-14'
                    src={images?.[0]?.url}
                    alt=''
                  />
                  <h1 className='font-bold pl-4 text-xs'>{name}</h1>
                </div>
              </UnstyledLink>
            ))}
        </div>
      </div>
    </>
  );
}
