import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import useSpotify from '@/hooks/useSpotify';

import TopSection from '@/components/layout/TopSection';
import Song from '@/components/Song';

import { playlistIdState, playlistState } from '@/atoms/playlistsAtom';

function Playlist() {
  const spotifyApi = useSpotify();

  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState<any>(playlistState);

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
      <TopSection
        imgUrl={playlist?.images?.[0]?.url}
        Content={() => (
          <>
            <p className='py-2 text-center md:p-0 md:text-left'>PLAYLIST</p>
            <h1 className='font-bold text-2xl md:text-3xl xl:text-5xl'>
              {playlist?.name}
            </h1>
          </>
        )}
      />
      <div className='songs-container'>
        {playlist?.tracks?.items?.map((track: any, i: number) => {
          const currTrack = track?.track;
          return (
            <Song
              key={currTrack?.id + i}
              song={{
                id: currTrack?.id,
                order: i + 1,
                name: currTrack?.name,
                artists: currTrack?.artists,
                duration_ms: currTrack?.duration_ms,
                album: {
                  id: currTrack?.album?.id,
                  name: currTrack?.album?.name,
                  imageUrl: currTrack?.album?.images?.[0]?.url,
                },
              }}
            />
          );
        })}
      </div>
    </>
  );
}

export default Playlist;
