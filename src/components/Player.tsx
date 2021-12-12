import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline';
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid';
import { debounce } from 'lodash';
// import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import useSongInfo from '@/hooks/useSongInfo';
import useSpotify from '@/hooks/useSpotify';

import {
  currentTrackIdState,
  isPlayingTrackState,
  recentlyPlayedTracksState,
} from '@/atoms/tracksAtom';

function Player() {
  // const { data: session, status } = useSession();
  const spotifyApi = useSpotify();

  const [currenTrackId, setCurrenTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingTrackState);
  const recentlyPlayedTracks = useRecoilValue<any>(recentlyPlayedTracksState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  useEffect(() => {
    if (recentlyPlayedTracks && !songInfo?.id) {
      setCurrenTrackId(recentlyPlayedTracks?.[0]?.track?.id);
    }
  }, [recentlyPlayedTracks, setCurrenTrackId, songInfo]);

  const fetchCurrentSong = useCallback(() => {
    if (!songInfo) {
      // spotifyApi.getMyCurrentPlayingTrack().then((data) => {
      //   // console.log(`Now playing: ${data?.body?.item}`);
      //   setCurrenTrackId(data?.body?.item?.id);
      // });
      // spotifyApi.getMyCurrentPlaybackState().then((data) => {
      //   setIsPlaying(data?.body?.is_playing);
      // });
    }
  }, [songInfo]);

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currenTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currenTrackId, fetchCurrentSong, spotifyApi]);

  const handlePlayPause = useCallback(() => {
    // spotifyApi.getMyCurrentPlaybackState().then((data) => {
    //   if (data?.body?.is_playing) {
    //     // spotifyApi.pause();
    //     setIsPlaying(false);
    //   } else {
    //     // spotifyApi.play();
    //     setIsPlaying(true);
    //   }
    // });
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedAdjustVolume = useCallback(
    debounce((volume: any) => {
      // spotifyApi.setVolume(volume);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedAdjustVolume(volume);
  }, [debouncedAdjustVolume, volume]);

  return (
    <div className='bg-gradient-to-b bottom-0 from-black grid grid-cols-3 h-20 mt-auto px-1 sticky text-white text-xs to-gray-800 z-50 sm:h-24 sm:px-2 md:px-8 md:text-base'>
      {/* Left */}
      <div className='flex items-center justify-center space-x-2 sm:justify-start sm:space-x-4'>
        <img
          className='h-10 w-10'
          src={songInfo?.album?.images?.[0]?.url}
          alt=''
        />
        <div className='flex items-center overflow-hidden text-xs lg:text-base'>
          <div className='hidden sm:block'>
            <h3 className='truncate'>{songInfo?.name}</h3>
            <p className='text-gray-500'>{songInfo?.artists?.[0]?.name}</p>
          </div>
          <HeartIcon className='ml-1 player-button sm:ml-4' />
        </div>
      </div>

      {/* Center */}
      <div className='flex items-center justify-evenly px-1 sm:px-2'>
        <SwitchHorizontalIcon className='hidden player-button sm:block' />
        <RewindIcon
          // onClick={() => spotifyApi.skipToPrevious()} -- API not working
          className='player-button'
        />

        {isPlaying ? (
          <PauseIcon
            onClick={handlePlayPause}
            className='h-10 player-button w-10'
          />
        ) : (
          <PlayIcon
            onClick={handlePlayPause}
            className='h-10 player-button w-10'
          />
        )}

        <FastForwardIcon className='player-button' />
        <ReplyIcon className='hidden player-button sm:block' />
      </div>

      {/* Right */}
      <div className='flex items-center justify-end pr-5 space-x-3 md:space-x-4'>
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className='player-button'
        />
        <input
          className='w-14 md:w-28'
          type='range'
          value={volume}
          onChange={(e: any) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className='player-button'
        />
      </div>
    </div>
  );
}

export default Player;
