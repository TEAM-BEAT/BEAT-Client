# BEAT  <img src="https://github.com/user-attachments/assets/9149a208-b89d-4780-a712-6e38b9b10461" width="100" align="left" />
간편하게 소규모 공연을 등록하고 관리할 수 있는 티켓 예매 플랫폼

<img src="https://github.com/user-attachments/assets/0efee26a-a268-49ea-9ef9-dba61c685695" />
<img src="https://github.com/user-attachments/assets/54068895-2813-4feb-9bef-8fe5186ae044" />

<h2>💓 핵심 기능</h2>
<li>공연 등록하기</li>
<li>공연 예매하기</li>
<li>공연 관리하기</li>
<li>예매 조회하기</li>

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

</br>

<h2> 🛠 기술스택 </h2>

   <div align="center">

| 역할                 | 종류                                                                                                                                                                                                                                                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Library              | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)                                                                                                                                                                                                                              |
| Programming Language | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)                                                                                                                                                                                                               |
| Styling              | ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)                                                                                                                                                                                         |
| Data Fetching        | ![React-Query](https://img.shields.io/badge/reactquery-FF4154.svg?style=for-the-badge&logo=reactquery&logoColor=white)  |  
| State Management     | ![Jotai](https://img.shields.io/badge/jotai-000000.svg?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4&logoColor=white)  |                                                                                                                                                                                 
| Formatting           | ![ESLint](https://img.shields.io/badge/eslint-4B32C3.svg?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=white) ![StyleLint](https://img.shields.io/badge/stylelint-E0EFEF?style=for-the-badge&logo=stylelint&logoColor=000) |
| Documentation        | ![StoryBook](https://img.shields.io/badge/storybook-FF4785.svg?style=for-the-badge&logo=storybook&logoColor=white)   |
| Code Quality         | ![SonarCloud](https://img.shields.io/badge/sonarcloud-F3702A.svg?style=for-the-badge&logo=sonarcloud&logoColor=white)   |
| Package Manager      | ![Yarn Berry](https://img.shields.io/badge/yarnberry-2C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)   |
| Version Control      | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)                                                                                                                |
| Deployment           | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                                                                                                                                                                                                                           |

</div>

</br>

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

<h2>📷 구현 스크린샷</h2>
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
            <td><img width="277" alt="image" src="https://github.com/user-attachments/assets/38492824-314b-4734-8d84-17319c19e6db"></td>
            <td><img width="277" alt="image" src="https://github.com/user-attachments/assets/eae8e73d-da98-4581-8c96-6cc70319251b"></td>
            <td><img width="281" alt="image" src="https://github.com/user-attachments/assets/ae4fdc84-5141-43c4-91ab-2835005f5676">
</td>
            <td><img width="308" alt="image" src="https://github.com/user-attachments/assets/8128410e-f227-4944-a165-ed3c1e11883c"></td>
        </tr>
        <tr>
            <td>등록하기</td>
            <td><img width="278" alt="image" src="https://github.com/user-attachments/assets/174c165e-a9a8-492e-b3d0-2267f6268dd4"></td>
            <td><img width="283" alt="image" src="https://github.com/user-attachments/assets/3e2383da-ae73-4b43-bf66-de1a36554dac"></td>
            <td><img width="281" alt="image" src="https://github.com/user-attachments/assets/77edf936-0bc8-4af5-9658-eba3ae5241de"></td>
            <td><img width="239" alt="image" src="https://github.com/user-attachments/assets/1f15a6cd-331b-4c4c-9a0e-9eb7d5e0c921"></td>
        </tr>
        <tr>
            <td>관리하기</td>
            <td><img src="https://github.com/user-attachments/assets/36c00380-337d-4bc5-aeee-d6a4df5c9773" alt="Manage 1"></td>
            <td><img src="https://github.com/user-attachments/assets/83bb227f-c8a2-4d6b-a2ce-9ee951562204" alt="Manage 2"></td>
            <td><img src="https://github.com/user-attachments/assets/4b44f238-4b9f-42ff-9eeb-06d08f505ed5" alt="Manage 3"></td>
            <td><img src="https://github.com/user-attachments/assets/86f52faf-cfab-47f1-a33d-c1f1aaaf7223" alt="Manage 4"></td>
        </tr>
        <tr>
            <td>메인/조회하기</td>
            <td><img width="280" alt="image" src="https://github.com/user-attachments/assets/22a9e216-9fdb-4a17-832b-eac7822b9833"></td>
            <td><img width="275" alt="image" src="https://github.com/user-attachments/assets/7b62ad05-fa93-4f34-8675-ff10e4315b27"></td>
            <td><img width="284" alt="image" src="https://github.com/user-attachments/assets/60ecea4a-0377-47a8-ae17-29eae1e38b45"></td>
            <td><img width="276" alt="image" src="https://github.com/user-attachments/assets/facf500a-1f88-4d8a-b5b4-b4a67babc757"></td>
        </tr>
    </table>

<h2>✒️ 비트 팀 블로그</h2>

[티팔놈들의 블로그 보러가기](https://team-beat.tistory.com/)

<h2> 📁 폴더 구조 </h2>

```
📦src
 ┣ 📂apis
 ┃ ┣ 📂domains
 ┃ ┃ ┣ 📂bookings
 ┃ ┃ ┣ 📂files
 ┃ ┃ ┣ 📂home
 ┃ ┃ ┣ 📂performance
 ┃ ┃ ┣ 📂performances
 ┃ ┃ ┣ 📂register
 ┃ ┃ ┣ 📂tickets
 ┃ ┃ ┗ 📂users
 ┃ ┣ 📂kakoLogin
 ┃ ┗ 📜index.ts
 ┣ 📂assets
 ┃ ┣ 📂images
 ┃ ┣ 📂lottie
 ┃ ┗ 📂svgs
 ┣ 📂components
 ┃ ┣ 📂commons
 ┃ ┃ ┣ 📂bank
 ┃ ┃ ┃ ┣ 📂bottomSheet
 ┃ ┃ ┣ 📂bottomSheet
 ┃ ┃ ┃ ┣ 📂actionsBottomSheet
 ┃ ┃ ┃ ┃ ┣ 📂phoneNumber
 ┃ ┃ ┃ ┣ 📂viewBottomSheet
 ┃ ┃ ┣ 📂button
 ┃ ┃ ┣ 📂chip
 ┃ ┃ ┣ 📂contextBox
 ┃ ┃ ┣ 📂hamburger
 ┃ ┃ ┣ 📂input
 ┃ ┃ ┃ ┣ 📂textArea
 ┃ ┃ ┃ ┗ 📂textField
 ┃ ┃ ┣ 📂label
 ┃ ┃ ┣ 📂loading
 ┃ ┃ ┣ 📂modal
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┣ 📂navigation
 ┃ ┃ ┣ 📂scrollToTop
 ┃ ┃ ┣ 📂spacing
 ┃ ┃ ┣ 📂stepper
 ┃ ┃ ┣ 📂timepicker
 ┃ ┃ ┗ 📂toast
 ┃ ┗ 📂layout
 ┣ 📂constants
 ┣ 📂hooks
 ┣ 📂pages
 ┃ ┣ 📂book
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂bookerInfo
 ┃ ┃ ┃ ┣ 📂complete
 ┃ ┃ ┃ ┣ 📂count
 ┃ ┃ ┃ ┣ 📂easyPassEntry
 ┃ ┃ ┃ ┣ 📂freeBook
 ┃ ┃ ┃ ┣ 📂info
 ┃ ┃ ┃ ┣ 📂paidBook
 ┃ ┃ ┃ ┣ 📂select
 ┃ ┃ ┃ ┗ 📂termCheck
 ┃ ┃ ┣ 📂constants
 ┃ ┃ ┣ 📂typings
 ┃ ┃ ┣ 📂utils
 ┃ ┣ 📂gig
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂content
 ┃ ┃ ┃ ┣ 📂iconText
 ┃ ┃ ┃ ┣ 📂makerIntroduce
 ┃ ┃ ┃ ┣ 📂peopleCard
 ┃ ┃ ┃ ┣ 📂performanceIntroduce
 ┃ ┃ ┃ ┣ 📂showInfo
 ┃ ┃ ┃ ┣ 📂showType
 ┃ ┃ ┃ ┗ 📂tabBar
 ┃ ┃ ┣ 📂constants
 ┃ ┃ ┣ 📂utils
 ┃ ┣ 📂kakaoLogin
 ┃ ┣ 📂lookup
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂nonExistent
 ┃ ┃ ┣ 📂types
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂carousel
 ┃ ┃ ┃ ┣ 📂chips
 ┃ ┃ ┃ ┣ 📂floating
 ┃ ┃ ┃ ┣ 📂footer
 ┃ ┃ ┃ ┣ 📂mainNavigation
 ┃ ┃ ┃ ┗ 📂performance
 ┃ ┃ ┣ 📂constants
 ┃ ┣ 📂manage
 ┃ ┣ 📂modalTest
 ┃ ┣ 📂modifyManage
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┣ 📂constants
 ┃ ┃ ┣ 📂typings
 ┃ ┃ ┣ 📂utils
 ┃ ┣ 📂MyRegisterdShow
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┗ 📂registeredcard
 ┃ ┃ ┣ 📂constants
 ┃ ┣ 📂nonMbLookup
 ┃ ┃ ┣ 📂components
 ┃ ┣ 📂register
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┣ 📂constants
 ┃ ┃ ┣ 📂typings
 ┃ ┃ ┣ 📂utils
 ┃ ┣ 📂ticketholderlist
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂banner
 ┃ ┃ ┃ ┣ 📂managercard
 ┃ ┃ ┃ ┣ 📂narrowDropDown
 ┃ ┃ ┃ ┗ 📂selectIcon
 ┃ ┃ ┣ 📂constants
 ┣ 📂routes
 ┣ 📂stores
 ┣ 📂styles
 ┃ ┣ 📂fonts
 ┣ 📂typings
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📂schema
 ┣ 📂utils
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┣ 📜main.tsx
```

<h3>🎸 비트 아이엠 그라운드 룰</h3>

✅ 우울하지 말고 우웅하기 <br/>
✅ 서로 칭찬하고 굿 ~~ 해주기 <br/>
✅ 자기가 오늘 할일을 시작하기 전에 리뷰먼저! <br/>
✅ 화이팅하자 ㅋㅋ <br/>
