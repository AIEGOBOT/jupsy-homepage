import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="wrap footer-inner">
        <Link className="brand brand-link" href="/">
          JUPSY
        </Link>
        <div className="footer-links">
          <Link href="/#contact">CONTACT</Link>
          <Link href="/works">WORKS</Link>
          <Link href="/about">ABOUT</Link>
        </div>
        <div>&copy; 2026 JEOPSI STUDIO. ALL RIGHTS RESERVED.</div>
      </div>
    </footer>
  );
}
