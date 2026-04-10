import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export default function HomePage() {
  return (
    <>
      <SiteHeader active="home" />

      <main className="hero">
        <div className="wrap">
          <div className="hero-top">
            <div>
              <div className="eyebrow">AI Visual Solutions</div>
              <h1>
                <span className="solid">The Future of</span>
                <span className="thin">AI Creative</span>
                <span className="solid">Production.</span>
              </h1>
            </div>
            <div className="hero-copy">
              회사 소개 중심의 메인 페이지에서 AI 이미지 제작 의뢰와 AI 영상 제작 의뢰를 가장 먼저 선택할 수 있게
              구성했습니다. 빠른 제작, 높은 활용도, 납품 가능한 결과물을 핵심 메시지로 둡니다.
            </div>
          </div>

          <section className="cards" id="services">
            <article className="card image">
              <div className="card-visual"></div>
              <div className="card-top">
                <div className="icon">▣</div>
                <h2>Image Request</h2>
                <p>광고 비주얼, 뷰티컷, 상세페이지용 이미지, 브랜드 제안용 크리에이티브를 빠르게 제작합니다.</p>
              </div>
              <a className="card-btn" href="#contact">
                Initiate Imaging →
              </a>
            </article>

            <article className="card video">
              <div className="card-visual"></div>
              <div className="card-top">
                <div className="icon">▶</div>
                <h2>Video Request</h2>
                <p>제품 소개 영상, 짧은 광고 영상, SNS용 모션 클립 등 브랜드 목적에 맞는 영상 제작 의뢰를 받습니다.</p>
              </div>
              <a className="card-btn" href="#contact">
                Book Production ▶
              </a>
            </article>
          </section>

          <section className="clients" id="about">
            <div className="clients-head">
              <span className="client-kicker">Clients</span>
              <span className="clients-title">Selected partners and brands</span>
            </div>
            <div className="clients-track">
              <div className="clients-row" aria-hidden="true">
                <span className="client-pill">Amuse</span>
                <span className="client-pill">Laneige</span>
                <span className="client-pill">Olive Young</span>
                <span className="client-pill">Musinsa</span>
                <span className="client-pill">29CM</span>
                <span className="client-pill">W Concept</span>
                <span className="client-pill">Gentle Monster</span>
                <span className="client-pill">Tamburins</span>
              </div>
              <div className="clients-row" aria-hidden="true">
                <span className="client-pill">Amuse</span>
                <span className="client-pill">Laneige</span>
                <span className="client-pill">Olive Young</span>
                <span className="client-pill">Musinsa</span>
                <span className="client-pill">29CM</span>
                <span className="client-pill">W Concept</span>
                <span className="client-pill">Gentle Monster</span>
                <span className="client-pill">Tamburins</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
