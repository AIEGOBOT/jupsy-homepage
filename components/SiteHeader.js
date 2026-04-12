"use client";

import Link from "next/link";

export default function SiteHeader({ active, onContactClick }) {
  const sectionPrefix = "/";
  const navItems = [
    { id: "home", label: "HOME", href: `${sectionPrefix}#home` },
    { id: "works", label: "WORKS", href: `${sectionPrefix}#works` },
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
        ) : (
          <Link className="contact-btn header-action-btn" href={`${sectionPrefix}#contact`}>
            의뢰하기
          </Link>
        )}
      </div>

      <div className="site-header-bar">
        <nav className="nav">
          {navItems.map((item) => (
            <Link key={item.id} className={active === item.id ? "active" : undefined} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
