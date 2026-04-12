import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

import { defaultOgImage, defaultTitle, getSiteUrl, siteDescription, siteName } from "../lib/siteMetadata";

const siteUrl = getSiteUrl();

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "JUPSY",
    "AI 스튜디오",
    "AI 이미지 제작",
    "AI 영상 제작",
    "상세페이지 제작",
    "캠페인 비주얼",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName,
    title: defaultTitle,
    description: siteDescription,
    images: [
      {
        url: defaultOgImage,
        alt: `${siteName} 대표 이미지`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteDescription,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
