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

  if (CustomTopSection)
    return (
      <>
        <CustomTopSection color={color} />
      </>
    );

  return (
    <>
      <section
        className={`bg-gradient-to-b flex flex-col ${color} md:h-96 items-center py-3 px-8 md:p-8 pt-20 md:space-x-7 text-white to-black md:flex-row`}
      >
        <img
          className='h-[90%] shadow-2xl w-[90%] md:h-44 md:w-44'
          src={playlist?.images?.[0]?.url}
          alt=''
        />
        <div className='my-1'>
          <p className='py-2 text-center md:p-0 md:text-left'>PLAYLIST</p>
          <h1 className='font-bold text-2xl md:text-3xl xl:text-5xl'>
            {playlist?.name}
          </h1>
        </div>
      </section>
    </>
  );
}

export default TopSection;
