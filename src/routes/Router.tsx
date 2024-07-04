import Apage from "@pages/APage/Apage";
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
  //   ...
]);
export default router;
