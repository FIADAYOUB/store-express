import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import GoogleProvider from '@auth/core/providers/google';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_ID, GITHUB_SECRET } from '$env/static/private';

export const handle = SvelteKitAuth({
	providers: [
		GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
		GoogleProvider({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
	],
  callbacks: {
    jwt({ token, user, profile }) {
      if (user) {
				console.log({user});
				console.log({profile});
        token.id = user?.id;
      }
      return token;
    },
    async session({ session, token, user }) {
			session.user.id = token.id

			return session
		}
  },
});