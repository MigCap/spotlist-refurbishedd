import {
  // RssIcon,
  ColorSwatchIcon,
  HeartIcon,
  HomeIcon,
  // LibraryIcon,
  PlusCircleIcon,
  SearchIcon,
} from '@heroicons/react/outline';

export const routesConfig = [
  {
    id: 'home',
    name: 'Home',
    path: '/',
    Icon: HomeIcon,
  },
  {
    id: 'search',
    name: 'Search',
    // path: '/search',
    Icon: SearchIcon,
  },
  {
    id: 'yourLibrary',
    name: 'Your Library',
    // path: '/library',
    // Icon: LibraryIcon,
    Icon: ColorSwatchIcon,
  },
  {
    id: 'createPlaylist',
    name: 'Create Playlist',
    // path: '/create-playlist',
    Icon: PlusCircleIcon,
  },
  {
    id: 'likedSongs',
    name: 'Liked Songs',
    // path: '/liked-songs',
    Icon: HeartIcon,
  },
  // {
  //   id: 'yourEpisodes',
  //   name: 'Your Episodes',
  //   // path: '/your-episodes',
  //   Icon: RssIcon,
  // },
  {
    id: 'playlist',
    name: 'playlist',
    path: '/playlist',
    // Icon: false,
  },
  {
    id: 'artist',
    name: 'artist',
    path: '/artist',
    // Icon: false,
  },
];

export const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-purple-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];
