import Layout from "@components/commons/layout/Layout";
import Apage from "@pages/APage/Apage";
import Lookup from "@pages/Lookup";
import ModalTest from "@pages/ModalTest";
import TestPage from "@pages/test/TestPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "a", element: <Apage /> },
      { path: "lookup/:id", element: <Lookup /> },
      { path: "testpage", element: <TestPage /> },
      // ... other pages
    ],
  },
  {
    path: "/modal-test",
    element: <ModalTest />,
  },
  { path: "/testpage", element: <TestPage /> },
  //   ...
]);
export default router;
