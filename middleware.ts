import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AppConfig } from "@/core/config";
import {
  ADMIN_LOGIN_ROUTE,
  CLIENT_LOGIN_ROUTE,
  HOME_ROUTE,
} from "@/core/routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookie = request.cookies;

  const authSession = cookie.get(AppConfig.authSession)?.value;

  if (pathname.startsWith("/admin")) {
    if (!authSession) {
      return NextResponse.redirect(
        new URL(ADMIN_LOGIN_ROUTE, AppConfig.AppOrigin)
      );
    }

    const parsedSession = JSON.parse(authSession);
    const role = parsedSession.role;

    if (role !== "user") {
      return NextResponse.redirect(
        new URL(ADMIN_LOGIN_ROUTE, AppConfig.AppOrigin)
      );
    }
  } else if (pathname.startsWith("/client")) {
    if (!authSession) {
      return NextResponse.redirect(
        new URL(CLIENT_LOGIN_ROUTE, AppConfig.AppOrigin)
      );
    }

    const parsedSession = JSON.parse(authSession);
    const role = parsedSession.role;

    if (role !== "client") {
      return NextResponse.redirect(
        new URL(ADMIN_LOGIN_ROUTE, AppConfig.AppOrigin)
      );
    }
  }

  // if (pathname.startsWith("/admin")) {
  //   const adminToken = cookie.get(AppConfig.authSession)?.value;

  //   if (!adminToken) {
  //     return NextResponse.redirect(
  //       new URL(ADMIN_LOGIN_ROUTE, AppConfig.AppOrigin)
  //     );
  //   }
  // } else if (pathname.startsWith("/client")) {
  //   const clientSession = cookie.get(AppConfig.authSession)?.value;

  //   if (!clientSession) {
  //     return NextResponse.redirect(
  //       new URL(CLIENT_LOGIN_ROUTE, AppConfig.AppOrigin)
  //     );
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|images|fonts|favicon.ico).*)",
};
