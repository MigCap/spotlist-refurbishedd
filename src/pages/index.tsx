import { shuffle } from 'lodash';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { getDayPart } from '@/lib/helper';
import useSpotify from '@/hooks/useSpotify';

import UnstyledLink from '@/components/links/UnstyledLink';
// import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

import { topArtistsState } from '@/atoms/artistsAtom';
import { playlistIdState, playlistsState } from '@/atoms/playlistsAtom';
import { recentlyPlayedTracksState } from '@/atoms/tracksAtom';

export default function HomePage() {
  const playlists = useRecoilValue(playlistsState);

  const setPlaylistId = useSetRecoilState(playlistIdState);
  const [topArtists, setTopArtists] = useRecoilState<any>(topArtistsState);
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useRecoilState<any>(
    recentlyPlayedTracksState
  );

  const spotifyApi = useSpotify();

  useEffect(() => {
    spotifyApi.getMyTopArtists().then(
      (data) => {
        let topArtists = data.body.items;

        const artistsUniqueIds = Array.from(
          new Set(topArtists?.map((artist: any) => artist?.id))
        );

        topArtists = topArtists?.filter((artist: any) =>
          artistsUniqueIds?.includes(artist?.id)
        );

        setTopArtists(topArtists);
      },
      (err) => {
        console.log('Something went wrong!', err);
      }
    );

    spotifyApi.getMyRecentlyPlayedTracks().then(
      (data) => {
        let recentlyPlayedTracks = data.body.items;

        const uniquePlayedTracksIds = Array.from(
          new Set(recentlyPlayedTracks?.map((track: any) => track?.track?.id))
        );

        recentlyPlayedTracks = recentlyPlayedTracks?.filter((track: any) =>
          uniquePlayedTracksIds?.includes(track?.track?.id)
        );

        setRecentlyPlayedTracks(recentlyPlayedTracks);
      },
      (err) => {
        console.log('Something went wrong!', err);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      <Seo templateTitle='Spotlists 2.0' />

      <div
        className={`bg-gradient-to-b flex flex-col from-gray-800 p-8 pl-7 pt-16 pb-24 text-white to-black`}
      >
        <h1 className='font-bold mb-4 mt-4 text-3xl xl:text-4xl'>
          Good {getDayPart()}
        </h1>
        <div className='gap-4 grid grid-cols-1 sm:grid-cols-2'>
          {playlists &&
            shuffle(playlists)
              ?.slice(0, 4)
              ?.map(({ id, name, images }: any, i: number) => (
                <UnstyledLink
                  key={id + i}
                  href={`/playlist/${id}`}
                  className=''
                  onClick={() => setPlaylistId(id)}
                >
                  <div className='bg-dark bg-opacity-80 cursor-pointer duration-2000 flex items-center rounded transition-all hover:bg-gray-700'>
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

        <h1 className='font-bold mb-3 mt-6 text-2xl xl:text-3xl'>
          Top artists
        </h1>
        <div className='gap-4 grid grid-cols-1 sm:grid-cols-3'>
          {topArtists &&
            shuffle(topArtists)
              ?.slice(0, 6)
              ?.map((artist: any, i: number) => {
                const { id, name, images } = artist;
                return (
                  <UnstyledLink
                    key={id + i}
                    href={`/artist/${name}?id=${id}`}
                    className='overflow-hidden'
                  >
                    <div className='bg-dark bg-opacity-80 cursor-pointer duration-2000 flex flex-col h-60 p-3 rounded transition-all sm:items-center hover:bg-gray-700'>
                      <div
                        className='flex h-[100%] items-center justify-center rounded w-[100%]'
                        style={{
                          backgroundImage: `url(${images?.[0]?.url})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          backgroundBlendMode: 'saturation',
                        }}
                      >
                        <h1 className='font-bold text-2xl'>{name}</h1>
                      </div>
                    </div>
                  </UnstyledLink>
                );
              })}
        </div>

        <h1 className='font-bold mb-3 mt-6 text-2xl xl:text-3xl'>
          Recently played tracks
        </h1>
        <div className='gap-4 grid grid-cols-1 sm:grid-cols-3'>
          {recentlyPlayedTracks &&
            shuffle(recentlyPlayedTracks)
              ?.slice(0, 6)
              ?.map(
                (
                  {
                    track: {
                      id,
                      name: trackName,
                      album: { id: albumId, name: albumName, images },
                    },
                  }: any,
                  i: number
                ) => (
                  <UnstyledLink
                    key={id + i}
                    href={`/album/${albumId}`}
                    className=''
                  >
                    <div className='bg-dark bg-opacity-80 cursor-pointer duration-2000 flex flex-col h-60 p-3 rounded transition-all hover:bg-gray-700'>
                      {/* <NextImage
                        alt={trackName}
                        width={200}
                        height={200}
                        src={images?.[0]?.url}
                        useSkeleton
                        className='h-50 rounded-bl-sm rounded-tl-sm'
                        imgClassName='h-50 rounded-bl-sm rounded-tl-sm'
                      /> */}
                      <div
                        className='flex h-[100%] items-center justify-center w-[100%]'
                        style={{
                          backgroundImage: `url(${images?.[0]?.url})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          backgroundBlendMode: 'saturation',
                        }}
                      />
                      {/* <img
                          className='h-20 rounded-bl-sm rounded-tl-sm'
                          src={images?.[0]?.url}
                          alt={trackName}
                        /> */}
                      <h1 className='font-bold pb-1 pt-4 self-start text-xs'>
                        {trackName}
                      </h1>
                      <p className='self-start text-[0.7rem] text-gray-400 truncate w-[100%]'>
                        {albumName}
                      </p>
                    </div>
                  </UnstyledLink>
                )
              )}
        </div>
      </div>
    </>
  );
}
