import { loginAction } from "@/actions/login/login.action";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const { user } = session;
      if (user) {
        try {
          await loginAction({
            email: user.email,
            avatarUrl: user.image,
            name: user.name,
            password: "zizu",
          });
        } catch (error) {
          console.error("Error en la acción de login:", error);
        }
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
