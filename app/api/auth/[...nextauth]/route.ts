import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (
        profile?.email?.endsWith("@vitstudent.ac.in") &&
        profile?.email_verified
      ) {
        return true;
      } else {
        return false;
      }
    },
    async session({ session }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };
