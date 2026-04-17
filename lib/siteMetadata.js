const siteName = "JUPSY";
const siteAltName = "JUPSY AI Studio";
const defaultTitle = "JUPSY | AI 이미지·영상 제작 스튜디오";
const siteDescription =
  "AI 이미지 제작, AI 영상 제작, 상세페이지 제작, 캠페인 키비주얼과 제품 비주얼 콘텐츠를 진행하는 JUPSY AI 크리에이티브 스튜디오 포트폴리오입니다.";
const defaultOgImage = "/opengraph-image";
const contactEmail = "jumptipsy@gmail.com";
const socialProfiles = [
  "https://www.instagram.com/jupsy_official/",
  "https://www.youtube.com/@JUPSYOFFICIAL/videos",
];
const defaultKeywords = [
  "JUPSY",
  "JUPSY AI Studio",
  "AI 스튜디오",
  "AI 크리에이티브 스튜디오",
  "AI 이미지 제작",
  "AI 영상 제작",
  "상세페이지 제작",
  "제품 비주얼 제작",
  "캠페인 키비주얼",
  "브랜드 영상 제작",
  "AI content studio",
  "AI image production",
  "AI video production",
  "detail page design",
  "campaign key visual",
  "product visual production",
];

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

export {
  contactEmail,
  defaultKeywords,
  defaultOgImage,
  defaultTitle,
  getSiteUrl,
  siteAltName,
  siteDescription,
  siteName,
  socialProfiles,
  toAbsoluteUrl,
};
