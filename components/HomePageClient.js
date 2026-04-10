"use client";

import { useEffect, useState } from "react";

import PayPalCheckout from "./PayPalCheckout";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const inquiryOptions = [
  { value: "general", label: "일반 문의" },
  { value: "image", label: "이미지 제작 의뢰" },
  { value: "video", label: "영상 제작 의뢰" },
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

export default function HomePageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState("general");

  const openModal = (type) => {
    setInquiryType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      <SiteHeader active="home" onContactClick={() => openModal("general")} />

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
                <h2>Image Request</h2>
                <p>광고 비주얼, 뷰티컷, 상세페이지용 이미지, 브랜드 제안용 크리에이티브를 빠르게 제작합니다.</p>
              </div>
              <button type="button" className="card-btn" onClick={() => openModal("image")}>
                이미지 제작 의뢰
              </button>
            </article>

            <article className="card video">
              <div className="card-visual"></div>
              <div className="card-top">
                <h2>Video Request</h2>
                <p>제품 소개 영상, 짧은 광고 영상, SNS용 모션 클립 등 브랜드 목적에 맞는 영상 제작 의뢰를 받습니다.</p>
              </div>
              <button type="button" className="card-btn" onClick={() => openModal("video")}>
                영상 제작 의뢰
              </button>
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
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inquiryType={inquiryType}
        setInquiryType={setInquiryType}
      />
    </>
  );
}
