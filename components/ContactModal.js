"use client";

import { useEffect } from "react";

const inquiryOptions = [
  { value: "general", label: "일반 문의" },
  { value: "image", label: "이미지 제작 의뢰" },
  { value: "video", label: "영상 제작 의뢰" },
];

export default function ContactModal({ isOpen, onClose, inquiryType, setInquiryType }) {
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
        <div className="contact-modal-layout">
          <aside className="contact-modal-aside">
            <div className="contact-modal-aside-copy">
              <div className="contact-modal-kicker">Visual Production For Brands</div>
              <p className="contact-modal-aside-text">
                이미지, 영상, 상세페이지, 캠페인 비주얼까지 목적에 맞는 결과물로 정리해 실제 다음 단계로 이어지게
                만듭니다.
              </p>
            </div>
            <div className="contact-modal-aside-footer">JUPSY Studio</div>
          </aside>

          <div className="contact-modal-main">
            <div className="contact-modal-head">
              <div className="eyebrow">Contact</div>
              <h2 id="contact-modal-title">문의하기</h2>
              <p>기본 정보와 작업 조건을 남겨주시면 빠르게 검토 후 연락드립니다.</p>
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
                <input type="text" placeholder="이메일 또는 전화번호를 입력해 주세요" />
              </label>

              <label className="contact-field">
                <span>브랜드명 / 회사명</span>
                <input type="text" placeholder="브랜드 또는 회사명을 입력해 주세요" />
              </label>

              <label className="contact-field">
                <span>희망 예산</span>
                <input type="text" placeholder="예: 300만 원대 / 협의 가능" />
              </label>

              <label className="contact-field">
                <span>희망 납기</span>
                <input type="text" placeholder="예: 4월 말 / 일정 협의 가능" />
              </label>

              <label className="contact-field contact-field-full">
                <span>의뢰 내용</span>
                <textarea
                  rows="4"
                  placeholder="브랜드, 사용처, 필요한 산출물, 레퍼런스 무드 등 프로젝트에 대한 내용을 자유롭게 적어 주세요"
                ></textarea>
              </label>

              <div className="contact-form-note">
                실제 접수 연결은 다음 단계에서 붙일 수 있도록 문의 창 구조부터 먼저 구성했습니다.
              </div>

              <div className="contact-form-actions">
                <button type="button" className="ghost-btn" onClick={onClose}>
                  취소
                </button>
                <button type="button" className="contact-btn">
                  제출하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
