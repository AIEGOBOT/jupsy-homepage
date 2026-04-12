"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { scrollToSection, storePendingSectionScroll } from "../lib/pendingSectionScroll";

export default function SiteHeader({ active, onContactClick }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleSectionClick = (sectionId) => {
    if (isHomePage) {
      scrollToSection(sectionId);
      return;
    }

    storePendingSectionScroll(sectionId);
  };

  const navItems = [
    isHomePage
      ? { id: "home", label: "HOME", type: "button", onClick: () => handleSectionClick("home") }
      : { id: "home", label: "HOME", href: "/" },
    isHomePage
      ? { id: "works", label: "WORKS", type: "button", onClick: () => handleSectionClick("works") }
      : { id: "works", label: "WORKS", href: "/", onClick: () => handleSectionClick("works") },
    { id: "about", label: "ABOUT", href: "/about" },
  ];

  return (
    <header className="site-header">
      <div className="site-header-float">
        <Link className="brand brand-link header-brand-link" href="/">
          JUPSY
        </Link>
        {onContactClick ? (
          <button type="button" className="contact-btn header-action-btn" onClick={onContactClick}>
            의뢰하기
          </button>
        ) : isHomePage ? (
          <button
            type="button"
            className="contact-btn header-action-btn"
            onClick={() => handleSectionClick("contact")}
          >
            의뢰하기
          </button>
        ) : (
          <Link className="contact-btn header-action-btn" href="/" onClick={() => handleSectionClick("contact")}>
            의뢰하기
          </Link>
        )}
      </div>

      <div className="site-header-bar">
        <nav className="nav">
          {navItems.map((item) =>
            item.type === "button" ? (
              <button
                key={item.id}
                type="button"
                className={active === item.id ? "active" : undefined}
                onClick={item.onClick}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.id}
                className={active === item.id ? "active" : undefined}
                href={item.href}
                onClick={item.onClick}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
