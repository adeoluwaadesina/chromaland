import type { ReactNode } from "react";

import { BackToTop } from "@/components/back-to-top";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ToastProvider } from "@/components/toast-provider";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <div className="overflow-x-hidden bg-white text-ink">
        <Navbar />
        <main id="main-content" className="pt-[var(--nav-height)]">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </div>
    </ToastProvider>
  );
}
