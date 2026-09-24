"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// `icon` is the Remixicon base name: ri-{icon}-line / ri-{icon}-fill
const NAV = [
  { href: "/dashboard", label: "Home", icon: "home-5" },
  { href: "/tasks", label: "My tasks", icon: "checkbox-circle" },
  { href: "/projects", label: "Projects", icon: "folder-3" },
  { href: "/ai-agents", label: "AI agents", icon: "sparkling-2" },
  { href: "/goals", label: "Goals", icon: "flag-2" },
  { href: "/reports", label: "Reports", icon: "bar-chart-2" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-around border-t border-line bg-white/70 px-2 backdrop-blur-xl md:inset-y-0 md:left-0 md:h-auto md:w-[76px] md:flex-col md:justify-start md:gap-2 md:border-r md:border-t-0 md:px-0 md:py-5"
    >
      {/* Logo */}
      <Link
        href="/"
        aria-label="Orbit home"
        className="gradient-bg mb-3 hidden h-[42px] w-[42px] items-center justify-center rounded-[14px_14px_14px_4px] font-nunito text-xl font-extrabold text-white shadow-[0_8px_20px_-6px_#5338d6] md:flex"
      >
        K
      </Link>

      {NAV.map(({ href, label, icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            title={label}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={`relative flex h-11 w-11 items-center justify-center rounded-2xl text-[20px] transition-colors ${
              active
                ? "bg-primary-soft text-primary"
                : "text-muted hover:bg-primary-soft/60 hover:text-primary"
            }`}
          >
            {active && (
              <span className="gradient-bg absolute -left-4 top-3 hidden h-5 w-1 rounded-r-full md:block" />
            )}
            <i className={`ri-${icon}-${active ? "fill" : "line"}`} />
          </Link>
        );
      })}

      <div className="hidden flex-1 md:block" />

      <Link
        href="/settings"
        title="Settings"
        aria-label="Settings"
        className="flex h-11 w-11 items-center justify-center rounded-2xl text-[20px] text-muted transition-colors hover:bg-primary-soft/60 hover:text-primary"
      >
        <i className="ri-settings-3-line" />
      </Link>
    </aside>
  );
}