import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { routesConfig } from '@/lib/config';
import useSpotify from '@/hooks/useSpotify';

import UnstyledLink from '@/components/links/UnstyledLink';

import { playlistIdState, playlistsState } from '@/atoms/playlistsAtom';

function Sidebar({ className }: { className?: string }) {
  const { data: session } = useSession();

  const spotifyApi = useSpotify();

  const router = useRouter();
  const {
    pathname,
    query: { id: queryPlaylistId },
  } = router;

  const [playlists, setPlaylists] = useRecoilState(playlistsState);
  const setPlaylistId = useSetRecoilState(playlistIdState);

  useEffect(() => {
    if (session && spotifyApi && spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data: any) => {
        setPlaylists(data?.body?.items);
        queryPlaylistId && setPlaylistId(queryPlaylistId);
      });
    }
  }, [queryPlaylistId, session, setPlaylistId, setPlaylists, spotifyApi]);

  const isSelected = useCallback(
    (path: string) => {
      if (pathname === path) {
        return true;
      }
    },
    [pathname]
  );

  return (
    <>
      <div
        className={`border-gray-900 border-r p-4 text-gray-500 text-xs lg:text-sm ${className}`}
      >
        <div>
          <img
            className='mb-5 px-5 py-0'
            src='/images/Spotify_Logo_CMYK_White.png'
            alt='spotify-logo'
          />
          {/* Menu... */}
          <div>
            {routesConfig?.map(({ id, name, path, Icon }, i: number) => {
              if (path && Icon) {
                return (
                  <UnstyledLink
                    key={id}
                    href={path}
                    className={clsx(
                      'cursor-pointer flex items-center p-2 space-x-2 hover:text-white',
                      isSelected(path) &&
                        'bg-gray-900 rounded-md text-white font-bold',
                      i === 2 && 'mb-2'
                    )}
                  >
                    <Icon className='h-5 w-5' />
                    <p>{name}</p>
                  </UnstyledLink>
                );
              }
              if (!path && Icon) {
                return (
                  <div
                    key={id}
                    className={clsx(
                      'cursor-pointer flex items-center p-2 space-x-2 hover:text-white',
                      i === 2 && 'mb-2'
                    )}
                  >
                    <Icon className='h-5 w-5' />
                    <p>{name}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>

          <hr className='border-gray-700 border-t-[0.1px]' />

          {/* Playlists... */}
          <div className='h-2/3 overflow-y-scroll pb-20 scrollbar-hide space-y-4'>
            {playlists?.map((playlist: any) => (
              <UnstyledLink
                key={playlist?.id}
                href={`/playlist/${playlist?.id}`}
                className='flex items-center my-2 space-x-2 hover:text-white'
                onClick={() => setPlaylistId(playlist?.id)}
              >
                <p
                  className={clsx(
                    playlist?.id === queryPlaylistId && 'text-white'
                  )}
                >
                  {playlist?.name}
                </p>
              </UnstyledLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
