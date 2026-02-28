"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/produkte", label: "Produkte", icon: Package },
  { href: "/produkte/neu", label: "Neues Produkt", icon: PlusCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-sidebar text-sidebar-text min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold">SEO Tool</h1>
        <p className="text-sm text-sidebar-text/60 mt-1">Content Generator</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-white/15 text-white font-medium"
                  : "text-sidebar-text/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link
          href="/einstellungen"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-text/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5" />
          Einstellungen
        </Link>
      </div>
    </aside>
  );
}
