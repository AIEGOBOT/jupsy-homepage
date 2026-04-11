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
            문의하기
          </button>
        ) : (
          <Link className="contact-btn" href={`${sectionPrefix}#contact`}>
            문의하기
          </Link>
        )}
      </div>
    </header>
  );
}
