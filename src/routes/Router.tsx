import Layout from "@components/layout/Layout";
import KakaoAuth from "@pages/kakaoAuth/KakaoAuth";
import Main from "@pages/main/Main";
import NotFound from "@pages/notFound/NotFound";
import OnBoarding from "@pages/onBoarding/OnBoarding";
import { GIG_ROUTES, LOOKUP_ROUTES, MANAGE_ROUTES, REGISTER_ROUTES, TEST_ROUTES } from "@routes";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/main",
    element: (
      <>
        {/* <TokenRefresher /> */}
        <Main />
      </>
    ),
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <OnBoarding /> },
      ...GIG_ROUTES,
      ...LOOKUP_ROUTES,
      ...MANAGE_ROUTES,
      ...REGISTER_ROUTES,
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/auth",
    element: <KakaoAuth />,
  },
  ...TEST_ROUTES,
]);

export default router;
