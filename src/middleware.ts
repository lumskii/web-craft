import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoutes = createRouteMatcher(["/site", "/api/uploadthing"]);

export default clerkMiddleware((auth, req) => {
  if (publicRoutes(req)) {
    // Allow public access to these routes
    return NextResponse.next();
  }

  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  const hostname = req.headers.get("host");
  const pathWithSearchParams = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // Extract subdomain if it exists
  const customSubDomain = hostname
    ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
    .filter(Boolean)[0];

  if (customSubDomain) {
    return NextResponse.rewrite(
      new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
    );
  }

  if (url.pathname === "/sign-in" || url.pathname === "/sign-up") {
    return NextResponse.redirect(new URL(`/agency/sign-in`, req.url));
  }

  if (
    url.pathname === "/" ||
    (url.pathname === "/site" && url.host === process.env.NEXT_PUBLIC_DOMAIN)
  ) {
    return NextResponse.rewrite(new URL("/site", req.url));
  }

  if (
    url.pathname.startsWith("/agency") ||
    url.pathname.startsWith("/subaccount")
  ) {
    return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url));
  }

  return NextResponse.next(); // Allow other requests to proceed
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
