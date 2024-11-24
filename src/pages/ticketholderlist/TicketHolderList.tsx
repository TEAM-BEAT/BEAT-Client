import { useTicketPatch, useTicketRetrive, useTicketUpdate } from "@apis/domains/tickets/queries";
import Loading from "@components/commons/loading/Loading";
import MetaTag from "@components/commons/meta/MetaTag";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader, useModal, useToast } from "@hooks";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useNavigate, useParams } from "react-router-dom";
import { convertingNumber } from "@constants/convertingNumber";
import * as S from "./TicketHolderList.styled";
import { BottomSheet, Button, Spacing } from "@components/commons";
import Title from "@pages/ticketholderlist/components/title/Title";
import SearchBar from "./components/searchBar/SearchBar";
import MenuBottomsheet from "./components/MenuBottomSheet/MenuBottomsheet";
import FilterBottomSheet from "./components/FilterBottomSheet/FilterBottomSheet";
import { BookingListProps } from "./types/BookingListType";

const data = {
  performanceTitle: "비트밴드 정기공연",
  performanceTeamName: "비트밴드",
  isBooking: true,
  totalScheduleCount: 2,
  totalPerformanceTicketCount: 100,
  totalPerformanceSoldTicketCount: 50,
  bookingList: [
    {
      bookingId: 1,
      bookerName: "황혜린",
      bookerPhoneNumber: "010-1234-5678",
      scheduleId: 2,
      purchaseTicketCount: 3,
      createdAt: "2024-07-07T12:34:56.789Z",
      bookingStatus: "REFUND_REQUIRED",
      scheduleNumber: "SECOND",
      bankName: "NH_NONGHYUP",
      accountNumber: "123-12-1234-123",
      accountHolder: "전희주",
    },
    {
      bookingId: 2,
      bookerName: "이동훈",
      bookerPhoneNumber: "010-1234-0000",
      scheduleId: 1,
      purchaseTicketCount: 2,
      createdAt: "2024-07-08T12:34:56.789Z",
      bookingStatus: "BOOKING_CONFIRMED",
      scheduleNumber: "FIRST",
      // 예매 확정된 상태이므로 환불계좌 정보 없음
      bankName: "",
      accountNumber: "",
      accountHolder: "",
    },
  ],
};

type PaymentType =
  | "CHECKING_PAYMENT"
  | "BOOKING_CONFIRMED"
  | "BOOKING_CANCELLED"
  | "REFUND_REQUIRED";

interface CSVDataType {
  createdAt: string;
  scheduleNumber: string;
  bookerName: string;
  purchaseTicketCount: string;
  bookerPhoneNumber: string;
  bookingStatus: string;
}

// 관리자 페이지에서만 사용해서 공통 type으로 안 뺌
// TODO : TicketHolderList 내 type으로 빼기
const convertingBookingStatus = (_bookingStatus: PaymentType): string => {
  switch (_bookingStatus) {
    case "CHECKING_PAYMENT":
      return "미입금";
    case "BOOKING_CONFIRMED":
      return "입금 완료";
    case "BOOKING_CANCELLED":
      return "취소 완료";
    case "REFUND_REQUIRED":
      return "환불 요청";
    default:
      throw new Error("알 수 없는 상태입니다.");
  }
};

const headers = [
  { label: "예매일시", key: "createdAt" },
  { label: "회차", key: "scheduleNumber" },
  { label: "예매자 이름", key: "bookerName" },
  { label: "매수", key: "purchaseTicketCount" },
  { label: "연락처", key: "bookerPhoneNumber" },
  { label: "예매상태", key: "bookingStatus" },
];

const TicketHolderList = () => {
  const [paymentData, setPaymentData] = useState<BookingListProps[]>();

  // DEFAULT, PAYMENT, REFUND, DELETE
  const [status, setStatus] = useState("DEFAULT");
  const [buttonText, setButtonText] = useState("예매자 관리하기");

  const [openFilter, setOpenFilter] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const [CSVDataArr, setCSVDataArr] = useState<CSVDataType[]>([]);

  const { performanceId } = useParams();

  // const { data, isLoading, refetch } = useTicketRetrive({ performanceId: Number(performanceId) });
  const { isLoading, refetch } = useTicketRetrive({ performanceId: Number(performanceId) });

  const actions = {
    PAYMENT: {
      text: "입금 처리하기",
      // TODO : 예매 확정 팝업
      action: console.log("입금 처리"),
    },
    REFUND: {
      text: "환불 처리하기",
      // TODO : 환불 처리 팝업
      action: () => console.log("환불"),
    },
    DELETE: {
      text: "예매자 삭제하기",
      // TODO : 예매자 삭제 팝업
      action: () => console.log("예매자 삭제"),
    },
    DEFAULT: {
      text: "예매자 관리하기",
      action: () => setOpenMenu(true),
    },
  };

  // 상태 변경 시 버튼 텍스트 설정
  useEffect(() => {
    setButtonText(actions[status]?.text || "예매자 관리하기");
  }, [status]);

  const handleButtonClick = () => {
    actions[status]?.action?.();
  };

  const handleStatus = (status: string) => {
    setStatus(status);
    setOpenMenu(false);
  };

  // 바텀시트 닫기
  const closeBottomSheet = () => {
    setOpenMenu(false);
    setOpenFilter(false);
  };

  // 필터 바텀시트
  const handleFilter = () => {
    if (!openFilter) {
      setOpenFilter(true);
    } else {
      setOpenFilter(false);
    }
  };

  useEffect(() => {
    setPaymentData(data?.bookingList ?? []);

    if (data?.bookingList) {
      //전체 데이터를 기반으로 csv 추출 데이터 구축
      const tempCSVDataArr: CSVDataType[] = [];

      data.bookingList.map((item) => {
        const date = item.createdAt.split("T")[0];
        const time = item.createdAt.split("T")[1].slice(0, 5);
        const formattedDate = date?.replace(/-/g, ".");
        const formattedCreateTime = `${formattedDate} ${time}`;

        tempCSVDataArr.push({
          createdAt: formattedCreateTime,
          scheduleNumber: `${convertingNumber(item.scheduleNumber)}회차`,
          bookerName: item.bookerName,
          purchaseTicketCount: `${item.purchaseTicketCount}매`,
          bookerPhoneNumber: item.bookerPhoneNumber,
          bookingStatus: convertingBookingStatus(item.bookingStatus as PaymentType),
        });
      });

      tempCSVDataArr.sort(
        (obj1, obj2) => new Date(obj1.createdAt).getTime() - new Date(obj2.createdAt).getTime()
      );
      setCSVDataArr(tempCSVDataArr);
    }
  }, [data]);

  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate("/gig-manage");
  };

  const { setHeader } = useHeader();
  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE_SUB_TEXT,
      title: "예매자 관리",
      // TODO : 공통컴포넌트에 svg 들어갈 수 있도록 수정하기
      subText: "CSV",
      leftOnClick: handleNavigateBack,
      // TODO : rightOnClick CSV 다운로드로 변경
      // rightOnClick: ,
    });
  }, [setHeader]);

  return (
    <>
      <MetaTag title="예매자 확인 및 상태변경" />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <S.TicketHolderListWrpper>
            <Title
              title={data?.performanceTitle}
              teamName={data?.performanceTeamName}
              totalSolidCount={data?.totalPerformanceSoldTicketCount}
              totalCount={data?.totalPerformanceTicketCount}
            />
            <Spacing marginBottom={"2.6"} />
            <SearchBar handleFilter={handleFilter} status={status} />
            <Spacing marginBottom={"1.6"} />
            <S.FooterButtonWrapper>
              <Button onClick={handleButtonClick}>{buttonText}</Button>
            </S.FooterButtonWrapper>
            <MenuBottomsheet
              isOpen={openMenu}
              onClickOutside={closeBottomSheet}
              handleStatus={handleStatus}
            />
            <FilterBottomSheet isOpen={openFilter} onClickOutside={handleFilter} />
          </S.TicketHolderListWrpper>
        </>
      )}
    </>
  );
};

export default TicketHolderList;
