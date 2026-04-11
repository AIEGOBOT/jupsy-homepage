import Link from "next/link";

export default function SiteFooter({ onContactClick }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="wrap footer-inner">
        <Link className="brand brand-link" href="/">
          JUPSY
        </Link>
        <div className="footer-links">
          {onContactClick ? (
            <button type="button" className="footer-link-button" onClick={onContactClick}>
              CONTACT
            </button>
          ) : (
            <Link href="/#contact">CONTACT</Link>
          )}
          <Link href="/#works">WORKS</Link>
          <Link href="/about">ABOUT</Link>
        </div>
        <div>&copy; 2026 JUPSY STUDIO. ALL RIGHTS RESERVED.</div>
      </div>
    </footer>
  );
}
