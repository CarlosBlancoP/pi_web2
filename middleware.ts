import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/arte(.*)",
  "/artesanias(.*)",
  "/perfumes(.*)",
  "/productos(.*)",
  "/checkout(.*)",
  "/api/public(.*)",
])

export default clerkMiddleware((auth, req) => {
  // Protege solo las rutas que no estén en la lista pública
  if (!isPublicRoute(req)) {
    auth().protect()
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
