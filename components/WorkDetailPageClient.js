"use client";

import { useEffect, useState } from "react";

import ContactModal from "./ContactModal";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function WorkDetailPageClient({ detail }) {
  const [heroProgress, setHeroProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState("image");

  useEffect(() => {
    let frameId = null;

    const updateProgress = () => {
      frameId = null;
      const range = Math.max(window.innerHeight * 0.72, 1);
      const nextProgress = Math.min(window.scrollY / range, 1);
      setHeroProgress(nextProgress);
    };

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const overlayStyle =
    heroProgress > 0
      ? {
          opacity: Math.max(0, 1 - heroProgress * 1.35),
          transform: `translate3d(0, ${heroProgress * 64}px, 0) scale(${1 - heroProgress * 0.04})`,
        }
      : undefined;

  const heroImageSrc = detail.coverImage || detail.imageSrc || detail.gallery[0]?.src;
  const heroImageAlt = detail.coverAlt || detail.imageAlt || detail.gallery[0]?.alt || detail.title;
  const galleryImages = detail.gallery;
  const openModal = (type = "image") => {
    setInquiryType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="subpage work-detail-page">
        <SiteHeader active="works" onContactClick={() => openModal("image")} />

        <main className="work-detail-main">
          <section className="work-detail-hero">
            <div className="work-detail-hero-shell">
              <div className="work-detail-hero-media">
                <img src={heroImageSrc} alt={heroImageAlt} />
                <div className="work-detail-hero-shade"></div>
              </div>

              <div className="work-detail-hero-overlay" style={overlayStyle}>
                <div className="work-detail-hero-kicker">JUPSY Studio</div>
                <h1>{detail.title}</h1>
              </div>
            </div>
          </section>

          <section className="work-detail-gallery-section">
            <div className="wrap work-detail-gallery">
              {galleryImages.map((image, index) => (
                <figure key={image.src} className="work-detail-gallery-item">
                  <img src={image.src} alt={image.alt} loading={index < 2 ? "eager" : "lazy"} />
                </figure>
              ))}
            </div>
          </section>

          <section className="work-detail-cta">
            <div className="wrap work-detail-cta-shell">
              <p>비슷한 톤의 이미지 작업이나 상세페이지 제작이 필요하시면 바로 문의해 주세요.</p>
              <button type="button" className="contact-btn" onClick={() => openModal("image")}>
                의뢰하기
              </button>
            </div>
          </section>
        </main>

        <SiteFooter />
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
