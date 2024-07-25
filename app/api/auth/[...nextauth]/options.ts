import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GoogleProvider({
      profile(profile: any) {
        let userRole = "user";

        if (profile.email.endsWith("@gmail.com")) {
          userRole = "admin";
        }

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  theme: {
    logo: "/cyscom-logo.png", // Absolute URL to image
  },
  callbacks: {
    async signIn({ profile }: any) {
      if (
        // profile?.email?.endsWith("@vitstudent.ac.in") &&
        profile?.email_verified
      ) {
        return true;
      } else {
        return false;
      }
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};
