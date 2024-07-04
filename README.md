<div align="center">

<h2> BEAT </h2>

<img width="421" alt="Screenshot 2024-07-04 at 5 01 50 PM" src="https://github.com/TEAM-BEAT/BEAT-Client/assets/58854041/89dc6e6b-ab96-4fd0-bcfa-77a3439f9442" alt="서비스대표-이미지" />
<div>모두를 위한, </br>그래서 대학생을 위한 예매 플랫폼</div>

</div>

<h2> 👥 Team </h2>

<table align="center">
    <tr align="center">
      <td style="min-width: 150px;">
            <a href="https://github.com/pepperdad">
              <img src="https://avatars.githubusercontent.com/u/58854041?v=4" width="200" alt="깃허브계정-프로필사진">
              <br />
              <b>🐱정도영</b>
            </a>
        </td>
      <td style="min-width: 150px;">
            <a href="https://github.com/imddoy">
              <img src="https://avatars.githubusercontent.com/u/90364711?v=4" width="200" alt="깃허브계정-프로필사진">
              <br />
              <b>🎧김채현</b>
            </a>
        </td>
      <td style="min-width: 150px;">
            <a href="https://github.com/ocahs9">
              <img src="https://avatars.githubusercontent.com/u/155794105?v=4" width="200" alt="깃허브계정-프로필사진">
              <br />
              <b>🐶공준혁</b>
            </a>
        </td>
      <td style="min-width: 150px;">
            <a href="https://github.com/sinji2102">
              <img src="https://avatars.githubusercontent.com/u/66528589?v=4" width="200" alt="깃허브계정-프로필사진">
              <br />
              <b>🎱윤신지</b>
            </a>
        </td>
    </tr>
    <tr align="center">
       <td>
            예매하기 뷰 <br/>
      </td>
       <td>
            공연 등록하기 뷰 <br/>
      </td>
       <td>
            공연 관리하기 뷰 <br/>
      </td>
      <td>
            메인, 예매내역 조회 뷰 <br/>
      </td>
    </tr>
</table>

<h2> 🛠 기술스택 </h2>

```
- React + TypeScript
- yarn berry
- styled-component
- prettier, ESlint, StyleLint
- jotai
- React-query
- Storybook
- SonarCloud
```

<br/>

<h2> 📄 컨벤션 및 브랜치 전략 </h2>
<h3>Git Branch</h3>

```
- main (배포용)
- develop (개발용)
- feat/#issue/기능명 (작업용)
```

<h3>Commit Convention</h3>
Commit Message 👉 기능 키워드: 커밋 내용</br>

```
feat : 새로운 기능 추가
fix : 버그 수정
chore : 빌드 업무, 패키지 매니저, 라이브러리, dependencies 설정
docs : 문서 수정 - ex) [README.md](http://readme.md/)
design : 사용자 UI 디자인 변경 - ex) CSS
style : 기능 수정 없는 코드 스타일 변경
refactor : 코드 리팩터링
test : 테스트 코드, 리펙토링 테스트 코드 추가
ci : ci 설정 파일 수정
perf : 성능 개선
rename : 파일 혹은 폴더명 변경
```

<h2> 📁 폴더 구조 </h2>

```
|-- 📁 public
|-- 📁 src
    |-- 📁 asset
	      |-- 📁 svgs
	      |-- 📁 images
    |-- 📁 apis
    |-- 📁 components
	      |-- 📁 commons (button , input 등 재사용의 가장 작은 단위)
	      |-- 📁 icons(React Icon Components)
    |-- 📁 constants
    |-- 📁 pages
   	    |-- 📁 Apage
            |-- 📁components
            |-- 📁constants
            |-- 📁types
            |-- 📁hooks
            |-- 📁utils
            |-- Apage.tsx
            |-- Apage.styled.ts
        |-- 📁 Bpage
        |-- 📁 Cpage
   |-- 📁 hooks (커스텀 훅을 담아두는 폴더)
   |-- 📁 styles (GlobalStyles , theme.ts 등)
   |-- 📁 utils (재사용이 높은 함수모음 폴더)
   |-- 📁 types
   |-- 📁 routes
       |-- Router.tsx (라우터 파일)
|-- App.tsx
|-- main.tsx
|-- eslint.config.js
|-- .gitignore
|-- .prettierrc.json
|-- .stylelintrc.json
|-- README.md
|-- package.json
|-- tsconfig.json
|-- yarn.lock
```

<h3>비트 아이엠 그라운드 룰</h3>

✅ 우울하지 말고 우웅하기 <br/>
✅ 서로 칭찬하고 굿 ~~ 해주기 <br/>
✅ 자기가 오늘 할일을 시작하기 전에 리뷰먼저! <br/>
✅ 화이팅하자 ㅋㅋ <br/>
