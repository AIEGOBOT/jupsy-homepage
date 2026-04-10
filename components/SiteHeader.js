import Link from "next/link";

export default function SiteHeader({ active }) {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="brand brand-link" href="/">
          JUPSY
        </Link>
        <nav className="nav">
          <Link className={active === "home" ? "active" : undefined} href="/">
            HOME
          </Link>
          <Link className={active === "about" ? "active" : undefined} href="/about">
            ABOUT
          </Link>
          <Link className={active === "works" ? "active" : undefined} href="/works">
            WORKS
          </Link>
        </nav>
        <Link className="contact-btn" href="/#contact">
          Contact Us
        </Link>
      </div>
    </header>
  );
}
