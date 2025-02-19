import { loginAction } from "@/actions/login/login.action";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      const { user } = session;
      console.log(user)
      if (user) {
        try {
          const userN = await loginAction({
            email: user.email,
            avatarUrl: user.image,
            name: user.name,
            password: "1234",
            isGoogle: true,
          });
          console.log(userN)
          const cookieStore = cookies();
          cookieStore.set("token", userN?.token);
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
