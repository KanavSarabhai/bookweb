"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Book } from "@/types/book";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WishlistState {
  items: Book[];
}

type WishlistAction =
  | { type: "TOGGLE_ITEM"; book: Book }
  | { type: "REMOVE_ITEM"; bookId: string }
  | { type: "HYDRATE"; items: Book[] };

// ─── Reducer ──────────────────────────────────────────────────────────────────

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "TOGGLE_ITEM": {
      const exists = state.items.some((b) => b.id === action.book.id);
      return {
        items: exists
          ? state.items.filter((b) => b.id !== action.book.id)
          : [...state.items, action.book],
      };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((b) => b.id !== action.bookId) };
    case "HYDRATE":
      return { items: action.items };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface WishlistContextValue {
  items: Book[];
  toggleItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  isWishlisted: (bookId: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = "shroff_wishlist";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  // Hydrate from localStorage on mount (client-only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Book[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: "HYDRATE", items: parsed });
        }
      }
    } catch {
      // ignore corrupted storage
    }
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore storage errors
    }
  }, [state.items]);

  const toggleItem = useCallback((book: Book) => {
    dispatch({ type: "TOGGLE_ITEM", book });
  }, []);

  const removeItem = useCallback((bookId: string) => {
    dispatch({ type: "REMOVE_ITEM", bookId });
  }, []);

  const isWishlisted = useCallback(
    (bookId: string) => state.items.some((b) => b.id === bookId),
    [state.items]
  );

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        toggleItem,
        removeItem,
        isWishlisted,
        count: state.items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
