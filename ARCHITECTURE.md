# ARCHITECTURE

JUPSY 홈페이지는 Next.js App Router 기반의 정적 중심 포트폴리오 사이트입니다. 홈과 소개 페이지는 클라이언트 컴포넌트로 인터랙션을 처리하고, 작품 상세 페이지는 `workDetails` 기준으로 정적 생성됩니다.

## 앱 구조

- `app/layout.js`: 전역 메타데이터, 폰트 링크, Vercel Analytics
- `app/page.js`: 홈 페이지 서버 엔트리, 홈 JSON-LD 주입
- `app/about/page.js`: 소개 페이지 서버 엔트리, About JSON-LD 주입
- `app/works/[slug]/page.js`: 작품 상세 SSG 라우트
- `app/api/inquiry/route.js`: 문의 폼 제출 API
- `app/robots.js`: robots.txt 생성
- `app/sitemap.js`: sitemap.xml 생성
- `app/opengraph-image.js`, `app/twitter-image.js`: 공유 이미지 생성 라우트
- `app/site.css`: 전체 UI 스타일의 중심 파일

## 컴포넌트 구조

- `components/HomePageClient.js`: 홈 히어로, 클라이언트 마퀴, 작품 그리드, 영상 모달, 문의 모달 연결
- `components/AboutPageClient.js`: 소개 페이지 화면과 문의 모달 연결
- `components/WorkDetailPageClient.js`: 상세 히어로, 이미지 갤러리, CTA
- `components/ContactModal.js`: 공통 문의 폼 모달
- `components/SiteHeader.js`: 고정 브랜드/문의 링크와 중앙 내비게이션
- `components/SiteFooter.js`: 이메일과 소셜 링크
- `components/JsonLdScript.js`: JSON-LD 출력 헬퍼

## 데이터 흐름

`app/works/works-data.js`가 포트폴리오 데이터의 단일 기준입니다.

- `worksFilters`: 홈 필터 탭
- `worksItems`: 홈 작품 카드 목록
- `workDetails`: 내부 상세 페이지 데이터
- `getWorkDetailBySlug`: 상세 데이터와 홈 카드 데이터를 병합하고 갤러리를 파일명 숫자 기준으로 정렬

내부 상세 페이지를 만들려면 `worksItems` 항목에 `detailSlug`를 추가하고, 같은 slug를 가진 `workDetails` 항목을 추가합니다. `workDetails.itemId`는 해당 `worksItems.id`와 반드시 맞아야 합니다.

## 에셋 구조

- `public/clients/`: 클라이언트 로고
- `public/home/`: 홈 카드용 정적 이미지
- `public/works/image/`: 홈 작품 카드 썸네일
- `public/works/video/`: 홈 영상 미리보기용 `webm`
- `public/works/projects/<slug>/`: 작품 상세 갤러리 이미지

이미지 상세 갤러리는 가능하면 `webp`를 사용하고, 파일명은 `project-01.webp`, `project-02.webp`처럼 0 패딩 숫자 규칙을 유지합니다.

## SEO와 공유 데이터

공통 사이트 정보는 `lib/siteMetadata.js`에 있습니다. `NEXT_PUBLIC_SITE_URL`, `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_URL` 순서로 canonical base URL을 결정하고, 끝 슬래시는 제거합니다.

구조화 데이터는 `lib/structuredData.js`가 담당합니다.

- 홈: Organization, WebSite, WebPage, ItemList
- 소개: BreadcrumbList, AboutPage
- 상세: BreadcrumbList, CreativeWork

## 문의 API

`POST /api/inquiry`는 `ContactModal`에서 호출됩니다. API는 다음 순서로 동작합니다.

1. JSON body 파싱과 기본 형식 검증
2. 허니팟과 너무 빠른 제출 차단
3. IP 기준 간단한 메모리 rate limit
4. 필수값과 길이 제한 처리
5. Discord webhook과 SMTP 메일을 독립 전송
6. 성공 채널이 하나 이상 있으면 성공 응답
7. Vercel Analytics 서버 이벤트 기록

서버리스 환경에서 메모리 rate limit은 인스턴스별로만 동작합니다. 강한 스팸 방지가 필요하면 외부 저장소나 Turnstile 같은 별도 보호 장치를 추가해야 합니다.
