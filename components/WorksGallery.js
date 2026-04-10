"use client";

import { startTransition, useDeferredValue, useState } from "react";

import { worksFilters, worksItems } from "../app/works/works-data";

function WorkCard({ item, index }) {
  const classes = `mosaic-card ${item.className} work-card-enter`;
  const animationStyle = { "--card-index": index };

  if (item.kind === "image") {
    return (
      <article className={classes} style={animationStyle}>
        <img src={item.imageSrc} alt={item.imageAlt} />
        <div className="mosaic-overlay">
          <span className="mosaic-type">{item.typeLabel}</span>
          <h2>{item.title}</h2>
        </div>
      </article>
    );
  }

  return (
    <article className={classes} style={animationStyle}>
      <a className="video-link" href={item.href} target="_blank" rel="noreferrer" aria-label={item.ariaLabel}>
        <div className="video-frame">
          <video src={item.videoSrc} autoPlay muted loop playsInline preload="metadata"></video>
        </div>
        <div className="video-overlay">
          <span className="mosaic-type">{item.typeLabel}</span>
          <h2>{item.title}</h2>
        </div>
        <span className="play-badge">Play</span>
      </a>
    </article>
  );
}

export default function WorksGallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const deferredFilter = useDeferredValue(activeFilter);
  const filteredItems =
    deferredFilter === "all" ? worksItems : worksItems.filter((item) => item.category === deferredFilter);

  const handleFilterChange = (nextFilter) => {
    startTransition(() => {
      setActiveFilter(nextFilter);
    });
  };

  return (
    <>
      <section className="page-intro works-intro">
        <div className="works-intro-copy">
          <div className="eyebrow">Portfolio</div>
          <h1>Works</h1>
          <p>
            브랜드 비주얼, 캠페인 이미지, 짧은 영상 프리뷰를 한 화면 안에서 빠르게 훑어볼 수 있게 정리한 아카이브입니다.
            구조는 시안의 리듬을 참고하고, 현재 자산 기준으로 바로 확장 가능한 형태로 맞췄습니다.
          </p>
        </div>
        <div className="works-filters" aria-label="Works categories">
          {worksFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`filter-pill${activeFilter === filter.id ? " active" : ""}`}
              onClick={() => handleFilterChange(filter.id)}
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      <section key={deferredFilter} className="works-mosaic" aria-label="Portfolio grid">
        {filteredItems.map((item, index) => (
          <WorkCard key={item.id} item={item} index={index} />
        ))}
      </section>
    </>
  );
}
