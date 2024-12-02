import {
  useTicketDelete,
  useTicketRefund,
  useTicketRetrive,
  useTicketRetriveSearch,
  useTicketUpdate,
} from "@apis/domains/tickets/queries";
import Loading from "@components/commons/loading/Loading";
import MetaTag from "@components/commons/meta/MetaTag";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader, useModal } from "@hooks";
import useDebounce from "src/hooks/useDebounce";
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
import { IconCheck } from "@assets/svgs";
import Toast from "@components/commons/toast/Toast";
import { useToast } from "@hooks";
import NonExistent from "./components/nonExistent/NonExistent.";

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
  const [searchWord, setSearchWord] = useState("");

  const [openFilter, setOpenFilter] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const [CSVDataArr, setCSVDataArr] = useState<CSVDataType[]>([]);

  const { performanceId } = useParams();

  const { data, isLoading, refetch } = useTicketRetrive(
    { performanceId: Number(performanceId) },
    filterList
  );
  const { data: searchData, refetch: searchRefetch } = useTicketRetriveSearch(
    { performanceId: Number(performanceId) },
    searchWord,
    filterList
  );
  const { openConfirm, closeConfirm } = useModal();

  const [checkedBookingId, setCheckedBookingId] = useState<number[]>([]);
  const { showToast, isToastVisible } = useToast();
  // 체크된 리스트 확인
  const handleBookingIdCheck = (bookingId: number) => {
    setCheckedBookingId((prev) =>
      prev.includes(bookingId) ? prev.filter((id) => id !== bookingId) : [...prev, bookingId]
    );
  };

  const { mutate: updateMutate, isPending: updateIsPending } = useTicketUpdate();

  const handlePaymentFixAxiosFunc = () => {
    if (updateIsPending) {
      return;
    }
    // 예매 완료 PUT API 요청
    // paymentData에 accountHolder, accountNumber, bankName 제거
    const filteredPaymentData = paymentData.map(
      ({ bankName, accountNumber, accountHolder, ...rest }) => ({
        ...rest,
        bookingStatus: checkedBookingId.includes(rest.bookingId)
          ? "BOOKING_CONFIRMED"
          : rest.bookingStatus,
      })
    );

    updateMutate({
      performanceId: Number(performanceId),
      performanceTitle: data?.performanceTitle,
      totalScheduleCount: data?.totalScheduleCount,
      bookingList: filteredPaymentData,
    });
    closeConfirm();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handlePaymentFixBtn = () => {
    openConfirm({
      title: "입금 처리시 예매확정 문자가 발송돼요.",
      subTitle: "예매자에게 입금이 확인되었음을 알려드릴게요!",
      okText: "입금 처리하기",
      noText: "아니요",
      okCallback: () => {
        handlePaymentFixAxiosFunc();
      },
      noCallback: closeConfirm,
    });
  };

  // 환불 요청
  const { mutate: refundMutate, isPending: refundIsPending } = useTicketRefund();

  const handlePaymentRefundBtn = () => {
    openConfirm({
      title: "환불 처리 하시겠어요?",
      subTitle: "예매자에게 환불 금액을 보낸 뒤 처리해 주세요.",
      okText: "환불 처리하기",
      noText: "아니요",
      okCallback: () => {
        handlePaymentRefundAxiosFunc();
      },
      noCallback: closeConfirm,
    });
  };

  const handlePaymentRefundAxiosFunc = () => {
    if (refundIsPending) {
      return;
    }
    // 환불 요청 PUT API 요청
    // bookingId만 전달
    const filteredPaymentData = paymentData.map(({ bookingId }) => ({
      bookingId: checkedBookingId.includes(bookingId) && bookingId,
    }));

    refundMutate({
      performanceId: Number(performanceId),
      bookingList: filteredPaymentData,
    });
    closeConfirm();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // 취소 요청
  const { mutate: deleteMutate, isPending: deleteIsPending } = useTicketDelete();

  const handlePaymentDeleteBtn = () => {
    openConfirm({
      title: "예매자를 삭제하시겠어요?",
      subTitle: "한 번 삭제한 예매자 정보는 다시 복구할 수 없어요.",
      okText: "삭제하기",
      noText: "아니요",
      okCallback: () => {
        handlePaymentDeleteAxiosFunc();
      },
      noCallback: closeConfirm,
    });
  };

  const handlePaymentDeleteAxiosFunc = () => {
    if (deleteIsPending) {
      return;
    }
    // 취소 요청 PUT API 요청
    // bookingId만 전달
    const filteredPaymentData = paymentData.map(({ bookingId }) => ({
      bookingId: checkedBookingId.includes(bookingId) && bookingId,
    }));

    deleteMutate({
      performanceId: Number(performanceId),
      bookingList: filteredPaymentData,
    });
    closeConfirm();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const actions = {
    PAYMENT: {
      text: "입금 처리하기",
      action: () => {
        handlePaymentFixBtn();
      },
    },
    REFUND: {
      text: "환불 처리하기",
      action: () => {
        handlePaymentRefundBtn();
      },
    },
    DELETE: {
      text: "예매자 삭제하기",
      action: () => {
        handlePaymentDeleteBtn();
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

  const debouncedQuery = useDebounce(searchWord, 500);

  const handleInputChange = (event) => {
    setSearchWord(event.target.value);
  };

  // 필터 변경될 때마다 GET API 요청
  // 검색될 때마다 GET API 요청
  useEffect(() => {
    const fetchData = async () => {
      const refetchData = await refetch();
      setPaymentData(refetchData?.data?.bookingList ?? []);
    };

    const fetchSearchData = async () => {
      const refetchSearchData = await searchRefetch();
      setPaymentData(refetchSearchData?.data?.bookingList ?? []);
    };

    // TODO : 서버에서 검색어 2글자 이상으로 넘겨줬는데, 기-디에 화면에 어떻게 표현할지 물어보기
    searchWord.length >= 2 ? fetchSearchData() : fetchData();
  }, [filterList, status, debouncedQuery]);

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

  const handleCopyClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);

    showToast();
  };

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
              <SearchBar
                handleFilterSheet={handleFilterSheet}
                handleInputChange={handleInputChange}
                searchWord={searchWord}
                status={status}
              />
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
            {paymentData?.length ? (
              <S.ManageCardList>
                {paymentData?.map((item) => {
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
                          handleCopyClipBoard={handleCopyClipBoard}
                        />
                      )}
                    </ManageCard>
                  );
                })}
              </S.ManageCardList>
            ) : (
              <NonExistent status={status} />
            )}

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
              totalScheduleCount={data?.totalScheduleCount}
              onClickOutside={handleFilterSheet}
              filterList={filterList}
              handleFilter={(scheduleNumber, bookingStatus) =>
                handleFilter(scheduleNumber, bookingStatus)
              }
            />
            <Toast icon={<IconCheck />} isVisible={isToastVisible} toastBottom={30}>
              클립보드에 복사되었습니다!
            </Toast>
          </S.TicketHolderListWrpper>
        </>
      )}
    </>
  );
};

export default TicketHolderList;
