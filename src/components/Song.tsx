import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import { millisToMinutesAndSeconds } from '@/lib/helper';

import CustomLink from '@/components/links/CustomLink';

// import useSpotify from '@/hooks/useSpotify';
import { currentTrackIdState, isPlayingTrackState } from '@/atoms/tracksAtom';

export interface ISong {
  id: string;
  order: number;
  name: string;
  artists: any[];
  duration_ms: number;
  album: {
    id: string;
    name: string;
    imageUrl: string;
  };
}

function Song({
  song: {
    id,
    order,
    name,
    artists,
    duration_ms,
    album: { id: albumId, name: albumName, imageUrl: albumImageUrl },
  },
}: {
  song: ISong;
}) {
  // const spotifyApi = useSpotify();
  const setCurrenTrackId = useSetRecoilState(currentTrackIdState);
  const setIsPlaying = useSetRecoilState(isPlayingTrackState);

  const playSong = useCallback(() => {
    setCurrenTrackId(id);
    // need to be a premium spotify account
    setIsPlaying(true);
    // spotifyApi.play({
    //   uris: [track.uri],
    // });
  }, [setCurrenTrackId, setIsPlaying, id]);

  return (
    <button onClick={playSong}>
      <div
        // style={{
        //   gridTemplateColumns: '45% 45% 10%',
        // }}
        className='auto-cols-max cursor-pointer grid grid-cols-[80%,20%] items-center px-5 py-4 rounded-lg text-gray-500 text-xs md:grid-cols-3 lg:text-base hover:bg-gray-900'
      >
        <div className='flex items-center space-x-2 md:space-x-4'>
          <p>{order + 1}</p>
          <img className='h-10 w-10' src={albumImageUrl} alt={albumName} />
          <div className='flex flex-col truncate'>
            <p className='text-left text-white truncate'>{name}</p>
            {/* Artists */}
            <div className='flex'>
              {artists?.slice(0, 2)?.map((artist: any) => (
                <CustomLink
                  href={`/artist/${artist?.name}`}
                  className='mr-2'
                  key={artist?.id || artist?.name}
                >
                  <p>{artist?.name}</p>
                </CustomLink>
              ))}
            </div>
          </div>
        </div>

        <div className='hidden mr-auto text-left truncate md:block md:pl-6'>
          <CustomLink href={`/album/${albumId}`}>
            <p className=''>{albumName}</p>
          </CustomLink>
        </div>

        <p className='ml-auto'>{millisToMinutesAndSeconds(duration_ms)}</p>
      </div>
    </button>
  );
}

export default Song;
