"use client";

import { type ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/components/ui/Toast";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>{children}</ToastProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
