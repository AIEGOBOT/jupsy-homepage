import AboutPageClient from "../../components/AboutPageClient";
import { defaultOgImage, siteName } from "../../lib/siteMetadata";

const aboutDescription =
  "JUPSY 스튜디오의 작업 방식, 팀 구성, 브랜드 비주얼 제작 방향을 소개하는 페이지입니다.";

export const metadata = {
  title: "About",
  description: aboutDescription,
  alternates: {
    canonical: "/about",
  },
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
  return <AboutPageClient />;
}
