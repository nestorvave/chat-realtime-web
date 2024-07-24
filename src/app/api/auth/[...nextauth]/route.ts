import { loginAction } from "@/actions/login/login.action";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log(session);
      const { user } = session;
      if (user) {
        try {
          const userN = await loginAction({
            email: user.email,
            avatarUrl: user.image,
            name: user.name,
            password: "zizu",
            isGoogle: true,
          });
          return userN;
        } catch (error) {
          console.error("Error en la acción de login:", error);
        }
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
