import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useSpotify from '@/hooks/useSpotify';

import TopSection from '@/components/layout/TopSection';

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

  function CustomTopSection({ color }: any) {
    return (
      <>
        <section
          className={`bg-gradient-to-b flex ${color} h-80 items-end p-8 space-x-7 text-white to-black`}
        >
          {album?.images?.[0]?.url && (
            <img
              className='h-44 shadow-2xl w-44'
              src={album?.images?.[0]?.url}
              alt=''
            />
          )}

          <div>
            {/* <p>PLAYLIST</p> */}
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
        </section>
      </>
    );
  }

  return (
    <>
      <TopSection CustomTopSection={CustomTopSection} />
      <div
        className={`flex flex-col p-8 pb-28 pl-7 pt-8 space-y-1 text-white bg-gradient-to-b from-gray-800 to-black`}
      >
        {album?.tracks?.items?.map(({ id, name, track_number }: any) => (
          <p key={id}>
            {track_number}. {name}
          </p>
        ))}
      </div>
    </>
  );
}

export default AlbumPage;
