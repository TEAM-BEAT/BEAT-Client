import Layout from "@components/commons/layout/Layout";
import Apage from "@pages/APage/Apage";
import TestPage from "@pages/test/TestPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "a", element: <Apage /> },
      { path: "testpage", element: <TestPage /> },
      // ... other pages
    ],
  },
]);
export default router;
