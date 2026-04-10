import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import WorksGallery from "../../components/WorksGallery";

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
          <WorksGallery />

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
