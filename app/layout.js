import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

import {
  defaultKeywords,
  defaultOgImage,
  defaultTitle,
  getSiteUrl,
  siteAltName,
  siteDescription,
  siteName,
} from "../lib/siteMetadata";

const siteUrl = getSiteUrl();

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  creator: siteAltName,
  publisher: siteAltName,
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  keywords: defaultKeywords,
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
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
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
