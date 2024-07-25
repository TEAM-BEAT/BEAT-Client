import Book from "@pages/book/Book";
import Complete from "@pages/book/components/complete/Complete";
import Gig from "@pages/gig/Gig";

const GIG_ROUTES = [
  { path: "book/complete", element: <Complete /> },
  { path: "book/:performanceId", element: <Book /> },
  { path: "gig/:performanceId", element: <Gig /> },
];

export default GIG_ROUTES;