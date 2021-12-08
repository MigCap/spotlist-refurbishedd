// import clsx from 'clsx';
// import { shuffle } from 'lodash';
// import { useRouter } from 'next/router';
// import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// import { colors, routesConfig } from '@/lib/config';
import { getDayPart } from '@/lib/helper';
import useSpotify from '@/hooks/useSpotify';

import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

import { topArtistsState } from '@/atoms/artistsAtom';
import { playlistIdState, playlistsState } from '@/atoms/playlistsAtom';
import { recentlyPlayedTracksState } from '@/atoms/songsAtom';

// export default function HomePage() {
//   const playlists = useRecoilValue(playlistsState);
//   const setPlaylistId = useSetRecoilState(playlistIdState);
//   const [topArtist, setTopArtists] = useRecoilState<any>(topArtistsState);
//   const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useRecoilState<any>(
//     recentlyPlayedTracksState
//   );

//   const spotifyApi = useSpotify();

//   useEffect(() => {
//     spotifyApi
//       .getMyTopArtists({
//         limit: 6,
//       })
//       .then(
//         function (data) {
//           const topArtists = data.body.items;
//           setTopArtists(topArtists);
//         },
//         function (err) {
//           console.log('Something went wrong!', err);
//         }
//       );
//     spotifyApi
//       .getMyRecentlyPlayedTracks({
//         limit: 6,
//       })
//       .then(
//         function (data) {
//           const recentlyPlayedTracks = data.body.items;
//           setRecentlyPlayedTracks(recentlyPlayedTracks);
//         },
//         function (err) {
//           console.log('Something went wrong!', err);
//         }
//       );
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <>
//       {/* <Seo templateTitle='Home' /> */}
//       <Seo templateTitle='Spotlists 2.0' />

//       <div
//         className={`bg-gradient-to-b flex flex-col from-gray-800  p-8 pl-7 pt-16 pb-32 text-white to-black`}
//       >
//         <h1 className='font-bold mb-4 mt-4 text-2xl md:text-2xl xl:text-3xl'>
//           Good {getDayPart()}
//         </h1>
//         <div className='gap-4 grid grid-cols-2'>
//           {playlists?.slice(0, 4)?.map(({ id, name, images }: any) => (
//             <UnstyledLink
//               key={id + name}
//               href={`/playlist/${id}`}
//               className=''
//               onClick={() => setPlaylistId(id)}
//             >
//               <div className='bg-dark bg-opacity-80 cursor-pointer duration-2000 flex items-center rounded transition-all hover:bg-gray-700'>
//                 <img
//                   className='h-14 min-h-[4rem] min-w-[4rem] rounded-bl-sm rounded-tl-sm w-14'
//                   src={images?.[0]?.url}
//                   alt=''
//                 />
//                 <h1 className='font-bold pl-4 text-xs'>{name}</h1>
//               </div>
//             </UnstyledLink>
//           ))}
//         </div>
//         <h1 className='font-bold mb-4 mt-8 text-1xl md:text-1xl xl:text-2xl'>
//           Recently played tracks
//         </h1>
//         <div className='gap-4 grid grid-cols-3'>
//           {recentlyPlayedTracks?.slice(0, 6)?.map(
//             ({
//               track: {
//                 id,
//                 name: trackName,
//                 album: { id: albumId, name: albumName, images },
//               },
//             }: any) => (
//               <UnstyledLink
//                 key={id + trackName}
//                 href={`/album/${albumId}`}
//                 className='overflow-hidden'
//                 onClick={() => setPlaylistId(id)}
//               >
//                 <div className='bg-dark bg-opacity-80 cursor-pointer duration-2000 flex flex-col h-60 items-center p-3 rounded transition-all hover:bg-gray-700'>
//                   <img
//                     className='h-50 rounded-bl-sm rounded-tl-sm'
//                     src={images?.[0]?.url}
//                     alt=''
//                   />
//                   <h1 className='font-bold pb-1 pt-4 self-start text-xs'>
//                     {trackName}
//                   </h1>
//                   <p className='self-start text-[0.7rem] truncate w-40'>
//                     {albumName}
//                   </p>
//                 </div>
//               </UnstyledLink>
//             )
//           )}
//         </div>
//         <h1 className='font-bold mb-4 mt-8 text-1xl md:text-1xl xl:text-2xl'>
//           Top artists
//         </h1>
//         <div className='gap-4 grid grid-cols-3'>
//           {topArtist?.slice(0, 6)?.map(({ id, name, genres, images }: any) => (
//             <UnstyledLink
//               key={id}
//               href={`/artist/${name}`}
//               className='overflow-hidden'
//               onClick={() => setPlaylistId(id)}
//             >
//               <div className='bg-dark bg-opacity-80 cursor-pointer duration-2000 flex flex-col h-60 items-center p-3 rounded transition-all hover:bg-gray-700'>
//                 <img
//                   className='h-50 rounded-bl-sm rounded-tl-sm'
//                   src={images?.[0]?.url}
//                   alt=''
//                 />
//                 <h1 className='font-bold pb-1 pt-4 self-start text-xs'>
//                   {name}
//                 </h1>
//                 <div className='flex self-start truncate'>
//                   {genres?.map((genre: any) => (
//                     <p key={id + genre} className='mr-1 text-[0.7rem]'>
//                       {genre}
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             </UnstyledLink>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
export default function HomePage() {
  return (
    <>
      {/* <Seo templateTitle='Home' /> */}
      {/* <Seo templateTitle='Spotlists 2.0' /> */}

      <h1>Home page</h1>
    </>
  );
}
