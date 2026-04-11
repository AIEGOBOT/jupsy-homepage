import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata = {
  title: "About",
  description: "접시 스튜디오 소개와 팀 구성",
};

export default function AboutPage() {
  return (
    <div className="subpage about-page">
      <SiteHeader active="about" />

      <main className="about-main">
        <section className="about-hero">
          <div className="wrap about-hero-shell">
            <div className="about-kicker">Our Studio</div>
            <div className="about-hero-grid">
              <div className="about-hero-copy">
                <h1>The Weight of Visual Clarity</h1>
                <p>
                  접시는 AI 이미지와 영상을 단순히 생성하는 팀이 아니라, 브랜드가 실제로 사용할 수 있는 결과물로 정리해
                  전달하는 비주얼 프로덕션 스튜디오입니다.
                </p>
              </div>
              <div className="about-hero-art" aria-hidden="true">
                <div className="mesh"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-summary">
          <div className="wrap about-summary-grid">
            <div className="about-summary-title">
              <p>Defining the Digital Studio</p>
            </div>
            <div className="about-summary-copy">
              <p>
                접시는 빠른 제작, 비용 효율, 실무형 결과물을 중심으로 브랜드 비주얼을 설계합니다. 캠페인 키비주얼,
                상세페이지 이미지, SNS용 모션 클립, 제품 소개 영상까지 목적에 맞는 형태로 연결합니다.
              </p>
            </div>
            <div className="about-stats">
              <article>
                <strong>12+</strong>
                <span>브랜드 프로젝트</span>
              </article>
              <article>
                <strong>450</strong>
                <span>제작 컷 누적 시안</span>
              </article>
              <article>
                <strong>15</strong>
                <span>주요 작업 포맷</span>
              </article>
            </div>
          </div>
        </section>

        <section className="team-section">
          <div className="wrap">
            <div className="team-header">
              <div>
                <div className="eyebrow">The Collective</div>
                <h2>Architects of Vision</h2>
              </div>
              <p>현재 팀은 8명으로 구성되어 있고, 기획, 마케팅, 디자인, VFX, 3D까지 역할이 분명하게 나뉘어 있습니다.</p>
            </div>

            <div className="team-grid">
              <article className="team-card">
                <div className="team-portrait no-photo portrait-han">
                  <div className="team-overlay">
                    <h3>Han</h3>
                    <p className="team-title">Director</p>
                    <p className="team-role">145k YouTube · 187k Instagram</p>
                  </div>
                </div>
              </article>

              <article className="team-card">
                <div className="team-portrait no-photo portrait-susie">
                  <div className="team-overlay">
                    <h3>Susie</h3>
                    <p className="team-title">Advisor</p>
                    <p className="team-role">Marketing · Education</p>
                  </div>
                </div>
              </article>

              <article className="team-card">
                <div className="team-portrait has-photo portrait-indi">
                  <img src="/team/indi.jpg" alt="Indi 팀 프로필 사진" />
                  <div className="team-overlay">
                    <h3>Indi</h3>
                    <p className="team-title">PM</p>
                    <p className="team-role">Comfy UI · VFX</p>
                  </div>
                </div>
              </article>

              <article className="team-card">
                <div className="team-portrait has-photo portrait-jay">
                  <img src="/team/jay.jpg" alt="Jay 팀 프로필 사진" />
                  <div className="team-overlay">
                    <h3>Jay</h3>
                    <p className="team-title">PM</p>
                    <p className="team-role">Design · Planning</p>
                  </div>
                </div>
              </article>

              <article className="team-card">
                <div className="team-portrait has-photo portrait-mint">
                  <img src="/team/mint.jpg" alt="Mint 팀 프로필 사진" />
                  <div className="team-overlay">
                    <h3>Mint</h3>
                    <p className="team-title">Creator</p>
                    <p className="team-role">Design · Visual</p>
                  </div>
                </div>
              </article>

              <article className="team-card">
                <div className="team-portrait has-photo portrait-latte">
                  <img src="/team/latte.jpg" alt="Latte 팀 프로필 사진" />
                  <div className="team-overlay">
                    <h3>Latte</h3>
                    <p className="team-title">Creator</p>
                    <p className="team-role">Design · VFX</p>
                  </div>
                </div>
              </article>

              <article className="team-card">
                <div className="team-portrait has-photo portrait-hex">
                  <img src="/team/hex.jpg" alt="Hex 팀 프로필 사진" />
                  <div className="team-overlay">
                    <h3>Hex</h3>
                    <p className="team-title">Creator</p>
                    <p className="team-role">VFX · 3D</p>
                  </div>
                </div>
              </article>

              <article className="team-card">
                <div className="team-portrait has-photo portrait-jac">
                  <img src="/team/jac.jpg" alt="Jac 팀 프로필 사진" />
                  <div className="team-overlay">
                    <h3>Jac</h3>
                    <p className="team-title">Creator</p>
                    <p className="team-role">VFX · 3D</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="about-cta">
          <div className="wrap">
            <h2>Build your legacy with us</h2>
            <div className="about-cta-actions">
              <a className="contact-btn" href="/#contact">
                Work With JUPSY
              </a>
              <a className="ghost-link" href="/#works">
                View Our Portfolio
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
