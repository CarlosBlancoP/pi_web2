import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/footer";
import { ClientProviders } from "./client-providers"; // ✅ Nuevo archivo

export const metadata: Metadata = {
  title: "El arte de Vivir",
};

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <body className="antialiased flex flex-col min-h-screen relative">
          <Header />

          {/* ✅ Todo lo que usa client-side va dentro de este componente */}
          <ClientProviders>{children}</ClientProviders>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
