function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect>
      <circle cx="12" cy="12" r="4.25"></circle>
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"></circle>
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12c0 2.2-.2 3.7-.4 4.4a2.8 2.8 0 0 1-2 2c-.8.2-3 .4-6.6.4s-5.8-.2-6.6-.4a2.8 2.8 0 0 1-2-2C3.2 15.7 3 14.2 3 12s.2-3.7.4-4.4a2.8 2.8 0 0 1 2-2c.8-.2 3-.4 6.6-.4s5.8.2 6.6.4a2.8 2.8 0 0 1 2 2c.2.7.4 2.2.4 4.4Z"></path>
      <path d="m10 8.8 5.2 3.2L10 15.2Z" fill="currentColor" stroke="none"></path>
    </svg>
  );
}

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" id="contact">
      <div className="wrap footer-inner">
        <div className="footer-contact">
          <a className="footer-email" href="mailto:jumptipsy@gmail.com">
            jumptipsy@gmail.com
          </a>

          <div className="footer-socials" aria-label="소셜 링크">
            <a
              className="footer-social-link"
              href="https://www.instagram.com/jupsy_official/"
              target="_blank"
              rel="noreferrer"
              aria-label="JUPSY 인스타그램 열기"
            >
              <InstagramIcon />
            </a>
            <a
              className="footer-social-link"
              href="https://www.youtube.com/@JUPSYOFFICIAL/videos"
              target="_blank"
              rel="noreferrer"
              aria-label="JUPSY 유튜브 열기"
            >
              <YouTubeIcon />
            </a>
          </div>
        </div>

        <div>&copy; {currentYear} JUPSY STUDIO. ALL RIGHTS RESERVED.</div>
      </div>
    </footer>
  );
}
