<div align="center">

<h2> BEAT </h2>
<svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3999_41443)">
<rect width="192" height="192" rx="96" fill="#0F0F0F"/>
<path d="M125.859 96.856L112.182 53.9171L105.474 32L98.9363 54.2286L84.3723 111.844L73.0839 82.05L66.2455 60.3145L57.3845 81.7515L50.1807 96.856H37V108.976H60.3599L66.0889 98.1926L78.8912 137.187L86.6952 159L92.098 136.733L106.362 80.2852L115.497 108.976H155V96.856H125.859Z" fill="url(#paint0_linear_3999_41443)"/>
</g>
<defs>
<linearGradient id="paint0_linear_3999_41443" x1="92.2133" y1="32" x2="89.0426" y2="180.753" gradientUnits="userSpaceOnUse">
<stop offset="0.257954" stop-color="#FF006B"/>
<stop offset="1" stop-color="#FF006B" stop-opacity="0.16"/>
</linearGradient>
<clipPath id="clip0_3999_41443">
<rect width="192" height="192" fill="white"/>
</clipPath>
</defs>
</svg>

<div>모두를 위한, </br>그래서 대학생을 위한 예매 플랫폼</div>

</div>

<h2> 👥 Team </h2>

<table align="center">
    <tr align="center">
      <td style="min-width: 150px;">
            <a href="https://github.com/pepperdad">
              <img src="https://github.com/user-attachments/assets/43a13acd-1ff8-43f5-98ac-6b80515ef020" width="200" alt="깃허브계정-프로필사진">
              <br />
              <b>🐱정도영</b>
            </a>
        </td>
      <td style="min-width: 150px;">
            <a href="https://github.com/imddoy">
              <img src="https://github.com/user-attachments/assets/734cc263-5c17-4023-bc6b-734d363ad3f9" width="200" alt="깃허브계정-프로필사진">
              <br />
              <b>🎧김채현</b>
            </a>
        </td>
      <td style="min-width: 150px;">
            <a href="https://github.com/ocahs9">
              <img src="https://github.com/user-attachments/assets/a5ba9ed1-2df7-4bc8-93d9-8bf138988f7f" width="200" alt="깃허브계정-프로필사진">
              <br />
              <b>🐶공준혁</b>
            </a>
        </td>
      <td style="min-width: 150px;">
            <a href="https://github.com/sinji2102">
              <img src="https://github.com/user-attachments/assets/723ddd04-2d81-4829-8c94-69ab1403171b" width="200" alt="깃허브계정-프로필사진">
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

<h3>Coding Convention</h3>
<a href="https://jiwoothejay.notion.site/Coding-Convention-499fe091765e48bb8e933039a26555e6">Team Beat Web의 코딩 컨벤션</a>

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

<h2>📷 스크린샷</h2>
<table align="center">
        <tr align="center">
            <th>뷰</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
        </tr>
        <tr>
            <td>예매하기</td>
            <td><img src="path/to/image1.png" alt="Book 1"></td>
            <td><img src="path/to/image2.png" alt="Book 2"></td>
            <td><img src="path/to/image3.png" alt="Book 3"></td>
            <td><img src="path/to/image4.png" alt="Book 4"></td>
        </tr>
        <tr>
            <td>등록하기</td>
            <td><img src="path/to/image5.png" alt="Register 1"></td>
            <td><img src="path/to/image6.png" alt="Register 2"></td>
            <td><img src="path/to/image7.png" alt="Register 3"></td>
            <td><img src="path/to/image8.png" alt="Register 4"></td>
        </tr>
        <tr>
            <td>관리하기</td>
            <td><img src="path/to/image9.png" alt="Manage 1"></td>
            <td><img src="path/to/image10.png" alt="Manage 2"></td>
            <td><img src="path/to/image11.png" alt="Manage 3"></td>
            <td><img src="path/to/image12.png" alt="Manage 4"></td>
        </tr>
        <tr>
            <td>메인/조회하기</td>
            <td><img src="path/to/image13.png" alt="Look up 1"></td>
            <td><img src="path/to/image14.png" alt="Look up 2"></td>
            <td><img src="path/to/image15.png" alt="Look up 3"></td>
            <td><img src="path/to/image16.png" alt="Look up 4"></td>
        </tr>
    </table>

<h3>🎸 비트 아이엠 그라운드 룰</h3>

✅ 우울하지 말고 우웅하기 <br/>
✅ 서로 칭찬하고 굿 ~~ 해주기 <br/>
✅ 자기가 오늘 할일을 시작하기 전에 리뷰먼저! <br/>
✅ 화이팅하자 ㅋㅋ <br/>
