// import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { encodeRFC5987ValueChars } from '@/lib/helper';
import useRandomColor from '@/hooks/useRandomColor';

// import useSpotify from '@/hooks/useSpotify';
import { artistState } from '@/atoms/artistsAtom';

function ArtistPage({
  artistName,
  artistInfo,
  imgUrl,
  artistInfoWithImg,
}: any) {
  // const spotifyApi = useSpotify();

  const artist: any = useRecoilValue(artistState);

  const imgUrlFromArtistState = artist?.images?.find(
    (img: any) => img?.height === 640
  )?.url;

  // const [artistAlbums, setartistAlbums] = useState<any>(null);

  const imgs = [
    imgUrlFromArtistState,
    imgUrl,
    artistInfoWithImg?.artists?.[0]?.strArtistThumb,
    artistInfoWithImg?.artists?.[0]?.strArtistClearart,
    artistInfoWithImg?.artists?.[0]?.strArtistFanart,
    artistInfoWithImg?.artists?.[0]?.strArtistFanart2,
    artistInfoWithImg?.artists?.[0]?.strArtistFanart3,
  ].filter((img) => img);

  const color = useRandomColor();

  // useEffect(() => {
  //   if (artist?.id) {
  //     spotifyApi.getArtistAlbums(artist?.id).then(
  //       (data) => {
  //         let artistAlbums = data?.body?.items;

  //         const albumsUniqueIds = Array.from(
  //           new Set(artistAlbums?.map((album: any) => album?.id))
  //         );

  //         artistAlbums = artistAlbums?.filter((album: any) =>
  //         albumsUniqueIds?.includes(album?.id)
  //         );

  //         setartistAlbums(artistAlbums);
  //       },
  //       (err) => {
  //         console.log('Something went wrong!', err);
  //       }
  //     );
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <section
        className={`bg-gradient-to-b flex ${color} h-80 md:h-96 items-end p-8 space-x-7 text-white to-black`}
        style={
          imgs?.[0] && {
            // background: `top 50% center / cover fixed  no-repeat url(${
            //   imgs?.length > 1 ? imgs?.[1] : imgs?.[0]
            // })`,
            background: `url(${
              imgs?.length > 1 ? imgs?.[1] : imgs?.[0]
            }) no-repeat`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }
        }
      >
        <div>
          <h1
            className={`font-bold ${
              artistName?.length > 8 ? 'text-5xl' : 'text-7xl'
            }`}
          >
            {artistName}
          </h1>
          <div className='flex pt-3 text-sm'>
            <p>
              {artistInfo?.artist?.tags?.tag
                ?.map?.(({ name }: any) => name)
                .join(' - ')}
            </p>
          </div>
        </div>
      </section>

      <div
        className={`flex flex-col p-8 pb-28 pl-7 md:pb-44 pt-8 space-y-1 text-white bg-gradient-to-b from-gray-800 to-black`}
      >
        <p className='pt-0 py-5'>
          {artistInfo?.artist?.bio?.summary.startsWith(' <')
            ? 'No summary available'
            : artistInfo?.artist?.bio?.summary}
        </p>
        <div className='gap-4 grid grid-cols-2'>
          {imgs &&
            imgs
              ?.slice(0, 4)
              ?.map((url: string) => (
                <img key={url} className='shadow-2xl' src={url} alt='' />
              ))}
        </div>
        <p className='pt-10 py-3'>
          {artistInfo?.artist?.bio?.content || 'No info available'}
        </p>
      </div>
    </>
  );
}

export default ArtistPage;

export async function getServerSideProps(context: any) {
  const {
    params: { name: artistName },
  } = context;

  const encodedArtistsName = encodeRFC5987ValueChars(artistName);

  const artistInfo = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodedArtistsName}&api_key=${process.env.LAST_FM_KEY}&format=json`
  ).then((res) => res.json());

  const mbid = artistInfo?.artist?.mbid;

  const musicbrainzUrl =
    'https://musicbrainz.org/ws/2/artist/' + mbid + '?inc=url-rels&fmt=json';

  const imgUrl =
    (mbid &&
      (await fetch(musicbrainzUrl)
        .then((res) => res.json())
        .then((out) => {
          const relations = out.relations;
          // console.table(relations);

          // Find image relation
          for (let i = 0; i < relations.length; i++) {
            if (relations[i].type === 'image') {
              let image_url = relations[i].url.resource;
              if (
                image_url.startsWith('https://commons.wikimedia.org/wiki/File:')
              ) {
                const filename = image_url.substring(
                  image_url.lastIndexOf('/') + 1
                );
                image_url =
                  'https://commons.wikimedia.org/wiki/Special:Redirect/file/' +
                  filename;
              }
              return image_url;
            }
          }
        })
        .catch((err) => {
          throw console.log(err);
        }))) ??
    null;

  const artistInfoWithImg = await fetch(
    `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodedArtistsName}`
  ).then((res) => res?.json() ?? null);

  return {
    props: {
      artistName,
      artistInfo,
      artistInfoWithImg,
      imgUrl,
    },
  };
}
