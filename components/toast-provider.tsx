"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { CheckCircle2, Info, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface ToastMessage {
  id: number;
  title: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastMessage, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((toast: Omit<ToastMessage, "id">) => {
    setToasts((prev) => {
      const next = [...prev, { ...toast, id: Date.now() }];
      return next.slice(-3);
    });
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 4500);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-6 z-[120] flex justify-center">
        <div className="flex w-full max-w-md flex-col gap-3 px-4">
          {toasts.map((toast) => {
            const variant = toast.variant ?? "info";
            const Icon =
              variant === "success"
                ? CheckCircle2
                : variant === "error"
                  ? XCircle
                  : Info;
            return (
              <div
                key={toast.id}
                className={cn(
                  "pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 shadow-subtle backdrop-blur-md",
                  variant === "success" &&
                    "border-emerald-200/70 bg-emerald-50 text-emerald-900",
                  variant === "error" &&
                    "border-rose-200/80 bg-rose-50 text-rose-900",
                  variant === "info" && "border-brand-100 bg-brand-50 text-ink",
                )}
              >
                <Icon className="mt-1 size-5 shrink-0" aria-hidden="true" />
                <div className="space-y-1">
                  <p className="font-medium">{toast.title}</p>
                  {toast.description && (
                    <p className="text-sm opacity-80">{toast.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

