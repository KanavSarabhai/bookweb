"use client";

import {
  createContext,
  useContext,
  useCallback,
  useReducer,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { CheckCircle, X, AlertCircle, Info, ShoppingCart, Heart } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastType = "success" | "error" | "info" | "cart" | "wishlist";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

type ToastAction =
  | { type: "ADD"; toast: Toast }
  | { type: "REMOVE"; id: string };

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

function toastReducer(state: Toast[], action: ToastAction): Toast[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.toast];
    case "REMOVE":
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Icons map ────────────────────────────────────────────────────────────────

const toastConfig: Record<ToastType, { icon: typeof CheckCircle; color: string; bg: string; border: string }> = {
  success: { icon: CheckCircle, color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  error:   { icon: AlertCircle, color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  info:    { icon: Info,        color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
  cart:    { icon: ShoppingCart,color: "#c46a3a", bg: "#fff7f0", border: "#fed7aa" },
  wishlist:{ icon: Heart,       color: "#c46a3a", bg: "#fff7f0", border: "#fed7aa" },
};

// ─── Individual Toast Component ───────────────────────────────────────────────

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  const config = toastConfig[toast.type];
  const Icon = config.icon;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(onRemove, 2800);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onRemove]);

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 14px",
        borderRadius: "12px",
        background: config.bg,
        border: `1px solid ${config.border}`,
        boxShadow: "0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
        minWidth: "240px",
        maxWidth: "340px",
        fontFamily: "var(--font-inter, system-ui, sans-serif)",
        animation: "toast-in 0.3s cubic-bezier(0.22,1,0.36,1) forwards",
      }}
    >
      <Icon size={17} strokeWidth={2} style={{ color: config.color, flexShrink: 0 }} />
      <span
        style={{
          flex: 1,
          fontSize: "0.875rem",
          fontWeight: 500,
          color: "#161616",
          lineHeight: 1.4,
        }}
      >
        {toast.message}
      </span>
      <button
        onClick={onRemove}
        aria-label="Dismiss notification"
        style={{
          flexShrink: 0,
          background: "none",
          border: "none",
          padding: "2px",
          cursor: "pointer",
          color: "#9a9a9a",
          display: "flex",
          alignItems: "center",
        }}
      >
        <X size={14} strokeWidth={2} />
      </button>
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    dispatch({ type: "ADD", toast: { id, message, type } });
  }, []);

  const remove = useCallback((id: string) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div
        aria-label="Notifications"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          pointerEvents: "none",
        }}
      >
        {toasts.map((t) => (
          <div key={t.id} style={{ pointerEvents: "auto" }}>
            <ToastItem toast={t} onRemove={() => remove(t.id)} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
