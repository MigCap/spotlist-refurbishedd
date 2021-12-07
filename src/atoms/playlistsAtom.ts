import { atom, RecoilState } from 'recoil';

export const playlistIdState: RecoilState<any> = atom({
  key: 'playlistIdState',
  default: '',
});
export const playlistState: RecoilState<any> = atom({
  key: 'playlistState',
  default: null,
});
export const playlistsState: RecoilState<any> = atom({
  key: 'playlistsState',
  default: null,
});
