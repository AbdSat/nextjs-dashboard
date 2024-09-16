import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        return isLoggedIn;
      } else if (isLoggedIn)
        return NextResponse.redirect(new URL("/dashboard", nextUrl));

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
