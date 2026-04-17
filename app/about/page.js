import AboutPageClient from "../../components/AboutPageClient";
import JsonLdScript from "../../components/JsonLdScript";
import { createAboutPageStructuredData } from "../../lib/structuredData";
import { defaultKeywords, defaultOgImage, siteName } from "../../lib/siteMetadata";

const aboutDescription =
  "JUPSY의 AI 이미지 제작, AI 영상 제작, 상세페이지 제작 워크플로우와 팀 구성을 소개하는 페이지입니다.";

export const metadata = {
  title: "About",
  description: aboutDescription,
  alternates: {
    canonical: "/about",
  },
  keywords: [...defaultKeywords, "AI workflow", "creative production team"],
  openGraph: {
    title: `About | ${siteName}`,
    description: aboutDescription,
    url: "/about",
    images: [
      {
        url: defaultOgImage,
        alt: `${siteName} About 대표 이미지`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${siteName}`,
    description: aboutDescription,
    images: [defaultOgImage],
  },
};

export default function AboutPage() {
  const structuredData = createAboutPageStructuredData();

  return (
    <>
      {structuredData.map((entry, index) => (
        <JsonLdScript key={index} data={entry} />
      ))}
      <AboutPageClient />
    </>
  );
}
