import Apage from "@pages/APage/Apage";
import ModalTest from "@pages/ModalTest";
import TestPage from "@pages/test/TestPage";
import ActionBottomSheetTest from "@pages/ActionBottomSheetTest";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/a",
    element: <Apage />,
  },
  {
    path: "/modal-test",
    element: <ModalTest />,
  },
  //   {
  //     path: "/C",
  //     element: <CPage />,
  //   },
  { path: "/testpage", element: <ActionBottomSheetTest /> },
  //   ...
]);
export default router;
