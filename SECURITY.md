# SECURITY

이 문서는 JUPSY 홈페이지의 운영 안전 규칙입니다. 비밀값, 문의 수신 채널, 외부 자산, 저작권 리스크를 다룹니다.

## 환경 변수

`.env.local`은 로컬 전용 파일이며 Git에 포함하지 않습니다. 배포 환경에서는 Vercel Project Settings의 Environment Variables에 별도로 등록합니다.

필요한 변수:

- `NEXT_PUBLIC_SITE_URL`: 실제 배포 도메인
- `DISCORD_WEBHOOK_URL`: 문의 수신용 Discord webhook
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM_EMAIL`
- `INQUIRY_TO_EMAIL`

`DISCORD_WEBHOOK_URL`, SMTP 계정, 앱 비밀번호는 절대 README, CHANGELOG, 코드, 커밋 메시지에 적지 않습니다.

## 문의 API 안전 규칙

`app/api/inquiry/route.js`는 사용자 입력을 외부 채널로 전달합니다.

- 연락처와 의뢰 내용은 필수입니다.
- 허니팟 필드와 너무 빠른 제출 차단이 있습니다.
- 입력값은 길이 제한을 적용한 뒤 Discord와 메일로 전달합니다.
- `replyTo`는 연락처가 이메일 형식일 때만 적용합니다.
- Discord와 SMTP는 독립 전송합니다. 한 채널 실패가 다른 채널 전송을 막으면 안 됩니다.
- 로그에는 오류 원인만 남기고, 문의 본문이나 연락처 같은 개인정보를 과하게 남기지 않습니다.

현재 rate limit은 메모리 기반입니다. 배포 인스턴스가 여러 개이거나 스팸이 늘면 Upstash Redis, Vercel KV, Cloudflare Turnstile 같은 외부 보호 장치를 검토합니다.

## 자산과 저작권

`public/works/`와 `public/clients/`의 이미지는 실제 포트폴리오와 클라이언트 로고입니다.

- 외부 레퍼런스, 고객 제공 자료, 생성형 AI 결과물은 사용 권한이 확인된 것만 커밋합니다.
- 클라이언트 로고는 임의로 변형하지 않고, 필요한 경우 표시 크기나 배경 대비만 CSS로 조정합니다.
- 새 영상 미리보기는 원본 전체를 올리기보다 웹용 짧은 `webm`로 관리합니다.
- 불필요한 원본 대용량 파일은 배포 용량과 권리 범위를 늘리므로 커밋하지 않습니다.
- 파일명에는 가능하면 ASCII와 소문자, 하이픈을 사용합니다.

## 외부 링크와 임베드

홈 영상 모달은 YouTube와 Google Drive 링크를 임베드 가능한 URL로 변환합니다. 새 외부 플랫폼을 추가할 때는 허용할 host를 명시적으로 처리하고, 임의 URL을 그대로 iframe에 넣지 않습니다.

외부 링크는 새 탭에서 열고 `rel="noreferrer"`를 유지합니다.

## 신고와 사고 대응

비밀값이 커밋되었거나 외부에 노출되었다면 즉시 해당 webhook, SMTP 비밀번호, 앱 비밀번호를 폐기하고 새 값으로 교체합니다. Git 기록에 남은 비밀값은 단순 삭제 커밋만으로는 안전하지 않습니다.
