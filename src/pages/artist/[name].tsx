import { useEffect, useState } from 'react';

import { encodeRFC5987ValueChars } from '@/lib/helper';
import useRandomColor from '@/hooks/useRandomColor';
import useSpotify from '@/hooks/useSpotify';

import UnstyledLink from '@/components/links/UnstyledLink';

function ArtistPage({
  artistName,
  artistInfo,
  imgUrl,
  artistInfoWithImg,
  spotifyArtistId,
}: any) {
  const spotifyApi = useSpotify();

  const [artist, setArtistDetail] = useState<any>(null);
  const [artistAlbums, setArtistAlbums] = useState<any>(null);

  const imgUrlFromArtistState =
    artist?.name === artistName &&
    artist?.images?.find((img: any) => img?.height === 640)?.url;

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

  useEffect(() => {
    if (spotifyArtistId) {
      spotifyApi.getArtist(spotifyArtistId).then(
        (data) => {
          const artist = data?.body;

          setArtistDetail(artist);
        },
        (err) => {
          console.log('Something went wrong!', err);
        }
      );
      spotifyApi.getArtistAlbums(spotifyArtistId).then(
        (data) => {
          const artistAlbums = data?.body?.items;

          const uniqueAlbums = artistAlbums?.reduce((acc: any, album: any) => {
            const isAlbumAlreadyAdded = acc.some(
              (accAlbum: any) => accAlbum.name === album.name
            );

            if (!isAlbumAlreadyAdded) {
              acc = [...acc, album];
            }

            return acc;
          }, []);

          setArtistAlbums(uniqueAlbums);
        },
        (err) => {
          console.log('Something went wrong!', err);
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const topImgUrl = imgs?.length > 1 ? imgs?.[1] : imgs?.[0];

  const sectionBackground = topImgUrl
    ? `bg-black`
    : `bg-gradient-to-b ${color} to-black`;

  return (
    <>
      <section
        className={`${sectionBackground} flex h-80 md:h-80 lg-96 items-end p-8 space-x-7 text-white overflow-hidden relative`}
      >
        <img
          className='absolute h-auto left-0 opacity-[0.4] top-0 w-full'
          src={topImgUrl}
          alt=''
        />
        <div className='relative'>
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

      <div className='bg-gradient-to-b from-gray-800 p-8 pb-28 pl-7 pt-8 text-white to-black md:pb-48'>
        <div className={`flex flex-col space-y-1`}>
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

        <div className='gap-4 grid grid-cols-2 pt-8 md:gap-6 md:grid-cols-3'>
          {artistAlbums?.slice(0, 9)?.map(({ id, images, name }: any) => {
            const imgUrl = images?.find((img: any) => img?.height === 300)?.url;
            return (
              <UnstyledLink key={id} href={`/album/${id}`} className=''>
                <div className='flex flex-col group items-center justify-center'>
                  <img className='shadow-2xl' src={imgUrl} alt='' />
                  <p className='px-0 py-3 text-center text-sm lg:text-base group-hover:underline'>
                    {name}
                  </p>
                </div>
              </UnstyledLink>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ArtistPage;

export async function getServerSideProps(context: any) {
  const {
    query: { name: artistName, id: spotifyArtistId },
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
      spotifyArtistId,
    },
  };
}
