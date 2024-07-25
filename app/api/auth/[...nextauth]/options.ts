import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GoogleProvider({
      profile(profile: any) {
        let userRole = "user";

        if (profile.email.endsWith("@gmail.com")) {
          userRole = "admin";
        }

        console.log(profile);

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
          regno: profile.family_name,
          name: profile.given_name,
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
        token.regno = user.regno;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.regno = token.regno;
        session.user.name = token.name;
      }
      return session;
    },
  },
};
