import Apage from "@pages/APage/Apage";
import TestPage from "@pages/test/TestPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/a",
    element: <Apage />,
  },
  //   {
  //     path: "/B",
  //     element: <BPage />,
  //   },
  //   {
  //     path: "/C",
  //     element: <CPage />,
  //   },
  { path: "/testpage", element: <TestPage /> },
  //   ...
]);
export default router;
