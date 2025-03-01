import NextAuth, { DefaultSession } from "next-auth"
//import GitHub from "next-auth/providers/github"
//import Google from "next-auth/providers/google"
import { SanityAdapter } from "./adapters/sanity-adapter"
import authConfig from "./auth.config"

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id?: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}
 
export const { auth, handlers, signIn, signOut} = NextAuth({
  //providers: [GitHub, Google],
  ...authConfig,
  session: { strategy: "jwt" },
  adapter:SanityAdapter,
  pages:{signIn:'/auth/sign-in'},
  secret:process.env.NEXT_AUTH_SECRET,
  callbacks: {
    session({ session, token }) {
        session.user.id = token.sub as string;
        console.log('session', session, 'token', token);
      return session
    }
  },
})