"use client";

import { useState } from "react";

import ContactModal from "./ContactModal";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const teamMembers = [
  {
    name: "Han",
    title: "Director",
    details: ["145k YouTube", "187k Instagram"],
    accent: true,
  },
  {
    name: "Susie",
    title: "Advisor",
    details: ["Marketing", "Education"],
  },
  {
    name: "Indi",
    title: "PM",
    details: ["ComfyUI", "VFX"],
  },
  {
    name: "Jay",
    title: "PM",
    details: ["Design", "Planning"],
  },
  {
    name: "Mint",
    title: "Creator",
    details: ["Design", "Visual"],
  },
  {
    name: "Latte",
    title: "Creator",
    details: ["Design", "VFX"],
  },
  {
    name: "Hex",
    title: "Creator",
    details: ["VFX", "3D"],
  },
  {
    name: "Jac",
    title: "Creator",
    details: ["VFX", "3D"],
  },
];

export default function AboutPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState("general");

  const openModal = (type = "general") => {
    setInquiryType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="subpage about-page">
        <SiteHeader active="about" onContactClick={() => openModal("general")} />

        <main className="about-main">
          <section className="about-hero">
            <div className="about-hero-shell">
              <div className="about-kicker">Our Studio</div>
              <div className="about-hero-grid">
                <div className="about-hero-copy">
                  <h1>
                    <span>Throw the plate</span>
                    <br />
                    <span>Start the feast</span>
                  </h1>
                  <p>JUPSY는 아이디어를 넘어, 현실에서 작동하는 결과물을 만들어냅니다.</p>
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
                <p>How JUPSY Works</p>
              </div>
              <div className="about-summary-copy">
                <p>
                  접시는 빠른 제작, 비용 효율, 실무형 결과물을 중심으로 브랜드 비주얼을 설계합니다. 캠페인 키비주얼,
                  상세페이지 이미지, SNS용 모션 클립, 제품 소개 영상까지 목적에 맞는 형태로 연결합니다.
                </p>
              </div>
              <div className="about-stats">
                <article>
                  <strong>1000+</strong>
                  <span>제작 컷 누적 시안</span>
                </article>
                <article>
                  <strong>100+</strong>
                  <span>프로젝트</span>
                </article>
                <article>
                  <strong>10+</strong>
                  <span>주요 작업 포맷</span>
                </article>
              </div>
            </div>
          </section>

          <section className="team-section">
            <div className="wrap team-shell">
              <div className="team-intro">
                <div className="team-intro-title">
                  <p>Our Team</p>
                </div>
                <div className="team-intro-copy">
                  <p>
                    한 번의 시도는 새로운 가능성을 엽니다.
                    <br />
                    다시 말해, 모든 혁신은 새로운 시도와 아이디어에서 시작된다고 믿습니다. JUPSY AI STUDIO는
                    기존의 제작 프레임을 넘어, 브랜드의 가치와 메시지를 더 선명하고 빠르며 창의적으로 전달하는
                    콘텐츠를 만듭니다.
                  </p>
                  <p>
                    우리는 단순한 영상 제작팀이 아니라, 브랜드와 사람을 새로운 방식으로 연결하는 AI 크리에이티브
                    프로덕션입니다.
                  </p>
                  <p>
                    아이디어를 던지는 순간,
                    <br />
                    당신의 브랜드는 새로운 페스티벌을 시작합니다.
                  </p>
                </div>
              </div>

              <div className="team-grid">
                {teamMembers.map((member) => (
                  <article className="team-card" key={member.name}>
                    <h3>{member.name}</h3>
                    <p className="team-title">{member.title}</p>
                    <div className="team-divider" aria-hidden="true"></div>
                    <ul className="team-role-list">
                      {member.details.map((detail) => (
                        <li key={detail} className={member.accent ? "is-accent" : undefined}>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="about-cta">
            <div className="wrap">
              <h2>브랜드에 필요한 장면을 함께 만듭니다</h2>
              <div className="about-cta-actions">
                <button type="button" className="contact-btn" onClick={() => openModal("general")}>
                  문의하기
                </button>
                <a className="ghost-link" href="/#works">
                  작업 보기
                </a>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter onContactClick={() => openModal("general")} />
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inquiryType={inquiryType}
        setInquiryType={setInquiryType}
      />
    </>
  );
}
