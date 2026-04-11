"use client";

import { useEffect, useState } from "react";

import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function WorkDetailPageClient({ detail }) {
  const [heroProgress, setHeroProgress] = useState(0);

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

  const overlayStyle = {
    opacity: Math.max(0, 1 - heroProgress * 1.35),
    transform: `translate3d(0, ${heroProgress * 64 - 108}px, 0) scale(${1 - heroProgress * 0.04})`,
  };

  const mediaStyle = {
    transform: `scale(${1.06 - heroProgress * 0.08})`,
  };

  const heroImageSrc = detail.coverImage || detail.imageSrc || detail.gallery[0]?.src;
  const heroImageAlt = detail.coverAlt || detail.imageAlt || detail.gallery[0]?.alt || detail.title;
  const galleryImages = detail.gallery;

  return (
    <div className="subpage work-detail-page">
      <SiteHeader active="works" />

      <main className="work-detail-main">
        <section className="work-detail-hero">
          <div className="work-detail-hero-shell">
            <div className="work-detail-hero-media">
              <img src={heroImageSrc} alt={heroImageAlt} style={mediaStyle} />
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
      </main>

      <SiteFooter />
    </div>
  );
}
