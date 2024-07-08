import Apage from "@pages/APage/Apage";
import ModalTest from "@pages/ModalTest";
import MyRegisterdShow from "@pages/MyRegisterdShow/MyRegisterdShow";
import TestPage from "@pages/test/TestPage";
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
  { path: "/testpage", element: <TestPage /> },
  { path: "/myregisteredshow", element: <MyRegisterdShow /> },
  //   ...
]);
export default router;
