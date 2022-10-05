/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

// import { Router } from 'next/router';

import { encodeRFC5987ValueChars } from '@/lib/helper';

import UnstyledLink from '@/components/links/UnstyledLink';

import { useArtist } from './useArtist';

function ArtistPage({
  artistName,
  artistInfo,
  imgUrl,
  // artistInfoWithImg,
  spotifyArtistId,
}: any) {
  const { contentRef, sectionBackground, artistAlbums, imgs, topImgUrl } =
    useArtist({
      artistName,
      imgUrl,
      spotifyArtistId,
    });

  return (
    <div ref={contentRef}>
      <section
        className={`${sectionBackground} flex h-80 md:h-80 lg-96 items-end p-8 text-white overflow-hidden relative`}
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

        <h1 className='font-bold pt-3 text-2xl xl:text-3xl'>Popular albums</h1>

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
    </div>
  );
}

export default ArtistPage;

export async function getServerSideProps(context: any) {
  const {
    query: { name: artistName, id: spotifyArtistId },
  } = context;

  const encodedArtistsName: any = encodeRFC5987ValueChars(artistName);

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

  // const artistInfoWithImg = await fetch(
  //   `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodedArtistsName}`
  // ).then((res) => res?.json() ?? null);

  return {
    props: {
      artistName,
      artistInfo,
      // artistInfoWithImg,
      imgUrl,
      spotifyArtistId,
    },
  };
}
