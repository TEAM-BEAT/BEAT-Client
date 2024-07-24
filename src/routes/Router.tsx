import Layout from "@components/layout/Layout";
import TokenRefresher from "@hooks/useTokenRefresher";
import KakaoAuth from "@pages/kakaoAuth/KakaoAuth";
import Main from "@pages/main/Main";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { GIG_ROUTES } from "./GigRoutes";
import { LOOKUP_ROUTES } from "./LookupRoutes";
import { MANAGE_ROUTES } from "./ManageRoutes";
import { REGISTER_ROUTES } from "./RegisterRouter";
import { TEST_ROUTES } from "./testRoutes";

const router = createBrowserRouter([
  {
    path: "/main",
    element: (
      <>
        <TokenRefresher />
        <Main />
      </>
    ),
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Navigate to="/main" replace /> },
      ...GIG_ROUTES,
      ...LOOKUP_ROUTES,
      ...MANAGE_ROUTES,
      ...REGISTER_ROUTES,
    ],
  },
  {
    path: "/auth",
    element: <KakaoAuth />,
  },
  ...TEST_ROUTES,
]);
export default router;
