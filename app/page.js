import HomePageClient from "../components/HomePageClient";
import JsonLdScript from "../components/JsonLdScript";
import { worksItems } from "./works/works-data";
import { createHomePageStructuredData } from "../lib/structuredData";
import { defaultKeywords, defaultOgImage, siteDescription, siteName } from "../lib/siteMetadata";

const homeTitle = "AI 이미지 제작 · AI 영상 제작 · 상세페이지 제작";

export const metadata = {
  title: homeTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  keywords: defaultKeywords,
  openGraph: {
    title: `${homeTitle} | ${siteName}`,
    description: siteDescription,
    url: "/",
    images: [
      {
        url: defaultOgImage,
        alt: `${siteName} 대표 이미지`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${homeTitle} | ${siteName}`,
    description: siteDescription,
    images: [defaultOgImage],
  },
};

export default function HomePage() {
  const structuredData = createHomePageStructuredData(worksItems);

  return (
    <>
      {structuredData.map((entry, index) => (
        <JsonLdScript key={index} data={entry} />
      ))}
      <HomePageClient />
    </>
  );
}
