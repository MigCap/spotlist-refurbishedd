import { shuffle } from 'lodash';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { colors } from '@/lib/config';

import { playlistIdState } from '@/atoms/playlistsAtom';

function useRandomColor() {
  const [color, setColor] = useState<string | null | undefined>(null);
  const playlistId = useRecoilValue(playlistIdState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  return color;
}

export default useRandomColor;
