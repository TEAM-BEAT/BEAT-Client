import Layout from "@components/layout/Layout";
import ActionBottomSheetTest from "@pages/ActionBottomSheetTest";
import Apage from "@pages/APage/Apage";
import Book from "@pages/book/Book";
import Complete from "@pages/book/components/complete/Complete";
import Gig from "@pages/gig/Gig";
import KakaoLogin from "@pages/kakaoLogin/KakaoLogin";
import KakaoLoginTest from "@pages/KakaoLoginTest";
import Lookup from "@pages/lookup/Lookup";
import Main from "@pages/main/Main";
import Manage from "@pages/manage/Manage";
import ModalTest from "@pages/modalTest/ModalTest";
import MyRegisterdShow from "@pages/MyRegisterdShow/MyRegisterdShow";
import NonMbLookup from "@pages/nonMbLookup/NonMbLookup";
import Register from "@pages/register/Register";
import RegisterComplete from "@pages/register/RegisterComplete";
import TestPage from "@pages/test/TestPage";
import TicketHolderList from "@pages/ticketholderlist/TicketHolderList";
import ViewBottomSheetTest from "@pages/ViewBottomSheetTest";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "a", element: <Apage /> },
      { path: "NonMb-Lookup", element: <NonMbLookup /> },
      { path: "lookup", element: <Lookup /> },
      { path: "book/complete", element: <Complete /> },
      { path: "book/:performanceId", element: <Book /> },
      { path: "testpage", element: <TestPage /> },
      { path: "gig-register", element: <Register /> },
      { path: "register-complete", element: <RegisterComplete /> },
      { path: "gig/:performanceId", element: <Gig /> },
      { path: "manage", element: <Manage /> },
      { path: "gig-manage", element: <MyRegisterdShow /> },
      { path: "guest-manage", element: <TicketHolderList /> },

      // ... other pages
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
    element: <KakaoLogin />,
  },
  {
    path: "/action-bottom-sheet",
    element: <ActionBottomSheetTest />,
  },
  {
    path: "/view-bottom-sheet",
    element: <ViewBottomSheetTest />,
  },

  //   {
  //     path: "/C",
  //     element: <CPage />,
  //   },
  { path: "/testpage", element: <TestPage /> },
  { path: "/myregisteredshow", element: <MyRegisterdShow /> },
  { path: "/main", element: <Main /> },

  { path: "/myregisteredshow", element: <MyRegisterdShow /> },
  //   ...
]);
export default router;
