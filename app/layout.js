import "./globals.css";

export const metadata = {
  title: {
    default: "접시 | AI 제작 스튜디오",
    template: "%s | 접시",
  },
  description: "AI 이미지 제작 의뢰와 AI 영상 제작 의뢰를 중심으로 한 접시 홈페이지",
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
      <body>{children}</body>
    </html>
  );
}
