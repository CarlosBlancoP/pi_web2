import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// ✅ Define aquí las rutas que deben ser públicas (no requieren login)
const isPublicRoute = createRouteMatcher([
  "/", // Página principal
  "/arte(.*)", // Sección arte
  "/artesanias(.*)", // Sección artesanías
  "/perfumes(.*)", // Sección perfumes
  "/login(.*)", // Página de inicio de sesión
  "/register(.*)", // Página de registro
  "/api/public(.*)", // Endpoints públicos
  "/chat-support(.*)", // Chat público (si lo tienes abierto)
  "/productos/(.*)", // Páginas de productos
  "/checkout(.*)", // Página de checkout
]);

export default clerkMiddleware(async (auth, request) => {
  // ✅ Solo protegemos rutas que NO estén en la lista pública
  if (!isPublicRoute(request)) {
    const { userId } = await auth();
    if (!userId) {
      return new Response("No autorizado", { status: 401 });
    }
  }
});

export const config = {
  matcher: [
    // ✅ Protege todo menos los archivos estáticos o del sistema
    "/((?!_next|.*\\..*).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
