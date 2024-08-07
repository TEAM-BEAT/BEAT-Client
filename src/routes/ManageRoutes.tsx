import ModifyManage from "@pages/modifyManage/ModifyManage";
import MyRegisterdShow from "@pages/myRegisterdShow/MyRegisterdShow";
import TicketHolderList from "@pages/ticketholderlist/TicketHolderList";

const MANAGE_ROUTES = [
  { path: "gig-manage", element: <MyRegisterdShow /> },
  { path: "guest-manage/:performanceId", element: <TicketHolderList /> },
  { path: "gig-modify-manage/:performanceId", element: <ModifyManage /> },
];

export default MANAGE_ROUTES;
