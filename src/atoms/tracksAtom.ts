import { atom } from 'recoil';

export const currentTrackIdState: any = atom({
  key: 'currentTrackIdState',
  default: null,
});
export const isPlayingTrackState = atom({
  key: 'isPlayingTrackState',
  default: false,
});
export const recentlyPlayedTracksState: any = atom({
  key: 'recentlyPlayedTracksState',
  default: null,
});
