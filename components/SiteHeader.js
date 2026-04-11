"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader({ active, onContactClick }) {
  const pathname = usePathname();
  const sectionPrefix = pathname === "/" ? "" : "/";
  const navItems = [
    { id: "home", label: "HOME", href: `${sectionPrefix}#home` },
    { id: "about", label: "ABOUT", href: "/about" },
    { id: "works", label: "WORKS", href: `${sectionPrefix}#works` },
  ];

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="brand brand-link" href="/">
          JUPSY
        </Link>
        <nav className="nav">
          {navItems.map((item) => (
            <Link key={item.id} className={active === item.id ? "active" : undefined} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        {onContactClick ? (
          <button type="button" className="contact-btn" onClick={onContactClick}>
            Contact Us
          </button>
        ) : (
          <Link className="contact-btn" href={`${sectionPrefix}#contact`}>
            Contact Us
          </Link>
        )}
      </div>
    </header>
  );
}
