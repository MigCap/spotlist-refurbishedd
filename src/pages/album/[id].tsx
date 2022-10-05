/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useSpotify from '@/hooks/useSpotify';

import TopSection from '@/components/layout/TopSection';
import Song from '@/components/Song';

function AlbumPage() {
  const {
    query: { id: albumId },
  } = useRouter();

  const spotifyApi = useSpotify();

  const [album, setAlbum] = useState<any>(null);

  useEffect(() => {
    albumId &&
      spotifyApi
        .getAlbum(albumId as string)
        .then((data: any) => {
          setAlbum(data?.body);
        })
        .catch((err) => console.log('Something went wrong', err));
  }, [spotifyApi, albumId]);

  return (
    <>
      <TopSection
        imgUrl={album?.images?.[0]?.url}
        Content={() => (
          <div className='py-3 text-center md:py-0 md:text-left'>
            <h1 className='font-bold text-2xl md:text-3xl xl:text-5xl'>
              {album?.name}
            </h1>
            {album?.artists?.map(({ id, name }: any) => (
              <h3 key={id} className='pt-1 text-1xl uppercase'>
                {name}
              </h3>
            ))}
            <p className='pt-3 text-sm uppercase'>LABEL: {album?.label}</p>
          </div>
        )}
      />
      <div className='songs-container'>
        {album?.tracks?.items?.map((track: any, i: number) => {
          const currTrack = track;
          return (
            <Song
              key={currTrack?.id + i}
              song={{
                id: currTrack?.id,
                order: currTrack?.track_number,
                name: currTrack?.name,
                artists: currTrack?.artists,
                duration_ms: currTrack?.duration_ms,
                album: {
                  id: currTrack?.album?.id,
                  name: currTrack?.album?.name,
                  imageUrl: album?.images?.find(
                    (image: any) => image?.height === 64
                  )?.url,
                },
              }}
            />
          );
        })}
      </div>
    </>
  );
}

export default AlbumPage;
