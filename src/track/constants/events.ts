export const TRACK_EVENTS = {
  // 페이지 뷰
  PAGE_VIEW: "Page_Viewed",
  VIEWED_PAGE_MAIN: "Viewed_Page_Main", // 유저가 메인페이지에 최초 진입 / 리프레시했음
  VIEWED_PAGE_GIG: "Viewed_Page_Gig", // 유저가 공연 상세페이지에 최초 진입 / 리프레시했음
  VIEWED_PAGE_BOOK: "Viewed_Page_Book", // 유저가 예매 페이지에 최초 진입 / 리프레시했음
  VIEWED_PAGE_GIGREGISTER: "Viewed_Page_GigRegister", // 유저가 공연 등록 페이지에 최초 진입 / 리프레시했음
  VIEWED_PAGE_BOOKCOMPLETE: "Viewed_Page_BookComplete", // 예매가 정상적으로 마무리되어 유저가 예매완료 페이지로 진입함
  VIEWED_OVERLAY_LOGIN: "Viewed_Overlay_Login", // 로그인 바텀시트가 화면에 보임
  VIEWED_OVERLAY_BOOKCONFIRM: "Viewed_Overlay_BookConfirm", // 예매내역 바텀시트가 화면에 보임

  // 클릭 이벤트
  CLICKED_CTA_BOOK: "Clicked_CTA_Book", // /gig에서 ‘예매하기’ 버튼을 클릭함
  CLICKED_CTA_LOGIN: "Clicked_CTA_Login", // 로그인 바텀시트 내 ‘카카오 로그인’ 또는 ‘비회원’ 버튼 클릭
  CLICKED_BUTTON_BOOK: "Clicked_Button_Book", // /book에서 ‘예매하기’ 버튼을 클릭함
  CLICKED_BUTTON_BOOKCONFIRM: "Clicked_Button_BookConfirm", // 예매내역 바텀시트 내 ‘예매할게요’ 버튼 클릭
  CLICKED_BUTTON_BOOKCANCEL: "Clicked_Button_BookCancel", // 예매내역 바텀시트 내 ‘다시 할게요’ 버튼 클릭
  CLICKED_FLOATING_GIGREGISTER: "Clicked_Floating_GigRegister", // 유저가 메인 페이지의 '공연등록' 플로팅 버튼을 클릭함
  CLICKED_BANNER_GIGREGISTER: "Clicked_Banner_GigRegister", // 유저가 메인 페이지의 '우리의 공연 등록하러 가기' 배너 버튼을 클릭함
} as const;

export type TrackEventKey = keyof typeof TRACK_EVENTS;
