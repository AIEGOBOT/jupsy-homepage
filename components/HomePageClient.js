"use client";

import { startTransition, useDeferredValue, useEffect, useState } from "react";

import { worksFilters, worksItems } from "../app/works/works-data";
import PayPalCheckout from "./PayPalCheckout";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const inquiryOptions = [
  { value: "general", label: "일반 문의" },
  { value: "image", label: "이미지 제작 의뢰" },
  { value: "video", label: "영상 제작 의뢰" },
];

const clientLogos = [
  { name: "KBS", src: "/clients/kbs.png", variant: "mark" },
  { name: "MBC", src: "/clients/mbc.png" },
  { name: "SBS", src: "/clients/sbs.ico", variant: "mark" },
  { name: "행복을 파는 사람들", src: "/clients/hangpasa.png" },
  { name: "홍동비책", src: "/clients/hongdong.png" },
  { name: "정성곳간", src: "/clients/jeongseong.png" },
  { name: "신한은행", src: "/clients/shinhan.ico", variant: "mark" },
  { name: "국가과학기술인력개발원", src: "/clients/kird.svg" },
  { name: "CLASS101", src: "/clients/class101.png" },
  { name: "HD현대", src: "/clients/hdhyundai.png" },
  { name: "신세계", src: "/clients/shinsegae.png" },
  { name: "Invideo", src: "/clients/invideo.svg" },
  { name: "TV조선", src: "/clients/tvchosun.png", variant: "mark" },
  { name: "고려대학교", src: "/clients/korea.png" },
  { name: "한라대학교", src: "/clients/halla.png" },
];
const clientMarqueePrimary = [...clientLogos, ...clientLogos];
const clientMarqueeSecondary = [...clientLogos].reverse().concat([...clientLogos].reverse());
const heroSlides = [
  {
    id: "kbs",
    title: "KBS",
    videoSrc: "/works/video/kbs-happy-future.webm",
  },
  {
    id: "genai",
    title: "GEN AI SEOUL",
    videoSrc: "/works/video/gen-ai-seoul-opening.webm",
  },
];

function ContactModal({ isOpen, onClose, inquiryType, setInquiryType }) {
  const [paymentAmount, setPaymentAmount] = useState(process.env.NEXT_PUBLIC_PAYPAL_DEFAULT_AMOUNT || "50.00");

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      <button type="button" className="contact-modal-backdrop" aria-label="문의 창 닫기" onClick={onClose}></button>
      <div className="contact-modal-panel">
        <button type="button" className="contact-modal-close" aria-label="문의 창 닫기" onClick={onClose}>
          ×
        </button>

        <div className="contact-modal-head">
          <div className="eyebrow">Contact</div>
          <h2 id="contact-modal-title">프로젝트 문의</h2>
          <p>연락처와 작업 조건을 남겨주시면 이미지 또는 영상 제작 방향을 빠르게 확인할 수 있습니다.</p>
        </div>

        <form className="contact-form">
          <label className="contact-field">
            <span>문의 유형</span>
            <select value={inquiryType} onChange={(event) => setInquiryType(event.target.value)}>
              {inquiryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="contact-field">
            <span>연락처</span>
            <input type="text" placeholder="이메일 또는 전화번호" />
          </label>

          <label className="contact-field">
            <span>브랜드명 / 회사명</span>
            <input type="text" placeholder="브랜드 또는 회사명을 입력해 주세요" />
          </label>

          <label className="contact-field">
            <span>희망 단가</span>
            <input type="text" placeholder="예: 100만 원대 / 협의 가능" />
          </label>

          <label className="contact-field">
            <span>PayPal 결제 금액</span>
            <input
              type="text"
              inputMode="decimal"
              value={paymentAmount}
              onChange={(event) => setPaymentAmount(event.target.value)}
              placeholder="예: 50.00"
            />
          </label>

          <label className="contact-field">
            <span>희망 납기</span>
            <input type="text" placeholder="예: 4월 말 / 일정 협의 가능" />
          </label>

          <label className="contact-field contact-field-full">
            <span>의뢰 내용</span>
            <textarea
              rows="6"
              placeholder="원하는 작업 범위, 레퍼런스 분위기, 필요한 산출물, 사용 목적 등을 자유롭게 적어 주세요"
            ></textarea>
          </label>

          <div className="contact-form-note">실제 접수 연결은 다음 단계에서 붙일 수 있도록 문의 창 구조부터 먼저 구성했습니다.</div>

          <div className="contact-field-full">
            <div className="paypal-panel">
              <div className="paypal-panel-head">
                <strong>PayPal 결제</strong>
                <span>프로젝트 선결제 또는 테스트 결제 흐름을 같은 문의 창 안에서 확인할 수 있게 구성했습니다.</span>
              </div>
              <PayPalCheckout amount={paymentAmount} />
            </div>
          </div>

          <div className="contact-form-actions">
            <button type="button" className="ghost-btn" onClick={onClose}>
              닫기
            </button>
            <button type="button" className="contact-btn">
              문의 내용 작성 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function HomeWorkCard({ item }) {
  const isVideo = item.kind === "video";
  const aspectClassMap = {
    "1:1": "is-aspect-square",
    "4:3": "is-aspect-landscape",
    "16:9": "is-aspect-wide",
    "9:16": "is-aspect-portrait",
  };
  const aspectClass = aspectClassMap[item.aspect] || "is-aspect-square";

  if (!isVideo) {
    return (
      <article className={`home-work-card ${aspectClass}`}>
        <div className="home-work-link is-static" aria-label={`${item.title} 작업 썸네일`}>
          <div className="home-work-media">
            <img src={item.imageSrc} alt={item.imageAlt} />
          </div>
          <div className="home-work-meta">
            <span className="home-work-type">{item.typeLabel}</span>
            <h3>{item.title}</h3>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`home-work-card ${aspectClass} is-video`}>
      <a
        className="home-work-link"
        href={item.href}
        target="_blank"
        rel="noreferrer"
        aria-label={item.ariaLabel}
      >
        <div className="home-work-media">
          <video src={item.videoSrc} autoPlay muted loop playsInline preload="metadata"></video>
        </div>
        <div className="home-work-meta">
          <span className="home-work-type">{item.typeLabel}</span>
          <h3>{item.title}</h3>
        </div>
      </a>
    </article>
  );
}

export default function HomePageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState("general");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const deferredFilter = useDeferredValue(activeFilter);
  const filteredWorks =
    deferredFilter === "all" ? worksItems : worksItems.filter((item) => item.category === deferredFilter);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 7000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const openModal = (type) => {
    setInquiryType(type);
    setIsModalOpen(true);
  };

  const handleFilterChange = (nextFilter) => {
    startTransition(() => {
      setActiveFilter(nextFilter);
    });
  };

  return (
    <>
      <SiteHeader active="home" onContactClick={() => openModal("general")} />

      <main className="home-page">
        <section className="home-hero-section" id="home">
          <div className="home-hero-shell">
            <div className="home-hero-top">
              <div className="wrap home-hero-top-inner">
                <div className="home-hero-copy">
                  <div className="home-hero-brand-block">
                    <span className="home-hero-brand">JUPSY</span>
                    <span className="home-hero-title">AI 크리에이티브 스튜디오</span>
                  </div>
                  <div className="eyebrow home-hero-kicker">AI Visual Solution</div>
                </div>
              </div>
            </div>

            <div className="home-hero-bottom">
              <div className="home-hero-media" aria-hidden="true">
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`home-hero-slide${index === activeHeroSlide ? " is-active" : ""}`}
                  >
                    <video src={slide.videoSrc} autoPlay muted loop playsInline preload="metadata"></video>
                  </div>
                ))}
                <div className="home-hero-stage"></div>
              </div>

              <div className="wrap home-hero-bottom-inner">
                <div className="home-hero-actions">
                  <button type="button" className="contact-btn hero-primary-btn" onClick={() => openModal("image")}>
                    이미지 제작 의뢰
                  </button>
                  <button type="button" className="hero-secondary-btn" onClick={() => openModal("video")}>
                    영상 제작 의뢰
                  </button>
                </div>

                <div className="home-hero-pagination" aria-label="히어로 배경 선택">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      className={`home-hero-page-dot${index === activeHeroSlide ? " is-active" : ""}`}
                      onClick={() => setActiveHeroSlide(index)}
                      aria-label={`${slide.title} 배경 보기`}
                      aria-pressed={index === activeHeroSlide}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-clients-section">
          <div className="home-clients-shell">
            <div className="wrap">
              <div className="home-section-head home-clients-intro">
                <div className="eyebrow">Clients</div>
                <p>
                  접시는 생성 자체보다 결과물의 쓰임을 더 중요하게 봅니다. 브랜드 성격과 캠페인 목적에 맞는 무드를 빠르게
                  정리하고, 실제 다음 단계로 이어질 수 있는 시각 언어를 정돈합니다.
                </p>
              </div>
            </div>

            <div className="home-clients-marquee-shell">
              <div className="home-clients-marquee">
                <div className="home-clients-track home-clients-track-forward" aria-hidden="true">
                  {clientMarqueePrimary.map((client, index) => (
                    <span
                      key={`${client.name}-forward-${index}`}
                      className={`home-client-pill${client.variant ? ` is-${client.variant}` : ""}`}
                    >
                      <img src={client.src} alt={client.name} loading="lazy" />
                    </span>
                  ))}
                </div>

                <div className="home-clients-track home-clients-track-reverse" aria-hidden="true">
                  {clientMarqueeSecondary.map((client, index) => (
                    <span
                      key={`${client.name}-reverse-${index}`}
                      className={`home-client-pill${client.variant ? ` is-${client.variant}` : ""}`}
                    >
                      <img src={client.src} alt={client.name} loading="lazy" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-works-section" id="works">
          <div className="wrap home-works-shell">
            <div className="home-works-head">
              <div className="eyebrow">Portfolio</div>
              <h2>접시와 함께한 대표 프로젝트를 직접 확인해보세요.</h2>
            </div>

            <div className="home-works-filters" aria-label="홈 포트폴리오 카테고리">
              {worksFilters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={`home-works-filter-pill${activeFilter === filter.id ? " is-active" : ""}`}
                  onClick={() => handleFilterChange(filter.id)}
                  aria-pressed={activeFilter === filter.id}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div key={deferredFilter} className="home-works-grid">
              {filteredWorks.map((item) => (
                <HomeWorkCard key={item.id} item={item} />
              ))}
            </div>

            <div className="home-works-footer">
              <button type="button" className="home-works-inquiry-btn" onClick={() => openModal("general")}>
                의뢰하기
              </button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inquiryType={inquiryType}
        setInquiryType={setInquiryType}
      />
    </>
  );
}
