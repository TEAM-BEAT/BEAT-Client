import Layout from "@components/layout/Layout";
import TokenRefresher from "@hooks/useTokenRefresher";
import ActionBottomSheetTest from "@pages/ActionBottomSheetTest";
import Book from "@pages/book/Book";
import Complete from "@pages/book/components/complete/Complete";
import Gig from "@pages/gig/Gig";
import KakaoAuth from "@pages/kakaoAuth/KakaoAuth";
import KakaoLoginTest from "@pages/KakaoLoginTest";
import Lookup from "@pages/lookup/Lookup";
import Main from "@pages/main/Main";
import Manage from "@pages/manage/Manage";
import ModalTest from "@pages/modalTest/ModalTest";
import ModifyManage from "@pages/modifyManage/ModifyManage";
import MyRegisterdShow from "@pages/myRegisterdShow/MyRegisterdShow";
import NonMbLookup from "@pages/nonMbLookup/NonMbLookup";
import Register from "@pages/register/Register";
import RegisterComplete from "@pages/register/RegisterComplete";
import TestPage from "@pages/test/TestPage";
import TicketHolderList from "@pages/ticketholderlist/TicketHolderList";
import ViewBottomSheetTest from "@pages/ViewBottomSheetTest";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Navigate to="/main" replace /> },
      { path: "nonmb-lookup", element: <NonMbLookup /> },
      { path: "lookup", element: <Lookup /> },
      { path: "book/complete", element: <Complete /> },
      { path: "book/:performanceId", element: <Book /> },
      { path: "gig-register", element: <Register /> },
      { path: "register-complete", element: <RegisterComplete /> },
      { path: "gig/:performanceId", element: <Gig /> },
      { path: "manage", element: <Manage /> },
      { path: "gig-manage", element: <MyRegisterdShow /> },
      { path: "guest-manage/:performanceId", element: <TicketHolderList /> },
      { path: "gig-modify-manage/:performanceId", element: <ModifyManage /> },
    ],
  },
  {
    path: "/modal-test",
    element: <ModalTest />,
  },
  {
    path: "/kakao-login",
    element: <KakaoLoginTest />,
  },
  {
    path: "/auth",
    element: <KakaoAuth />,
  },
  {
    path: "/action-bottom-sheet",
    element: <ActionBottomSheetTest />,
  },
  {
    path: "/view-bottom-sheet",
    element: <ViewBottomSheetTest />,
  },

  {
    path: "/testpage",
    element: (
      <>
        <TokenRefresher />
        <TestPage />
      </>
    ),
  },
  { path: "/myregisteredshow", element: <MyRegisterdShow /> },
  {
    path: "/main",
    element: (
      <>
        <TokenRefresher />
        <Main />
      </>
    ),
  },

  { path: "/myregisteredshow", element: <MyRegisterdShow /> },
  //   ...
]);
export default router;
