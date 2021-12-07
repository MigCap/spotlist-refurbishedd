import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import useSpotify from '@/hooks/useSpotify';

import TopSection from '@/components/layout/TopSection';
import Songs from '@/components/Songs';

import { playlistIdState, playlistState } from '@/atoms/playlistsAtom';

function Playlist() {
  const spotifyApi = useSpotify();

  const playlistId = useRecoilValue(playlistIdState);
  const setPlaylist = useSetRecoilState<any>(playlistState);

  const [showPlaylist, setShowPlaylist] = useState(false);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data: any) => {
        setPlaylist(data?.body);
        setShowPlaylist(true);
      })
      .catch((err) => console.log('Something went wrong', err));
  }, [spotifyApi, playlistId, setPlaylist]);

  if (!showPlaylist) return null;

  return (
    <>
      <TopSection />
      <Songs />
    </>
  );
}

export default Playlist;
