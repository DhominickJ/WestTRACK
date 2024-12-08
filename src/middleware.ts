import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/users(.*)', '/admin(.*)',
]);

export default clerkMiddleware((auth, req) => {
  console.log(`Request URL: ${req.url}`);
  if (isProtectedRoute(req)) {
    console.log('Protected route accessed, enforcing authentication.');
    auth.protect();
  } else {
    console.log('Unprotected route accessed.');
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};