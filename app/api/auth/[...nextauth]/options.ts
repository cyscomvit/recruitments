import prisma from "@/app/lib/db";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GoogleProvider({
      async profile(profile: any) {
        let userRole = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
          select: {
            role: true,
          },
        });

        if (userRole?.role === "admin") {
          userRole = "admin";
        } else if (userRole?.role === "super") {
          userRole = "super";
        } else {
          userRole = "user";
        }

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
        profile?.email?.endsWith("@vitstudent.ac.in") &&
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
        session.user.id = token.id;
      }

      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      });

      if (!user) {
        await prisma.user.create({
          data: {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            regno: session.user.regno,
            role: session.user.role,
          },
        });
      }

      return session;
    },
  },
};
