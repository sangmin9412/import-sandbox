# dfluid

## 🚀 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, SCSS
- **UI Components**: Radix UI, Swiper
- **Forms**: React Hook Form, Zod
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Fonts**: Exo 2, Montserrat (Google Fonts)

## 📁 프로젝트 구조

```
dfluid/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 라우터
│   │   │   ├── cards/         # 카드 API 엔드포인트
│   │   │   ├── image/         # 이미지 API 엔드포인트
│   │   │   ├── photos/        # 사진 API 엔드포인트
│   │   │   └── subscribe/     # 구독 API 엔드포인트
│   │   ├── main/              # 메인 페이지
│   │   │   └── _components/   # 메인 페이지 전용 컴포넌트
│   │   ├── globals.scss       # 전역 스타일
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── error.tsx          # 에러 페이지
│   │   └── not-found.tsx      # 404 페이지
│   ├── components/            # 공통 컴포넌트
│   │   ├── ui/               # UI 컴포넌트
│   │   ├── providers/        # React 프로바이더
│   │   ├── layouts/          # 레이아웃 컴포넌트
│   │   └── error/            # 에러 관련 컴포넌트
│   ├── lib/                   # 라이브러리 및 유틸리티
│   │   ├── api/              # API 관련 함수
│   │   ├── utils/            # 유틸리티 함수
│   │   └── http.ts           # HTTP 클라이언트 설정
│   ├── types/                 # TypeScript 타입 정의
│   ├── config/                # 설정 파일
│   └── middleware.ts          # Next.js 미들웨어
├── public/                    # 정적 자산
│   ├── icons/                # 아이콘 파일
│   └── images/               # 이미지 파일
├── tailwind.config.ts         # Tailwind CSS 설정
├── tsconfig.json             # TypeScript 설정
├── next.config.ts            # Next.js 설정
├── eslint.config.mjs         # ESLint 설정
├── postcss.config.mjs        # PostCSS 설정
└── package.json              # 프로젝트 메타데이터
```

## 📦 설치 및 실행

### 필수 조건

- Node.js 18+
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
# 개발 서버 시작 (Turbopack 사용)
npm run dev
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

### 코드 품질 확인

```bash
# ESLint 실행
npm run lint
```

## 🛠 개발 설정

### 코드 스타일

- **ESLint**: 코드 품질 확인
- **Prettier**: 코드 포맷팅
- **TypeScript**: 타입 안전성

### 스타일링

- **Tailwind CSS**: 유틸리티 기반 CSS 프레임워크
- **SCSS**: CSS 전처리기
- **CSS Variables**: 테마 및 색상 관리

## 📝 라이센스

## 🤝 기여

---

**개발자**: sangmin9412
**버전**: 0.1.0  
**마지막 업데이트**: 2025.06.15
