## Feature-Sliced Design (FSD) Structure

이 프로젝트는 [Feature-Sliced Design](https://feature-sliced.design/) 아키텍처를 따르고 있습니다.

### 📂 Directory Overview

#### root

- **`app/`**: **전역 라우팅 (Next.js App Router)**
  - Next.js가 인식하는 주소 체계입니다.
  - 로직은 작성하지 않고 `src/pages`의 페이지를 `import`하여 렌더링만 담당합니다.
- **`pages/`**: (Empty) FSD 충돌 방지용 빈 폴더.

#### src (FSD Layers)

- **`app/`**: **앱 전역 설정**
  - `providers/`: QueryClient, Theme 등 전역 Provider
  - `styles/`: 전역 스타일 (globals.css)
- **`pages/`**: **페이지 단위 로직**
  - 각 라우트에 대응하는 UI와 로직을 조립하는 곳입니다.
  - 예: `src/pages/home` -> `app/page.tsx`에 연결
- **`widgets/`**: **독립적인 UI 블록**
  - Header, Footer, Sidebar 등 Feature와 Entity를 결합한 컴포넌트
- **`features/`**: **사용자 시나리오/기능**
  - 좋아요, 로그인, 장바구니 담기 등 사용자의 동작과 관련된 기능
- **`entities/`**: **비즈니스 모델**
  - User, Product, Order 등 도메인 데이터와 UI
- **`shared/`**: **재사용 가능한 공통 코드**
  - **`api/`**: Axios 인스턴스 (`instance.ts`), Query Factory (`query-factory.ts`)
  - **`ui/`**: 공용 UI 컴포넌트 (Button, Input 등)
  - **`lib/`**: 유틸리티 함수 (`cn`, formatting 등)
  - **`model/`**: 전역 스토어 (`use-app-store.ts`)

### 📝 Key Files

- `src/shared/api/instance.ts`: Axios 기본 설정 및 인터셉터
- `src/shared/api/query-factory.ts`: TanStack Query Key 관리
- `src/shared/model/use-app-store.ts`: Zustand 전역 상태 관리
- `src/shared/lib/utils.ts`: 스타일 병합 유틸리티 (`cn`)
