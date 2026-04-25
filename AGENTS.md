# AGENTS

이 문서는 이 프로젝트를 수정하는 작업자가 먼저 읽는 진입 문서입니다. 자세한 제품 설명과 운영 이력은 `README.md`, 버전별 변경 내역은 `CHANGELOG.md`를 기준으로 봅니다.

## 먼저 볼 파일

1. `README.md`: 실행 방법, 현재 구현 상태, 에셋 규칙, 버전 관리
2. `CHANGELOG.md`: 이번 커밋에 들어갈 변경점과 빌드 버전
3. `ARCHITECTURE.md`: 라우트, 컴포넌트, 포트폴리오 데이터, public 에셋 구조
4. `SECURITY.md`: 환경 변수, 문의 API, 외부 링크와 자산 안전 규칙
5. `app/works/works-data.js`: 포트폴리오 목록과 상세 페이지 데이터의 단일 기준

## 작업 원칙

- 기존 사용자가 만든 변경은 되돌리지 않습니다. 특히 git status에 이미 잡혀 있는 삭제/수정 파일은 요청 없이 복구하지 않습니다.
- 새 포트폴리오 항목은 컴포넌트에 하드코딩하지 말고 `app/works/works-data.js`와 `public/works/...` 에셋을 같이 맞춥니다.
- 상세 페이지가 필요한 작업은 `worksItems.detailSlug`, `workDetails.slug`, `workDetails.itemId`, `public/works/projects/<slug>/`를 함께 확인합니다.
- Linux/Vercel 배포 환경은 파일명 대소문자를 구분합니다. 코드의 경로와 실제 파일명을 정확히 맞춥니다.
- `dev-server.log`, `dev-server.err`, `.env.local`, `.next`, `node_modules`는 커밋하지 않습니다.
- 디자인 수정은 `app/site.css`의 기존 패턴을 우선 따르고, UI를 크게 바꾸기 전에는 영향 범위를 작게 나눕니다.
- 문서 변경이 포함되면 `README.md`의 최근 업데이트와 `CHANGELOG.md`가 현재 버전과 맞는지 확인합니다.

## 주요 명령

```bash
npm install
npm run dev
npm run lint
npm run build
npm run update:preview
```

현재 개발 서버는 Windows 한글 경로 안정성을 위해 `npm run dev`에서 `next dev --webpack`을 사용합니다.

## 완료 전 체크리스트

- `npm run lint` 통과
- `npm run build` 통과
- 포트폴리오 에셋 경로 누락 없음
- 모바일과 데스크톱에서 주요 UI가 깨지지 않음
- 문의 폼 변경 시 `/api/inquiry`의 필수값, 허니팟, 수신 채널 동작 확인
- 버전 변경이 있으면 `package.json`, `package-lock.json`, `README.md`, `CHANGELOG.md`가 같은 버전을 가리킴
