"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";
import Footer from "@/components/common/footer";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-md">
        <div className="app_container flex h-16 items-center justify-between">
          <Link href="/dashboard" className="text-primary text-xl font-semibold">
            TrayDeck
          </Link>

          <nav className="text-muted-foreground hidden gap-6 text-sm font-medium md:flex">
            <Link href="/dashboard" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/dashboard/tickets" className="hover:text-primary transition-colors">
              Tickets
            </Link>
          </nav>

          <Button variant="secondary" size="sm" className="flex items-center gap-2 text-white">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="app_container flex-1 py-10">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
