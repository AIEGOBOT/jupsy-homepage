import { track } from "@vercel/analytics";

function trackEvent(name, properties) {
  try {
    track(name, properties);
  } catch {
    // Ignore analytics failures so they never affect the UI flow.
  }
}

export function trackInquiryOpened({ inquiryType, pagePath, source }) {
  trackEvent("Inquiry Opened", {
    inquiryType,
    pagePath,
    source,
  });
}

export function trackPortfolioVideoOpened({ title, href, aspect }) {
  trackEvent("Portfolio Video Opened", {
    title,
    href,
    aspect,
  });
}
