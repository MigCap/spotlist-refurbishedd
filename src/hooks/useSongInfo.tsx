import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import useSpotify from '@/hooks/useSpotify';

import { currentTrackIdState } from '@/atoms/songsAtom';

function useSongInfo() {
  const spotifyApi = useSpotify();

  const currenTrackId = useRecoilValue(currentTrackIdState);
  const [songInfo, setSongInfo] = useState<any>(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      const trackInfo = await fetch(
        `https://api.spotify.com/v1/tracks/${currenTrackId}`,
        {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          },
        }
      ).then((res) => res.json());

      setSongInfo(trackInfo);
    };
    fetchSongInfo();
  }, [currenTrackId, spotifyApi]);

  return songInfo;
}

export default useSongInfo;
