/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from 'react';

import useRandomColor from '@/hooks/useRandomColor';
import useSpotify from '@/hooks/useSpotify';

export function useArtist({ artistName, imgUrl, spotifyArtistId }: any) {
  const spotifyApi = useSpotify();

  const [artist, setArtistDetail] = useState<any>(null);
  const [artistAlbums, setArtistAlbums] = useState<any>(null);

  const imgUrlFromArtistState =
    artist?.name === artistName &&
    artist?.images?.find((img: any) => img?.height === 640)?.url;

  const imgs = [
    imgUrlFromArtistState,
    imgUrl,
    // artistInfoWithImg?.artists?.[0]?.strArtistThumb,
    // artistInfoWithImg?.artists?.[0]?.strArtistClearart,
    // artistInfoWithImg?.artists?.[0]?.strArtistFanart,
    // artistInfoWithImg?.artists?.[0]?.strArtistFanart2,
    // artistInfoWithImg?.artists?.[0]?.strArtistFanart3,
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

  const contentRef: any = useRef(null);
  const resetContentScrollPosition = useCallback(() => {
    // ref?.current?.scrollTo(0, 0);
    contentRef?.current?.scrollIntoView();
    // contentRef?.current?.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start',
    //   inline: 'nearest',
    // });
  }, []);

  useEffect(() => {
    resetContentScrollPosition();
    // Router.events.on('routeChangeComplete', resetContentScrollPosition);

    // return () => {
    //   Router.events.off('routeChangeComplete', resetContentScrollPosition);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { contentRef, sectionBackground, artistAlbums, imgs, topImgUrl };
}
