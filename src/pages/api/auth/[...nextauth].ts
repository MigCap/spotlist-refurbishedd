import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

import spotifyApi, { LOGIN_URL } from '@/lib/spotify';

const dateNow = Date.now();

async function refreshAccessToken(token: any) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: dateNow + refreshedToken?.expires_in * 1000, // = 1 hour as 3600 returns from spotify API
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
      // Replace if new one came back else fall back to old refresh token
    };
  } catch (error) {
    console.log(`refreshAccessToken ~ error`, error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as any,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as any,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   if (url.startsWith(baseUrl)) return url;
    //   // Allows relative callback URLs
    //   else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
    //   return baseUrl;
    // },

    async redirect({ url, baseUrl }) {
      console.log(`🚀 ~ redirect ~ baseUrl`, baseUrl);
      console.log(`🚀 ~ redirect ~ url`, url);
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },

    async jwt({ token, account, user }: any) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, // convert to seconds
        };
      }

      // Return previous token if the access token has not expired yet
      if (dateNow < token.accessTokenExpires) {
        console.log('EXISTING ACCESS TOKEN IS VALID');
        return token;
      }

      // Refresh token has expired, so we need to get a new one
      console.log('EXISTING TOKEN HAS EXPIRED, REFRESHING...');
      return await refreshAccessToken(token);
    },

    async session({ session, token }: any) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
