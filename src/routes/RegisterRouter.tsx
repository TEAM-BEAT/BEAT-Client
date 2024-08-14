import Register from "@pages/register/Register";
import RegisterComplete from "@pages/register/RegisterComplete";

const REGISTER_ROUTES = [
  { path: "gig-register", element: <Register /> },
  { path: "register-complete", element: <RegisterComplete /> },
];

export default REGISTER_ROUTES;