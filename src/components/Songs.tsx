import { useRecoilValue } from 'recoil';

import { playlistState } from '@/atoms/playlistsAtom';

import Song from './Song';

function Songs() {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className='flex flex-col pb-18 px-2 space-y-1 text-white md:pl-2 md:px-8'>
      {playlist?.tracks?.items?.map((track: any, i: number) => (
        <Song key={track?.track?.id + i} track={track} order={i} />
      ))}
    </div>
  );
}

export default Songs;
