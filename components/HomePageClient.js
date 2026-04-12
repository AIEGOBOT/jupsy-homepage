"use client";

import Link from "next/link";
import { startTransition, useDeferredValue, useEffect, useState } from "react";

import { worksFilters, worksItems } from "../app/works/works-data";
import ContactModal from "./ContactModal";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

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

function getYouTubeEmbedUrl(url) {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.slice(1);
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (parsedUrl.pathname === "/watch") {
        const videoId = parsedUrl.searchParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
      }

      if (parsedUrl.pathname.startsWith("/shorts/")) {
        const videoId = parsedUrl.pathname.split("/")[2];
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
      }

      if (parsedUrl.pathname.startsWith("/embed/")) {
        return `${parsedUrl.origin}${parsedUrl.pathname}?autoplay=1&rel=0`;
      }
    }
  } catch {
    return null;
  }

  return null;
}

function VideoPreviewModal({ item, onClose }) {
  useEffect(() => {
    if (!item) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  const embedUrl = getYouTubeEmbedUrl(item.href);
  const modalClassName =
    item.aspect === "9:16" ? "video-preview-modal-panel is-portrait" : "video-preview-modal-panel is-landscape";

  return (
    <div className="video-preview-modal" role="dialog" aria-modal="true" aria-labelledby="video-preview-title">
      <button type="button" className="video-preview-modal-backdrop" aria-label="영상 닫기" onClick={onClose}></button>
      <div className={modalClassName}>
        <button type="button" className="video-preview-modal-close" aria-label="영상 닫기" onClick={onClose}>
          ×
        </button>
        <div className="video-preview-modal-frame">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={item.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="video-preview-modal-fallback">
              <p>이 영상은 모달 미리보기를 지원하지 않아 외부 링크로 열어야 합니다.</p>
              <a href={item.href} target="_blank" rel="noreferrer">
                원본 영상 열기
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HomeWorkCard({ item, onVideoOpen }) {
  const isVideo = item.kind === "video";
  const aspectClassMap = {
    "1:1": "is-aspect-square",
    "4:3": "is-aspect-landscape",
    "16:9": "is-aspect-wide",
    "9:16": "is-aspect-portrait",
  };
  const aspectClass = aspectClassMap[item.aspect] || "is-aspect-square";
  const detailHref = item.detailSlug ? `/works/${item.detailSlug}` : null;

  if (detailHref) {
    return (
      <article className={`home-work-card ${aspectClass}`}>
        <Link className="home-work-link" href={detailHref} aria-label={`${item.title} 작업 자세히 보기`}>
          <div className="home-work-media">
            {isVideo ? (
              <video src={item.videoSrc} autoPlay muted loop playsInline preload="metadata"></video>
            ) : (
              <img src={item.imageSrc} alt={item.imageAlt} />
            )}
          </div>
          <div className="home-work-meta">
            <span className="home-work-type">{item.typeLabel}</span>
            <h3>{item.title}</h3>
          </div>
        </Link>
      </article>
    );
  }

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
      <button
        type="button"
        className="home-work-link"
        aria-label={item.ariaLabel}
        onClick={() => onVideoOpen(item)}
      >
        <div className="home-work-media">
          <video src={item.videoSrc} autoPlay muted loop playsInline preload="metadata"></video>
        </div>
        <div className="home-work-meta">
          <span className="home-work-type">{item.typeLabel}</span>
          <h3>{item.title}</h3>
        </div>
      </button>
    </article>
  );
}

export default function HomePageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState("general");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [activeVideoItem, setActiveVideoItem] = useState(null);
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
              <div className="eyebrow">Works</div>
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
                <HomeWorkCard key={item.id} item={item} onVideoOpen={setActiveVideoItem} />
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
      <VideoPreviewModal item={activeVideoItem} onClose={() => setActiveVideoItem(null)} />
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inquiryType={inquiryType}
        setInquiryType={setInquiryType}
      />
    </>
  );
}
