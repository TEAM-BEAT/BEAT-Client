// deploy.ts

// 1. 스타일을 추가하는 함수
function addInlineStyle() {
  const style = document.createElement("style");
  style.textContent = `
    .deploy-loading {
      width: 100vw; /* 100% 너비 */
      height: 100vh; /* 100% 높이 */
      z-index: 1000;
      position: fixed; /* 화면에 고정 */
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
      display: flex;
      justify-content: center;
      align-items: center;
      color: white; /* 텍스트 색상 */
      font-size: 24px; /* 텍스트 크기 */
    }

    /* 숨겨질 때 사용할 CSS 클래스 */
    .hidden {
      display: none;
    }
  `;
  document.head.appendChild(style);
}

// 2. 특정 CSS 파일이 로드되면 요소를 숨기거나 제거하는 함수
function hideOrRemoveElementOnCssLoad(
  selector: string,
  cssFileUrl: string,
  shouldRemove: boolean = false
) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = cssFileUrl;

  link.onload = () => {
    const element = document.querySelector(selector);
    if (element) {
      if (shouldRemove) {
        element.remove(); // 요소를 DOM에서 제거
      } else {
        element.classList.add("hidden"); // 요소를 숨기기
      }
    }
  };

  document.head.appendChild(link);
}

// 3. 실행 로직
function initialize() {
  addInlineStyle(); // 인라인 스타일 추가
  const selector = ".deploy-loading";
  const cssFileUrl = "/styles/main.css";

  // 특정 CSS 파일이 로드되면 요소를 숨기거나 제거
  hideOrRemoveElementOnCssLoad(selector, cssFileUrl, false); // 숨기기
  // hideOrRemoveElementOnCssLoad(selector, cssFileUrl, true); // 제거하기
}

// 4. 초기화 함수 호출
initialize();
