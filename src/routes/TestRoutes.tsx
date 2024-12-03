import ActionBottomSheetTest from "@pages/test/ActionBottomSheetTest";
import KakaoLoginTest from "@pages/test/KakaoLoginTest";
import KakaoMap from "@pages/test/KakaoMap";
import ModalTest from "@pages/test/modalTest/ModalTest";
import ViewBottomSheetTest from "@pages/test/ViewBottomSheetTest";

const TEST_ROUTES = [
  {
    path: "/test",
    children: [
      {
        path: "modal-test",
        element: <ModalTest />,
      },
      {
        path: "kakao-login",
        element: <KakaoLoginTest />,
      },
      {
        path: "action-bottom-sheet",
        element: <ActionBottomSheetTest />,
      },
      {
        path: "view-bottom-sheet",
        element: <ViewBottomSheetTest />,
      },
      {
        path: "kakaomap",
        element: <KakaoMap />,
      },
    ],
  },
];

export default TEST_ROUTES;
