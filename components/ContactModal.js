"use client";

import { useEffect, useRef, useState } from "react";

import { trackInquiryOpened } from "../lib/analytics";

const inquiryOptions = [
  { value: "general", label: "일반 문의" },
  { value: "image", label: "이미지 제작 의뢰" },
  { value: "video", label: "영상 제작 의뢰" },
];

const initialFormState = {
  contact: "",
  companyName: "",
  budget: "",
  deadline: "",
  message: "",
  companyWebsite: "",
};

export default function ContactModal({ isOpen, onClose, inquiryType, setInquiryType }) {
  const [formValues, setFormValues] = useState(initialFormState);
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });
  const wasOpenRef = useRef(false);
  const openedAtRef = useRef(Date.now());

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

  useEffect(() => {
    if (!isOpen) {
      setSubmitState({ status: "idle", message: "" });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      openedAtRef.current = Date.now();
      trackInquiryOpened({
        inquiryType,
        pagePath: window.location.pathname,
        source: "contact-modal",
      });
    }

    wasOpenRef.current = isOpen;
  }, [isOpen, inquiryType]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitState({ status: "submitting", message: "" });

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inquiryType,
          ...formValues,
          pagePath: window.location.pathname,
          formStartedAt: openedAtRef.current,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "의뢰 접수 중 오류가 발생했습니다.");
      }

      setFormValues(initialFormState);
      setSubmitState({
        status: "success",
        message: "의뢰가 접수되었습니다. 확인 후 입력하신 연락처로 회신드리겠습니다.",
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error.message || "의뢰 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      });
    }
  };

  const isSubmitting = submitState.status === "submitting";

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
                프로젝트 목적과 일정에 맞춰 이미지, 영상, 상세페이지, 캠페인 비주얼까지 필요한 범위를 함께
                정리합니다.
              </p>
            </div>
            <div className="contact-modal-aside-footer">JUPSY Studio</div>
          </aside>

          <div className="contact-modal-main">
            <div className="contact-modal-head">
              <div className="eyebrow">Contact</div>
              <h2 id="contact-modal-title">의뢰하기</h2>
              <p>기본 정보와 작업 조건을 남겨주시면 빠르게 검토 후 연락드립니다.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label className="contact-field">
                <span>문의 유형</span>
                <select value={inquiryType} onChange={(event) => setInquiryType(event.target.value)} disabled={isSubmitting}>
                  {inquiryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="contact-field">
                <span>연락처</span>
                <input
                  type="text"
                  name="contact"
                  value={formValues.contact}
                  onChange={handleChange}
                  placeholder="이메일 또는 전화번호를 입력해 주세요"
                  required
                  disabled={isSubmitting}
                />
              </label>

              <label className="contact-field">
                <span>브랜드명 / 회사명</span>
                <input
                  type="text"
                  name="companyName"
                  value={formValues.companyName}
                  onChange={handleChange}
                  placeholder="브랜드 또는 회사명을 입력해 주세요"
                  disabled={isSubmitting}
                />
              </label>

              <label className="contact-field">
                <span>희망 예산</span>
                <input
                  type="text"
                  name="budget"
                  value={formValues.budget}
                  onChange={handleChange}
                  placeholder="예: 300만 원대 / 협의 가능"
                  disabled={isSubmitting}
                />
              </label>

              <label className="contact-field">
                <span>희망 납기</span>
                <input
                  type="text"
                  name="deadline"
                  value={formValues.deadline}
                  onChange={handleChange}
                  placeholder="예: 4월 말 / 일정 협의 가능"
                  disabled={isSubmitting}
                />
              </label>

              <label className="contact-field contact-field-full">
                <span>의뢰 내용</span>
                <textarea
                  rows="4"
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  placeholder="브랜드, 사용처, 필요한 산출물, 레퍼런스 무드 등 프로젝트에 대한 내용을 자유롭게 적어 주세요"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </label>

              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                  clip: "rect(0 0 0 0)",
                  clipPath: "inset(50%)",
                  whiteSpace: "nowrap",
                }}
              >
                <label>
                  웹사이트
                  <input
                    type="text"
                    name="companyWebsite"
                    value={formValues.companyWebsite}
                    onChange={handleChange}
                    autoComplete="off"
                    tabIndex={-1}
                    disabled={isSubmitting}
                  />
                </label>
              </div>

              {submitState.message ? (
                <div className={`contact-form-status is-${submitState.status}`}>{submitState.message}</div>
              ) : null}

              <div className="contact-form-actions">
                <button type="button" className="ghost-btn" onClick={onClose} disabled={isSubmitting}>
                  취소
                </button>
                <button type="submit" className="contact-btn" disabled={isSubmitting}>
                  {isSubmitting ? "전송 중..." : "제출하기"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
