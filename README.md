# JUPSY 홈페이지

Next.js App Router 기반의 JUPSY 스튜디오 홈페이지입니다.

## 기술 스택

- `Next.js 16`
- `React 19`
- `nodemailer`
- `@vercel/analytics`
- `ESLint`
- App Router
- 공통 포트폴리오 데이터 기반 페이지 구성

## 주요 경로

- `/`: 홈 페이지, 히어로 섹션, 클라이언트 영역, 포트폴리오 그리드, 공통 의뢰 모달
- `/about`: 스튜디오 소개, 작업 방식, 팀 소개, 의뢰 유도 섹션
- `/works/[slug]`: 상세 데이터가 연결된 작업의 내부 상세 페이지

## 프로젝트 구조

- `app/layout.js`: 루트 레이아웃, 메타데이터, 폰트 로드
- `app/page.js`: 홈 페이지 엔트리
- `app/about/page.js`: 소개 페이지 엔트리
- `app/robots.js`: robots.txt 생성
- `app/sitemap.js`: sitemap.xml 생성
- `app/works/works-data.js`: 필터, 홈 포트폴리오 데이터, 상세 페이지 데이터
- `app/works/[slug]/page.js`: 작업 상세 라우트
- `app/api/inquiry/route.js`: 의뢰 폼 제출을 디스코드 웹훅 또는 SMTP 메일로 전달하는 API
- `app/globals.css`: 전역 스타일 엔트리
- `app/site.css`: 사이트 공통 스타일
- `components/HomePageClient.js`: 홈 UI, 히어로, 클라이언트 영역, 작품 그리드, 모달 연결
- `components/AboutPageClient.js`: 소개 페이지 UI와 모달 연결
- `components/ContactModal.js`: 홈과 소개 페이지에서 공통으로 쓰는 의뢰 모달
- `components/SiteHeader.js`: 상단 네비게이션과 고정 텍스트 링크
- `components/SiteFooter.js`: 푸터와 연락처 앵커
- `components/WorkDetailPageClient.js`: 작업 상세 히어로와 갤러리 UI
- `.env.example`: 로컬 환경 변수 예시
- `lib/analytics.js`: 프론트 이벤트 추적 헬퍼
- `lib/siteMetadata.js`: 공통 SEO 메타데이터와 사이트 URL 헬퍼
- `public/clients/`: 클라이언트 로고 에셋
- `public/home/`: 홈 카드용 에셋
- `public/works/image/`: 이미지 작업 대표 이미지
- `public/works/projects/`: 작업별 상세 갤러리 에셋
- `public/works/video/`: 영상 작업 미리보기 에셋

## 개발 방법

- 의존성 설치: `npm install`
- 개발 서버 실행: `npm run dev`
- 코드 검사: `npm run lint`
- 프로덕션 빌드 확인: `npm run build`
- 프로덕션 서버 실행: `npm run start`

기본 로컬 주소:

- `http://localhost:3000`

## 환경 변수

`.env.example`을 `.env.local`로 복사한 뒤 필요한 채널만 설정합니다.

- `NEXT_PUBLIC_SITE_URL`: 실제 배포 도메인 주소, canonical/OG/sitemap 생성에 사용
- `DISCORD_WEBHOOK_URL`: 의뢰 접수 내용을 디스코드로 받을 웹훅 URL
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM_EMAIL`: 발신자 주소, 비워두면 `SMTP_USER` 사용
- `INQUIRY_TO_EMAIL`: 수신 주소, 비워두면 `SMTP_USER` 사용

의뢰 API는 디스코드 웹훅 또는 SMTP 중 하나 이상이 설정되어 있어야 정상 동작합니다.
`.env.local`은 로컬 전용 파일이라 Git에 포함되지 않으므로, 배포 환경에서는 `Vercel > Project Settings > Environment Variables`에 동일한 값을 별도로 등록해야 합니다.
Vercel Analytics를 실제로 수집하려면 `Vercel > Project > Analytics`에서 Web Analytics를 활성화해야 합니다.

Gmail SMTP를 사용할 때의 기본 예시는 아래와 같습니다.

- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_SECURE=false`
- `SMTP_USER=<gmail-address>`
- `SMTP_PASS=<gmail-app-password>`
- `SMTP_FROM_EMAIL=<gmail-address>`
- `INQUIRY_TO_EMAIL=<receiver-address>`

## 현재 구현 상태

- 상단 중앙 네비게이션은 `HOME`, `WORKS`, `ABOUT` 순서입니다.
- 좌상단 `JUPSY`와 우상단 `의뢰하기`는 페이지 이동이나 스크롤과 무관하게 항상 보이는 고정 텍스트 링크입니다.
- 홈 내부 네비게이션과 CTA는 URL에 `#`를 남기지 않고 섹션 스크롤로 동작합니다.
- 홈 히어로는 상단 다크 밴드와 하단 미디어 밴드로 나뉜 구조입니다.
- 홈 히어로 상단 밴드는 이전보다 더 얇게, 하단 미디어 밴드는 더 크게 보이도록 비율을 조정했습니다.
- 홈 히어로 하단 배경은 현재 로컬 영상 에셋을 원본 재생 길이 기준으로 순환해 사용합니다.
- 클라이언트 섹션 로고는 `public/clients/`의 현재 에셋 세트를 기준으로 노출합니다.
- 홈과 소개 페이지의 `의뢰하기`는 공통 모달을 엽니다.
- 의뢰 모달은 왼쪽 정보 패널과 오른쪽 폼 패널로 구성된 2단 레이아웃입니다.
- 의뢰 폼은 `/api/inquiry`로 제출되며, 필수값은 연락처와 의뢰 내용입니다.
- 의뢰 폼에는 허니팟, 너무 빠른 제출 차단, 간단한 rate limit이 적용되어 있습니다.
- 의뢰 접수는 설정된 채널에 따라 디스코드 웹훅, SMTP 메일 또는 둘 다로 전달됩니다.
- 제출 중에는 폼 입력이 잠기고, 완료 후 성공 또는 실패 상태 메시지를 표시합니다.
- 상세 페이지에서도 헤더와 하단 CTA를 통해 바로 `의뢰하기` 모달을 열 수 있습니다.
- 작품 필터는 `All`, `이미지`, `영상`을 지원합니다.
- 홈 포트폴리오 그리드는 3열 기준으로 유지됩니다.
- 클라이언트 마퀴 로고는 컬러 원본을 유지하고, 이전보다 느린 속도로 좌우 반복 이동합니다.
- 일부 클라이언트 로고는 가독성을 위해 개별 크기나 톤을 별도로 조정합니다.
- 홈 카드에서 사용하는 비율 키는 `1:1`, `4:3`, `16:9`, `9:16`만 허용합니다.
- `9:16` 작업은 홈 그리드에서 2행을 차지하고, 나머지 비율은 1행만 사용합니다.
- 큰 데스크톱에서는 홈 그리드의 행 높이를 추가로 키워 세로 카드가 너무 납작해 보이지 않도록 조정합니다.
- 영상 작업은 로컬 `WEBM` 미리보기를 사용하고, 홈 그리드에서는 화면에 보이는 카드만 재생합니다.
- 홈 그리드의 영상 카드는 클릭 시 외부 이동 대신 모달에서 바로 재생합니다.
- 이미지 작업은 `detailSlug`가 있으면 내부 상세 페이지로 이동합니다.
- 내부 상세 페이지는 `app/works/works-data.js`의 `workDetails` 데이터 기준으로 정적 생성됩니다.
- 작업 상세 페이지는 전체 화면 히어로 이미지와 중앙 타이틀 오버레이, 동일 폭 갤러리로 구성됩니다.
- 상세 히어로에서는 이미지 자체 확대 모션 없이 텍스트 오버레이만 스크롤에 따라 움직입니다.
- `app/layout.js`, `app/robots.js`, `app/sitemap.js`를 통해 기본 SEO 메타, robots, sitemap을 제공합니다.
- `@vercel/analytics`로 페이지뷰가 자동 수집되며, 문의 오픈/문의 제출/영상 오픈 이벤트를 추적합니다.
- 소개 페이지는 홈과 유사하게 넓게 펼쳐지는 히어로와 텍스트 중심 섹션 구조를 사용합니다.
- 팀 섹션은 프로필 이미지 없이 텍스트 중심 카드 레이아웃입니다.
- 푸터는 메일 주소와 인스타그램, 유튜브 외부 링크를 직접 노출합니다.

## 에셋 규칙

- `public/` 아래 디렉터리 이름은 소문자를 유지합니다.
- 새 포트폴리오 항목은 컴포넌트에 하드코딩하지 말고 `app/works/works-data.js`에 추가합니다.
- 홈 포트폴리오 항목에는 반드시 `aspect` 값을 지정합니다.
- 홈 포트폴리오 비율 값은 `1:1`, `4:3`, `16:9`, `9:16`만 사용합니다.
- 홈의 `9:16` 값은 세로 2행 카드 레이아웃 기준으로 쓰며, 실제 렌더 높이는 브레이크포인트별 그리드 행 높이에 따라 달라집니다.
- 내부 상세 페이지가 필요한 작업은 `detailSlug`와 `workDetails` 항목을 함께 추가합니다.
- 클라이언트 로고를 교체할 때는 `public/clients/` 에셋과 `components/HomePageClient.js`의 `clientLogos` 목록을 같이 맞춥니다.
- 상세 페이지 에셋은 `public/works/projects/<project-slug>/` 아래에 둡니다.
- 현재 상세 갤러리 이미지는 배포 용량과 대역폭을 고려해 `webp` 위주로 관리합니다.
- 홈 그리드 썸네일은 `public/works/image/` 아래에 `webp`로 두고, 카드 표시 크기를 고려해 긴 변 기준 `1600px` 이하로 리사이즈합니다.
- 파일명은 가능하면 단순하고 ASCII 친화적으로 유지합니다.
- 포트폴리오 미디어는 가벼운 웹용 이미지와 `WEBM` 미리보기를 우선 사용합니다.
- Linux, Vercel 같은 환경은 대소문자를 구분하므로 파일명과 경로를 정확히 맞춰야 합니다.
- SEO 품질을 위해 실제 배포 시 `NEXT_PUBLIC_SITE_URL`을 반드시 설정합니다.

## 다음 작업 시 참고

- 새 작품을 추가할 때는 먼저 `app/works/works-data.js`를 업데이트합니다.
- 새 상세 페이지가 필요하면 `detailSlug`, `workDetails`, `public/works/projects/<slug>/` 구조를 같이 맞춥니다.
- 홈 그리드에만 남길 작업이면 `detailSlug`를 추가하지 않습니다.
- 네비게이션을 다시 바꿀 경우, 현재는 중앙 네비와 좌우 고정 링크가 분리된 구조라는 점을 고려해야 합니다.
- `dev-server.log`, `dev-server.err` 같은 임시 로컬 파일은 커밋하지 않습니다.
