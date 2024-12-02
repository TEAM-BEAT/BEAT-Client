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
import { BookingListProps } from "@pages/ticketholderlist/types/bookingListType";
import { ManageCard } from "./components/manageCard";
import { getBankNameKr } from "@utils/getBankName";
import SelectedChips from "./components/selectedChips/SelectedChips";
import { convertingBookingStatus } from "@constants/convertingBookingStatus";

export type PaymentType =
  | "CHECKING_PAYMENT"
  | "BOOKING_CONFIRMED"
  | "BOOKING_CANCELLED"
  | "REFUND_REQUESTED";

interface CSVDataType {
  createdAt: string;
  scheduleNumber: string;
  bookerName: string;
  purchaseTicketCount: string;
  bookerPhoneNumber: string;
  bookingStatus: string;
}

export interface FilterListType {
  scheduleNumber: number[];
  bookingStatus: string[];
}

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

  const [filterList, setFilterList] = useState<FilterListType>({
    scheduleNumber: [],
    bookingStatus: [],
  });

  const [openFilter, setOpenFilter] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const [CSVDataArr, setCSVDataArr] = useState<CSVDataType[]>([]);

  const { performanceId } = useParams();

  const { data, isLoading, refetch } = useTicketRetrive(
    { performanceId: Number(performanceId) },
    filterList
  );

  // 체크된 리스트 확인
  const [checkedBookingId, setCheckedBookingId] = useState<number[]>([]);

  const handleBookingIdCheck = (bookingId: number) => {
    setCheckedBookingId((prev) =>
      prev.includes(bookingId) ? prev.filter((id) => id !== bookingId) : [...prev, bookingId]
    );
  };

  const actions = {
    PAYMENT: {
      text: "입금 처리하기",
      // TODO : 예매 확정 팝업
      action: () => {
        setStatus("DEFAULT"), setFilterList({ scheduleNumber: [], bookingStatus: [] });
      },
    },
    REFUND: {
      text: "환불 처리하기",
      // TODO : 환불 처리 팝업
      action: () => {
        setStatus("DEFAULT"), setFilterList({ scheduleNumber: [], bookingStatus: [] });
      },
    },
    DELETE: {
      text: "예매자 삭제하기",
      // TODO : 예매자 삭제 팝업
      action: () => {
        setStatus("DEFAULT"), setFilterList({ scheduleNumber: [], bookingStatus: [] });
      },
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
    switch (status) {
      case "PAYMENT":
        setFilterList({
          scheduleNumber: [],
          bookingStatus: ["CHECKING_PAYMENT"],
        });
        break;
      case "REFUND":
        setFilterList({
          scheduleNumber: [],
          bookingStatus: ["REFUND_REQUESTED"],
        });
        break;
      case "DELETE":
        setFilterList({
          scheduleNumber: [],
          bookingStatus: ["CHECKING_PAYMENT", "BOOKING_CONFIRMED", "REFUND_REQUESTED"],
        });
        break;
      default:
        setFilterList({
          scheduleNumber: [],
          bookingStatus: [],
        });
        break;
    }
  };

  // 바텀시트 닫기
  const closeBottomSheet = () => {
    setOpenMenu(false);
    setOpenFilter(false);
  };

  // 필터 바텀시트
  const handleFilterSheet = () => {
    if (!openFilter) {
      setOpenFilter(true);
    } else {
      setOpenFilter(false);
    }
  };

  const handleFilter = async (scheduleNumber: number[], bookingStatus: string[]) => {
    setFilterList({
      scheduleNumber,
      bookingStatus,
    });
  };

  // 필터 변경될 때마다 GET API 요청
  useEffect(() => {
    const fetchData = async () => {
      const refetchData = await refetch();
      setPaymentData(refetchData?.data?.bookingList ?? []);
    };

    fetchData();
  }, [filterList, status]);

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
  }, [data, paymentData]);

  const navigate = useNavigate();

  const handleNavigateBack = () => {
    if (status === "DEFAULT") {
      navigate("/gig-manage");
    } else {
      setStatus("DEFAULT");
    }
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
      // rightOnClick:,
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
            <S.TitleSticky>
              <Title
                title={data?.performanceTitle}
                teamName={data?.performanceTeamName}
                totalSolidCount={data?.totalPerformanceSoldTicketCount}
                totalCount={data?.totalPerformanceTicketCount}
              />
              <Spacing marginBottom={"2.6"} />
              <SearchBar handleFilterSheet={handleFilterSheet} status={status} />
              {status === "DEFAULT" && (
                <SelectedChips
                  filterList={filterList}
                  handleFilter={(scheduleNumber, bookingStatus) =>
                    handleFilter(scheduleNumber, bookingStatus)
                  }
                />
              )}

              <Spacing marginBottom={"1.6"} />
            </S.TitleSticky>

            <S.ManageCardList>
              {paymentData.map((item) => {
                const date = item.createdAt.split("T")[0];
                const formattedDate = `${date.replace(/-/g, ". ")}`;
                const bookingStatus = convertingBookingStatus(item.bookingStatus as PaymentType);

                return (
                  <ManageCard key={item.bookingId}>
                    <S.ManageCardContainer>
                      {status !== "DEFAULT" && (
                        <ManageCard.ManageCheckBox
                          bookingId={item.bookingId}
                          checkedBookingId={checkedBookingId}
                          handleBookingIdCheck={handleBookingIdCheck}
                        />
                      )}
                      <ManageCard.ManageCardContainer
                        name={item.bookerName}
                        phoneNumber={item.bookerPhoneNumber}
                        ticketCount={item.purchaseTicketCount}
                        scheduleNumber={convertingNumber(item.scheduleNumber)}
                        date={formattedDate}
                        status={bookingStatus}
                      />
                    </S.ManageCardContainer>
                    {status === "REFUND" && (
                      <ManageCard.ManageAccount
                        bankName={getBankNameKr(item.bankName)}
                        accountNumber={item.accountNumber}
                        accountHolder={item.accountHolder}
                      />
                    )}
                  </ManageCard>
                );
              })}
            </S.ManageCardList>

            <S.FooterButtonWrapper>
              <Button onClick={handleButtonClick}>{buttonText}</Button>
            </S.FooterButtonWrapper>
            <MenuBottomsheet
              isOpen={openMenu}
              onClickOutside={closeBottomSheet}
              handleStatus={handleStatus}
            />
            <FilterBottomSheet
              isOpen={openFilter}
              totalScheduleCount={data.totalScheduleCount}
              onClickOutside={handleFilterSheet}
              filterList={filterList}
              handleFilter={(scheduleNumber, bookingStatus) =>
                handleFilter(scheduleNumber, bookingStatus)
              }
            />
          </S.TicketHolderListWrpper>
        </>
      )}
    </>
  );
};

export default TicketHolderList;
