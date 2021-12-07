import { shuffle } from 'lodash';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { colors } from '@/lib/config';

import { playlistIdState, playlistState } from '@/atoms/playlistsAtom';

function TopSection({ CustomTopSection }: any) {
  const [color, setColor] = useState<string | null | undefined>(null);
  const playlistId = useRecoilValue(playlistIdState);
  const playlist = useRecoilValue<any>(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  if (CustomTopSection) return <CustomTopSection color={color} />;

  return (
    <>
      <section
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
      </section>
    </>
  );
}

export default TopSection;
