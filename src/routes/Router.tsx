import Layout from "@components/layout/Layout";
import ActionBottomSheetTest from "@pages/ActionBottomSheetTest";
import Apage from "@pages/APage/Apage";
import BankTest from "@pages/BankTest";
import Gig from "@pages/gig/Gig";
import Lookup from "@pages/lookup/Lookup";
import Manage from "@pages/manage/Manage";
import ModalTest from "@pages/ModalTest";
import MyRegisterdShow from "@pages/MyRegisterdShow/MyRegisterdShow";
import NonMbLookup from "@pages/nonMbLookup/NonMbLookup";
import Register from "@pages/register/Register";
import TestPage from "@pages/test/TestPage";
import ViewBottomSheetTest from "@pages/ViewBottomSheetTest";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "a", element: <Apage /> },
      { path: "lookup", element: <Lookup /> },
      { path: "testpage", element: <TestPage /> },
      { path: "register", element: <Register /> },
      { path: "gig/:performanceId", element: <Gig /> },
      { path: "manage", element: <Manage /> },
      { path: "myregisteredshow", element: <MyRegisterdShow /> },
      // ... other pages
    ],
  },
  {
    path: "/modal-test",
    element: <ModalTest />,
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
    path: "/NonMb-Lookup",
    element: <NonMbLookup />,
  },
  {
    path: "/bank-sheet",
    element: <BankTest />,
  },
  //   {
  //     path: "/C",
  //     element: <CPage />,
  //   },
  { path: "/testpage", element: <TestPage /> },
  { path: "/myregisteredshow", element: <MyRegisterdShow /> },
  //   ...
]);
export default router;
