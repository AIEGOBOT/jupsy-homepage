import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata = {
  title: "Works",
  description: "접시 스튜디오의 이미지 및 영상 포트폴리오",
};

export default function WorksPage() {
  return (
    <div className="subpage works-page">
      <SiteHeader active="works" />

      <main className="page-main">
        <div className="wrap works-shell">
          <section className="page-intro works-intro">
            <div className="works-intro-copy">
              <div className="eyebrow">Portfolio</div>
              <h1>Works</h1>
              <p>
                브랜드 비주얼, 캠페인 이미지, 짧은 영상 프리뷰를 한 화면 안에서 빠르게 훑어볼 수 있게 정리한
                아카이브입니다. 구조는 시안의 리듬을 참고하고, 현재 자산 기준으로 바로 확장 가능한 형태로 맞췄습니다.
              </p>
            </div>
            <div className="works-filters" aria-label="Works categories">
              <span className="filter-pill active">All</span>
              <span className="filter-pill">Photography</span>
              <span className="filter-pill">Cinematography</span>
            </div>
          </section>

          <section className="works-mosaic" aria-label="Portfolio grid">
            <article className="mosaic-card card-feature">
              <img src="/works/image/REVV.jpg" alt="REVV 캠페인 대표 이미지" />
              <div className="mosaic-overlay">
                <span className="mosaic-type">Photography</span>
                <h2>REVV Campaign Visual</h2>
              </div>
            </article>

            <article className="mosaic-card card-video">
              <a
                className="video-link"
                href="https://www.youtube.com/shorts/aocSdGRn2nI"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube Shorts Preview 열기"
              >
                <div className="video-frame">
                  <video
                    src="/works/video/moneyism-teaser.webm"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  ></video>
                </div>
                <div className="video-overlay">
                  <span className="mosaic-type">Cinematography</span>
                  <h2>Moneyism AI Teaser</h2>
                </div>
                <span className="play-badge">Play</span>
              </a>
            </article>

            <article className="mosaic-card card-dark">
              <img src="/works/image/REVV.jpg" alt="모노톤 처리된 포트폴리오 이미지" />
              <div className="mosaic-overlay">
                <span className="mosaic-type">Photography</span>
                <h2>Monolith Center</h2>
              </div>
            </article>

            <article className="mosaic-card card-soft">
              <img src="/works/image/REVV.jpg" alt="확장형 포트폴리오 이미지" />
              <div className="mosaic-overlay">
                <span className="mosaic-type">Photography</span>
                <h2>Axis Corporate Plaza</h2>
              </div>
            </article>

            <article className="mosaic-card card-warm">
              <img src="/works/image/REVV.jpg" alt="웜톤 포트폴리오 이미지" />
              <div className="mosaic-overlay">
                <span className="mosaic-type">Photography</span>
                <h2>The Helix Atrium</h2>
              </div>
            </article>

            <article className="mosaic-card card-night">
              <img src="/works/image/REVV.jpg" alt="야간 무드 포트폴리오 이미지" />
              <div className="mosaic-overlay">
                <span className="mosaic-type">Cinematography</span>
                <h2>Twilight Residency</h2>
              </div>
            </article>
          </section>

          <section className="works-cta">
            <h2>Ready to build your next visual system?</h2>
            <p>브랜드 소개용 이미지, 제품 중심 비주얼, 짧은 캠페인 영상까지 목적에 맞는 결과물로 연결합니다.</p>
            <div className="works-cta-actions">
              <a className="contact-btn" href="/#contact">
                Get In Touch
              </a>
              <a className="ghost-link" href="/works/image/REVV.jpg" target="_blank" rel="noreferrer">
                Open Sample Asset
              </a>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
