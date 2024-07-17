import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const publicRoutes = createRouteMatcher(['/site', '/api/uploadthing']);

export default clerkMiddleware((auth, req) => {
    if (publicRoutes(req)) auth().protect();
})

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};