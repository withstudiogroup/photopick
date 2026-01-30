# Design Review Results: 홈페이지 (/)

**Review Date**: 2026-01-19  
**Route**: /  
**Focus Areas**: Visual Design, UX/Usability, Responsive/Mobile, Accessibility, Micro-interactions/Motion, Consistency, Performance

## Summary

PhotoPick 홈페이지는 프리미엄 사진 스튜디오 예약 플랫폼답게 시각적으로 세련되고 감각적인 디자인을 갖추고 있습니다. 전체적인 브랜딩과 색상 사용이 일관되며, Framer Motion을 활용한 애니메이션이 우아합니다. 하지만 접근성 측면에서 중요한 개선이 필요하며, 특히 WCAG 기준을 충족하지 못하는 색상 대비, 누락된 ARIA 속성, 키보드 네비게이션 문제가 발견되었습니다. 성능 지표도 개선이 필요하며, 일부 UX 패턴은 사용자 편의성을 높이기 위해 재검토가 필요합니다.

## Issues

| # | Issue | Criticality | Category | Location |
|---|-------|-------------|----------|----------|
| 1 | 히어로 섹션 자동 슬라이더에 일시정지/재생 컨트롤 없음 (WCAG 2.2.2 위반) | 🔴 Critical | Accessibility | `src/components/sections/HeroSection.tsx:33-55` |
| 2 | 검색 폼 입력 필드에 명시적 label 요소 누락 (WCAG 3.3.2) | 🔴 Critical | Accessibility | `src/components/sections/HeroSection.tsx:131-164` |
| 3 | 금색 텍스트와 배경 이미지 간 색상 대비 부족 (예상 3:1 미만) | 🔴 Critical | Accessibility | `src/components/sections/HeroSection.tsx:74-87` |
| 4 | 리뷰 섹션 배경 (#1A1A1A)과 텍스트 대비 불충분 | 🔴 Critical | Accessibility | `src/components/sections/ReviewsSection.tsx:17-22` |
| 5 | 카테고리 탭에 role="tablist" 및 aria-selected 속성 누락 | 🟠 High | Accessibility | `src/components/sections/HeroSection.tsx:109-128` |
| 6 | 헤더 네비게이션 링크에 키보드 포커스 스타일 명시되지 않음 | 🟠 High | Accessibility | `src/components/layout/Header.tsx:56-74` |
| 7 | 모바일 검색 박스에서 입력 필드 최소 터치 타겟(44x44px) 미달 | 🟠 High | Responsive | `src/components/sections/HeroSection.tsx:131-164` |
| 8 | Swiper 네비게이션 버튼에 aria-label 누락 | 🟠 High | Accessibility | `src/components/sections/EventSection.tsx:69-79` |
| 9 | 이미지에 의미 있는 alt 텍스트 부족 ("Hero background"는 불충분) | 🟠 High | Accessibility | `src/components/sections/HeroSection.tsx:43-50` |
| 10 | StudioCard의 하트 아이콘 버튼에 접근 가능한 레이블 없음 | 🟠 High | Accessibility | `src/components/studio/StudioCard.tsx` (파일 미확인, 추정) |
| 11 | LCP 10.3초, 성능 최적화 필요 (3초 이하 목표) | 🟠 High | Performance | 전체 페이지 |
| 12 | 페이지 크기 3.5MB로 과도함 (이미지 최적화 필요) | 🟠 High | Performance | 전체 페이지 |
| 13 | 검색 박스 placeholder만으로 필드 설명 (레이블 부재) | 🟡 Medium | UX/Usability | `src/components/sections/HeroSection.tsx:136-158` |
| 14 | 카테고리 섹션 배경색이 너무 어두워 일관성 저하 | 🟡 Medium | Visual Design | `src/components/sections/CategoriesSection.tsx:52` |
| 15 | 이벤트 섹션 슬라이더 autoplay 4초는 너무 짧을 수 있음 | 🟡 Medium | UX/Usability | `src/components/sections/EventSection.tsx:73` |
| 16 | Footer 링크들이 모두 더미 링크로 404 발생 가능성 | 🟡 Medium | UX/Usability | `src/components/layout/Footer.tsx:8-25` |
| 17 | 스크롤 인디케이터 애니메이션이 무한 반복되어 주의 산만 가능성 | 🟡 Medium | Micro-interactions | `src/components/sections/HeroSection.tsx:179-183` |
| 18 | 모바일 메뉴 오버레이가 전체 화면을 덮어 스크롤 위치 손실 | 🟡 Medium | UX/Usability | `src/components/layout/Header.tsx:136-172` |
| 19 | 리뷰 카드에 날짜 정보 부재로 신뢰도 저하 | 🟡 Medium | UX/Usability | `src/components/sections/ReviewsSection.tsx:74-126` |
| 20 | 검색 모달의 탭 인덱스가 논리적 순서와 일치하지 않을 가능성 | 🟡 Medium | Accessibility | `src/components/layout/Header.tsx:176-285` |
| 21 | design-tokens.css의 변수명이 Tailwind v4 문법과 혼용됨 | 🟡 Medium | Consistency | `src/styles/design-tokens.css:1-63` |
| 22 | 헤더 로고 호버 효과의 width 애니메이션이 레이아웃 시프트 유발 | ⚪ Low | Micro-interactions | `src/components/layout/Header.tsx:45-50` |
| 23 | 소셜 미디어 링크에 rel="noopener noreferrer" 보안 속성 누락 | ⚪ Low | Performance | `src/components/layout/Footer.tsx:67-77` |
| 24 | 카테고리 카드 hover 시 ::before 가상 요소 사용으로 복잡도 증가 | ⚪ Low | Visual Design | `src/app/globals.css:84-86` |
| 25 | ReviewsSection의 평점 표시가 하드코딩되어 동적 데이터 반영 안 됨 | ⚪ Low | Consistency | `src/components/sections/ReviewsSection.tsx:38-47` |
| 26 | 페이지 전환 애니메이션 없어 SPA 경험 부족 | ⚪ Low | Micro-interactions | `src/app/layout.tsx:62-77` |
| 27 | Featured 섹션 필터 탭이 overflow 시 스크롤 힌트 없음 | ⚪ Low | UX/Usability | `src/components/sections/FeaturedSection.tsx:41-60` |
| 28 | Noise overlay opacity 0.025로 시각적 효과 미미 | ⚪ Low | Visual Design | `src/app/globals.css:414-421` |

## Criticality Legend
- 🔴 **Critical**: Breaks functionality or violates accessibility standards
- 🟠 **High**: Significantly impacts user experience or design quality
- 🟡 **Medium**: Noticeable issue that should be addressed
- ⚪ **Low**: Nice-to-have improvement

## Detailed Analysis by Category

### 1. 접근성 (Accessibility) - 12개 이슈

**Critical Issues:**
- 자동 슬라이더 컨트롤 부재는 WCAG 2.2.2를 직접 위반하며, 특히 읽기 장애나 주의력 결핍이 있는 사용자에게 문제가 됩니다
- 검색 폼의 label 요소 누락은 스크린리더 사용자가 각 필드의 목적을 파악하기 어렵게 만듭니다
- 색상 대비 문제는 저시력 사용자, 색맹 사용자, 밝은 환경에서의 가독성을 크게 저하시킵니다

**High Priority Issues:**
- ARIA 속성 누락으로 스크린리더 사용성이 크게 떨어집니다
- 키보드 포커스 스타일이 명시되지 않아 키보드만으로 탐색하는 사용자가 현재 위치를 파악하기 어렵습니다
- 이미지 alt 텍스트가 구체적이지 않아 시각 장애인에게 맥락을 제공하지 못합니다

**권장사항:**
1. 모든 자동 재생 컨텐츠에 명시적인 컨트롤 추가
2. 폼 요소에 적절한 label, aria-label, aria-describedby 속성 추가
3. WCAG AA 기준 (4.5:1 for normal text, 3:1 for large text) 준수하도록 색상 조정
4. 모든 인터랙티브 요소에 명확한 포커스 스타일 적용
5. 의미 있고 구체적인 alt 텍스트 작성

### 2. 반응형/모바일 (Responsive) - 2개 이슈

**High Priority Issues:**
- 모바일에서 검색 박스 입력 필드의 터치 타겟이 44x44px 미만일 가능성이 높습니다 (현재 padding: 15px)
- WCAG 2.5.5는 최소 44x44px의 터치 타겟을 권장합니다

**Medium Priority Issues:**
- 모바일 메뉴가 전체 화면을 덮으면서 사용자의 스크롤 위치가 손실되어 UX가 저하됩니다

**권장사항:**
1. 모바일 입력 필드 padding을 최소 12-14px로 설정하여 총 높이가 44px 이상이 되도록 조정
2. 모바일 메뉴를 슬라이드 패턴으로 변경하거나 스크롤 위치를 유지하는 로직 추가
3. 태블릿 브레이크포인트(768px)에서의 레이아웃 테스트 강화

### 3. 성능 (Performance) - 2개 이슈

**High Priority Issues:**
- LCP 10.3초는 Google의 권장사항(2.5초 이하)을 크게 초과합니다
- 페이지 크기 3.5MB는 모바일 사용자에게 과도한 데이터 소비를 유발합니다

**원인 분석:**
- 히어로 섹션의 4개 대형 이미지 (1920px width)가 동시에 로드됨
- Next.js Image 컴포넌트를 사용하고 있으나 외부 이미지 최적화가 제한적
- priority 속성이 첫 번째 이미지에만 적용됨

**권장사항:**
1. 히어로 이미지 크기를 viewport에 맞게 조정 (1200px 정도로 축소)
2. 슬라이더의 나머지 이미지를 lazy loading으로 변경
3. WebP 형식 사용 및 품질 조정 (q=80 → q=70)
4. Lighthouse 성능 감사 실행 및 권장사항 적용
5. 이미지 CDN 활용 고려 (Cloudinary, Imgix 등)

### 4. UX/사용성 (UX/Usability) - 6개 이슈

**Medium Priority Issues:**
- 검색 박스가 placeholder에만 의존하면 입력 시작 후 힌트가 사라져 혼란 가능성
- 이벤트 섹션 autoplay 4초는 사용자가 내용을 읽기에 부족할 수 있음
- Footer의 더미 링크들이 404 오류를 발생시킬 수 있음
- 리뷰에 날짜가 없어 최신성을 판단하기 어려움

**Low Priority Issues:**
- Featured 섹션의 필터 탭이 가로 스크롤될 때 힌트가 없어 숨겨진 옵션을 발견하기 어려움

**권장사항:**
1. 검색 폼을 floating label 패턴으로 변경하거나 영구적인 label 추가
2. 이벤트 슬라이더 autoplay를 6-8초로 증가하거나 사용자 제어 옵션 제공
3. Footer 링크를 실제 페이지로 연결하거나 개발 중임을 표시
4. 리뷰 카드에 "2주 전", "1개월 전" 형식의 상대적 날짜 추가
5. 필터 탭에 fade gradient나 스크롤 인디케이터 추가

### 5. 비주얼 디자인 (Visual Design) - 3개 이슈

**Medium Priority Issues:**
- CategoriesSection의 배경색 (#2D2D2D charcoal)이 페이지의 전체적인 밝은 톤과 대비되어 일관성 저하
- 다른 섹션들이 ivory/beige 배경을 사용하는 반면 이 섹션만 어두운 배경 사용

**Low Priority Issues:**
- Noise overlay의 opacity가 0.025로 너무 낮아 의도한 빈티지/프리미엄 느낌을 제대로 전달하지 못함
- 카테고리 카드의 hover 효과가 ::before 가상 요소를 사용하여 CSS 복잡도가 높음

**권장사항:**
1. CategoriesSection 배경을 charcoal-light (#3D3D3D)나 gradient로 변경하여 덜 극적인 대비 만들기
2. Noise overlay opacity를 0.04-0.05로 증가하여 텍스처를 더 명확히 표현
3. 카드 hover 효과를 단순한 border-color 변경이나 box-shadow로 대체

### 6. 마이크로 인터랙션/모션 (Micro-interactions) - 3개 이슈

**Medium Priority Issues:**
- 스크롤 인디케이터의 무한 반복 애니메이션이 사용자 주의를 지나치게 끌 수 있음

**Low Priority Issues:**
- 헤더 로고의 width 애니메이션이 레이아웃 시프트를 유발할 수 있음 (CLS 점수에 영향)
- 페이지 간 전환 시 애니메이션이 없어 SPA의 부드러운 경험이 부족

**권장사항:**
1. 스크롤 인디케이터 애니메이션을 3-5회 반복 후 정지하도록 변경
2. 로고 호버 효과를 scaleX나 opacity 변경으로 대체하여 레이아웃 시프트 방지
3. Next.js App Router의 페이지 전환에 Framer Motion의 AnimatePresence 추가

### 7. 일관성 (Consistency) - 3개 이슈

**Medium Priority Issues:**
- design-tokens.css가 Tailwind v4의 @theme 문법을 사용하지만, 일부 변수는 CSS 변수로도 정의되어 혼용됨
- 예: `--color-gold`는 `@theme`에 정의되어 있지만 코드에서 `var(--color-gold)` 형태로 사용

**Low Priority Issues:**
- ReviewsSection의 평점 표시 (4.9, 리뷰 개수)가 하드코딩되어 있어 실제 데이터와 불일치 가능성

**권장사항:**
1. Tailwind v4 theme 변수를 일관되게 사용하거나, CSS 변수로 통일
2. 평점과 리뷰 개수를 동적으로 계산하여 표시
3. 디자인 토큰 사용 가이드라인 문서화

## Next Steps

### 우선순위 1 (Critical & High) - 즉시 수정 필요
1. **접근성 문제 해결** (Issues #1-10)
   - 자동 슬라이더 컨트롤 추가
   - 폼 레이블 및 ARIA 속성 추가
   - 색상 대비 개선
   - 키보드 포커스 스타일 추가
   
2. **성능 최적화** (Issues #11-12)
   - 이미지 크기 최적화
   - Lazy loading 구현
   - Lighthouse 감사 실행

### 우선순위 2 (Medium) - 1-2주 내 수정 권장
3. **UX 개선** (Issues #13-20)
   - 검색 폼 레이블 추가
   - 리뷰 날짜 표시
   - Footer 링크 연결
   
4. **디자인 일관성** (Issue #21)
   - 디자인 토큰 정리

### 우선순위 3 (Low) - 향후 개선 고려
5. **마이크로 인터랙션 개선** (Issues #22, #26)
6. **기타 UX 개선** (Issues #23-28)

## 긍정적인 측면

- ✅ **일관된 브랜딩**: 금색(#C9A962)과 차콜(#2D2D2D)의 조화로운 색상 팔레트
- ✅ **우아한 애니메이션**: Framer Motion을 활용한 부드러운 진입 애니메이션
- ✅ **체계적인 디자인 토큰**: design-tokens.css를 통한 중앙화된 스타일 관리
- ✅ **프리미엄 느낌**: Cormorant Garamond, Gowun Batang 등 세련된 폰트 선택
- ✅ **반응형 기반**: 대부분의 섹션이 모바일 브레이크포인트를 고려하여 구현됨
- ✅ **컴포넌트 구조**: 섹션별로 잘 분리된 컴포넌트 구조로 유지보수성이 높음

---

**검토자 노트**: 이 리뷰는 브라우저를 통한 시각적 검사와 코드 분석을 병행하여 작성되었습니다. 접근성 이슈는 자동화 도구(예: axe DevTools)로 추가 검증이 권장됩니다.