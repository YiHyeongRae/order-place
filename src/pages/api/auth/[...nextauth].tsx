import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getSession } from "next-auth/react";
import Hash from "../../../../util/Hash";

interface userResData {
  user: {
    id: string | undefined;
    nickname: string | undefined;
    authority: string | undefined;
  };
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "login",
      name: "login",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(req: any) {
        // console.log("credentials,req", req);
        // Add logic here to look up the user from the credentials supplied

        const res = await axios.post("http://localhost:3000/api/user/login", {
          data: { id: req.userId, pw: req.hashedPw },
        });
        console.log("nextAuth", res.data);

        if (res.data.length === 0) {
          return null;
        } else {
          const user = { id: res.data.user_id, name: res.data.name };
          return user;
        }
      },
    }),
  ],
  // debug: true,
  session: {
    maxAge: 6 * 60 * 60, // 6 hours
    updateAge: 1 * 60 * 60, // 1 hours
  },
  jwt: {
    maxAge: 6 * 60 * 60, // 6 hours
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      // console.log(user, account, profile, email, credentials);
      // credential provider에서 return 해준 user 찍힘

      return true;
    },
    async redirect({ url, baseUrl }: any) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, account, user }: any) {
      if (account) {
        token.accessToken = account.access_token;
        // token 반환값

        // 필요시 토큰 수정 가능
      }
      return token;
    },
    async session({ session, token }: any) {
      session.token = token;

      // session 에서 기본적으로 user 반환 {email,image,name 최소 정보만 제공하도록 default}
      // 독스에서는 user 객체 수정은 session 콜백에서 하라고 되있네요

      // 필요시 user 객체 수정 가능
      // session.user.authority = token.authority;
      // session.user.mobile = token.mobile";
      // session.user.test = token.test;

      // session.accessToken = token.accessToken;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
