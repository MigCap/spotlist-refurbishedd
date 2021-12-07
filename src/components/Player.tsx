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
import { useRecoilState } from 'recoil';

import useSongInfo from '@/hooks/useSongInfo';
import useSpotify from '@/hooks/useSpotify';

import CustomLink from '@/components/links/CustomLink';

import { currentTrackIdState, isPlayingState } from '@/atoms/songsAtom';

function Player() {
  // const { data: session, status } = useSession();
  const spotifyApi = useSpotify();

  const [currenTrackId, setCurrenTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = useCallback(() => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        // console.log(`Now playing: ${data?.body?.item}`);
        // setCurrenTrackId(data?.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data?.body?.is_playing);
        });
      });
    }
  }, [setIsPlaying, songInfo, spotifyApi]);

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currenTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currenTrackId, fetchCurrentSong, spotifyApi]);

  const handlePlayPause = useCallback(() => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data?.body?.is_playing) {
        // spotifyApi.pause();
        setIsPlaying(false);
      } else {
        // spotifyApi.play();
        setIsPlaying(true);
      }
    });
  }, [setIsPlaying, spotifyApi]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      console.log(`🚀 ~ debouncedVolume ~ `, volume);
      // spotifyApi.setVolume(volume);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedAdjustVolume(volume);
  }, [debouncedAdjustVolume, volume]);

  return (
    <div className='bg-gradient-to-b from-black grid grid-cols-3 h-24 px-2 text-white text-xs to-gray-900 md:px-8 md:text-base'>
      {/* Left */}
      <div className='flex items-center space-x-4'>
        <img
          className='h-10 hidden w-10 md:inline'
          src={songInfo?.album?.images?.[0]?.url}
          alt=''
        />
        <div className='flex flex-col-end-1 items-center'>
          <div className='text-sm lg:text-base'>
            <h3>{songInfo?.name}</h3>
            <CustomLink href={`/artist/${songInfo?.artists?.[0]?.name}`}>
              <p className='text-gray-500 text-xs'>
                {songInfo?.artists?.[0]?.name}
              </p>
            </CustomLink>
          </div>
          <HeartIcon className='ml-4 player-button' />
        </div>
      </div>

      {/* Center */}
      <div className='flex items-center justify-evenly px-2'>
        <SwitchHorizontalIcon className='player-button' />
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
        <ReplyIcon className='player-button' />
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
