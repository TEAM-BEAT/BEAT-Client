//그런데 여기에도 prop을 붙이나요? 엄밀히 말하면 prop은 아니지 않나?
interface BookingListObjProps {
  bookingId: number;
}

export interface PatchFormDataProps {
  performanceId: number;
  bookingList: number[];
}
