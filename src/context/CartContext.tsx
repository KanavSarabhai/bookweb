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

export interface CartItem {
  book: Book;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; book: Book }
  | { type: "REMOVE_ITEM"; bookId: string }
  | { type: "UPDATE_QUANTITY"; bookId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; items: CartItem[] };

// ─── Reducer ──────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.book.id === action.book.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.book.id === action.book.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { book: action.book, quantity: 1 }] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.book.id !== action.bookId) };
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.book.id !== action.bookId) };
      }
      return {
        items: state.items.map((i) =>
          i.book.id === action.bookId ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "CLEAR_CART":
      return { items: [] };
    case "HYDRATE":
      return { items: action.items };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface CartContextValue {
  items: CartItem[];
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  isInCart: (bookId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "shroff_cart";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Hydrate from localStorage on mount (client-only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CartItem[] = JSON.parse(stored);
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

  const addItem = useCallback((book: Book) => {
    dispatch({ type: "ADD_ITEM", book });
  }, []);

  const removeItem = useCallback((bookId: string) => {
    dispatch({ type: "REMOVE_ITEM", bookId });
  }, []);

  const updateQuantity = useCallback((bookId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", bookId, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const totalCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.book.price * i.quantity,
    0
  );
  const isInCart = useCallback(
    (bookId: string) => state.items.some((i) => i.book.id === bookId),
    [state.items]
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
