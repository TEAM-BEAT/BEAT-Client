import Promotion from "@admin/pages/promotion/Promotion";
import User from "@admin/pages/user/User";
import Gig from "@admin/pages/gig/Gig";
import Book from "@admin/pages/booking/Book";

const ADMIN_ROUTES = [
  {
    path: "promotion",
    element: <Promotion />,
  },
  {
    path: "user",
    element: <User />,
  },
  {
    path: "gig",
    element: <Gig />,
  },
  {
    path: "book",
    element: <Book />,
  },
];

export default ADMIN_ROUTES;
