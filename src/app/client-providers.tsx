"use client";

import React from "react";
import { ShoppingCartDrawer } from "@/components/ui/shopping-cart";
import { ChatWidget } from "@/components/ui/chat-widget";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* ✅ Elementos interactivos del lado del cliente */}
      <div className="fixed top-4 right-4 z-50">
        <ShoppingCartDrawer />
      </div>

      <ChatWidget />

      {/* Contenido de la página */}
      <main className="grow">{children}</main>
    </>
  );
}
