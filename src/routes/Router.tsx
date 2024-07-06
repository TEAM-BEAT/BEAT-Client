import Apage from "@pages/APage/Apage";
import ModalTest from "@pages/ModalTest";
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
  //   ...
]);
export default router;
