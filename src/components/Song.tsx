import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import { millisToMinutesAndSeconds } from '@/lib/helper';

import CustomLink from '@/components/links/CustomLink';

// import useSpotify from '@/hooks/useSpotify';
import { currentTrackIdState, isPlayingState } from '@/atoms/songsAtom';

function Song({ order, track: { track } }: any) {
  // const spotifyApi = useSpotify();

  const setCurrenTrackId = useSetRecoilState(currentTrackIdState);
  const setIsPlaying = useSetRecoilState(isPlayingState);

  const playSong = useCallback(() => {
    setCurrenTrackId(track.id);
    // need to be a premium spotify account
    setIsPlaying(true);
    // spotifyApi.play({
    //   uris: [track.uri],
    // });
  }, [setCurrenTrackId, setIsPlaying, track.id]);

  return (
    <button onClick={playSong}>
      <div
        style={{
          gridTemplateColumns: '80% 20%',
        }}
        className='cursor-pointer grid px-5 py-4 rounded-lg text-gray-500 text-xs md:grid-cols-2 lg:text-base hover:bg-gray-900'
      >
        <div className='flex items-center space-x-2 md:space-x-4'>
          <p>{order + 1}</p>
          <img
            className='h-10 w-10'
            src={track?.album?.images?.[0]?.url}
            alt=''
          />
          <div className='flex flex-col truncate md:w-36 lg:w-64'>
            <p className='mr-auto text-white truncate'>{track?.name}</p>
            <div className='mr-auto'>
              <CustomLink href={`/artist/${track?.artists?.[0]?.name}`}>
                <p>{track?.artists?.[0]?.name}</p>
              </CustomLink>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between ml-auto'>
          <p className='hidden truncate w-40 md:inline hover:text-white hover:underline'>
            {track?.album?.name}
          </p>
          <p>{millisToMinutesAndSeconds(track?.duration_ms)}</p>
        </div>
      </div>
    </button>
  );
}

export default Song;
