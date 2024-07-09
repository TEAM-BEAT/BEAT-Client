import Layout from "@components/layout/Layout";
import Apage from "@pages/APage/Apage";
import Book from "@pages/book/Book";
import Lookup from "@pages/lookup/Lookup";
import Manage from "@pages/manage/Manage";
import ModalTest from "@pages/ModalTest";
import Register from "@pages/register/Register";
import TestPage from "@pages/test/TestPage";
import ActionBottomSheetTest from "@pages/ActionBottomSheetTest";
import ViewBottomSheetTest from "@pages/ViewBottomSheetTest";
import NonMbLookup from "@pages/NonMbLookup/NonMbLookup";
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
      { path: "book", element: <Book /> },
      { path: "manage", element: <Manage /> },
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
  //   {
  //     path: "/C",
  //     element: <CPage />,
  //   },
  { path: "/testpage", element: <TestPage /> },
  //   ...
]);
export default router;
