const siteName = "JUPSY";
const defaultTitle = "JUPSY | AI 제작 스튜디오";
const siteDescription = "AI 이미지, 영상, 상세페이지, 캠페인 비주얼 제작을 진행하는 JUPSY 스튜디오 포트폴리오입니다.";
const defaultOgImage = "/home/home-video-card.jpg";

function normalizeUrl(value) {
  if (!value) {
    return null;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  if (trimmedValue.startsWith("http://") || trimmedValue.startsWith("https://")) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
}

function getSiteUrl() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const candidate of candidates) {
    const normalizedUrl = normalizeUrl(candidate);

    if (normalizedUrl) {
      return normalizedUrl;
    }
  }

  return "http://localhost:3000";
}

function toAbsoluteUrl(pathname = "/") {
  return new URL(pathname, getSiteUrl()).toString();
}

export { defaultOgImage, defaultTitle, getSiteUrl, siteDescription, siteName, toAbsoluteUrl };
