import {
  useTicketDelete,
  useTicketRefund,
  useTicketRetrive,
  useTicketRetriveSearch,
  useTicketUpdate,
} from "@apis/domains/tickets/queries";
import { useGetPerformanceDetail } from "@apis/domains/performances/queries";
import Loading from "@components/commons/loading/Loading";
import MetaTag from "@components/commons/meta/MetaTag";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader, useModal } from "@hooks";
import useDebounce from "src/hooks/useDebounce";
import { useEffect, useState, ChangeEvent, useRef } from "react";
import { CSVLink } from "react-csv";
import { useNavigate, useParams } from "react-router-dom";
import { convertingNumber } from "@constants/convertingNumber";
import * as S from "./TicketHolderList.styled";
import { Button, Spacing } from "@components/commons";
import Title from "@pages/ticketholderlist/components/title/Title";
import SearchBar from "./components/searchBar/SearchBar";
import MenuBottomsheet from "./components/MenuBottomSheet/MenuBottomsheet";
import FilterBottomSheet from "./components/FilterBottomSheet/FilterBottomSheet";
import { BookingListProps } from "@pages/ticketholderlist/types/bookingListType";
import { ManageCard } from "./components/manageCard";
import { getBankNameKr } from "@utils/getBankName";
import SelectedChips from "./components/selectedChips/SelectedChips";
import { convertingBookingStatus } from "@constants/convertingBookingStatus";
import { IconCheck, IconXButton } from "@assets/svgs";
import Toast from "@components/commons/toast/Toast";
import NonExistent from "./components/nonExistent/NonExistent.";
import { getUA, isChrome } from "react-device-detect";
import { useToastHandler } from "@hooks";

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

interface ToastConfigProps {
  message: string;
  isTop: boolean;
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
  const { toastConfig, isToastVisible, handleToastVisible } = useToastHandler();
  const [allBookings, setAllBookings] = useState<BookingListProps[]>([]); // 전체 예매자 정보 (필터 적용 안 된)

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

  const csvLinkRef = useRef(null);

  const { performanceId } = useParams();

  const { data: performanceDetail } = useGetPerformanceDetail(Number(performanceId));
  const isFreePerformance = performanceDetail?.ticketPrice === 0;

  const { data, isLoading } = useTicketRetrive(
    { performanceId: Number(performanceId) },
    filterList
  );

  const debouncedQuery = useDebounce(searchWord, 500);

  const { data: searchData } = useTicketRetriveSearch(
    { performanceId: Number(performanceId) },
    debouncedQuery,
    filterList
  );

  const retrievedPaymentData =
    debouncedQuery.length >= 2 ? (searchData?.bookingList ?? []) : (data?.bookingList ?? []);
  const paymentData =
    status === "DELETE"
      ? retrievedPaymentData.filter(({ deletable }) => deletable)
      : retrievedPaymentData;

  const { openConfirm, closeConfirm } = useModal();
  const [checkedBookingId, setCheckedBookingId] = useState<number[]>([]);
  // 체크된 리스트 확인ㄹ
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
        bookingId: Number(rest.bookingId),
        bookingStatus: checkedBookingId.includes(rest.bookingId)
          ? "BOOKING_CONFIRMED"
          : rest.bookingStatus,
      })
    );

    updateMutate(
      {
        performanceId: Number(performanceId),
        performanceTitle: data?.performanceTitle,
        totalScheduleCount: data?.totalScheduleCount,
        bookingList: filteredPaymentData,
      },
      {
        onSuccess: () => {
          closeConfirm();
          setCheckedBookingId([]);
          setStatus("DEFAULT");
          setFilterList({
            scheduleNumber: [],
            bookingStatus: [],
          });
          handleToastVisible("입금 처리되었습니다.", "top");
        },
        onError: () => {
          handleToastVisible("입금 처리에 실패했습니다. 다시 시도해 주세요.", "top", "error");
        },
      }
    );
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
  const { mutateAsync: refundMutate, isPending: refundIsPending } = useTicketRefund();

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

  const handlePaymentRefundAxiosFunc = async () => {
    if (refundIsPending) {
      return;
    }
    // 환불 요청 PUT API 요청
    // bookingId만 전달

    const filteredPaymentData = paymentData
      .filter(({ bookingId }) => checkedBookingId.includes(bookingId))
      .map(({ bookingId }) => ({ bookingId }));

    await refundMutate({
      performanceId: Number(performanceId),
      bookingList: filteredPaymentData,
    });

    closeConfirm();
    setCheckedBookingId([]);
    setStatus("DEFAULT");
    setFilterList({
      scheduleNumber: [],
      bookingStatus: [],
    });
    handleToastVisible("환불 처리되었습니다.", "top");
  };

  // 취소 요청
  const { mutateAsync: deleteMutate, isPending: deleteIsPending } = useTicketDelete();

  const getDeleteModalSubTitle = (selectedItems: typeof paymentData) => {
    const ACTIVE_STATUSES = new Set([
      "CHECKING_PAYMENT",
      "BOOKING_CONFIRMED",
      "입금확인중",
      "예매 확정",
    ]);
    const CANCELLED_STATUSES = new Set([
      "BOOKING_CANCELLED",
      "BOOKING_DELETED",
      "예매 취소",
      "예매 삭제",
    ]);

    const hasActiveBooking = selectedItems.some((item) => ACTIVE_STATUSES.has(item.bookingStatus));
    const hasCancelledBooking = selectedItems.some((item) =>
      CANCELLED_STATUSES.has(item.bookingStatus)
    );

    if (!hasActiveBooking && hasCancelledBooking) {
      return "목록에서 예매자 정보가 삭제돼요. (잔여 좌석 수에는 변동이 없어요)";
    }
    if (hasActiveBooking && hasCancelledBooking) {
      return "선택한 예매 중 활성 예매는 취소되어 좌석이 반납되고, 이미 취소된 건은 목록에서 삭제돼요.";
    }
    return "선택한 예매가 취소되며, 해당 티켓은 다시 예매 가능한 잔여 좌석으로 반납돼요.";
  };

  const handlePaymentDeleteBtn = () => {
    const checkedIdSet = new Set(checkedBookingId.map(Number));
    const selectedItems = paymentData.filter(
      (item) => item.deletable && checkedIdSet.has(Number(item.bookingId))
    );

    openConfirm({
      title: "예매자를 삭제하시겠어요?",
      subTitle: getDeleteModalSubTitle(selectedItems),
      okText: "삭제하기",
      noText: "아니요",
      okCallback: () => {
        handlePaymentDeleteAxiosFunc();
      },
      noCallback: closeConfirm,
    });
  };

  const handlePaymentDeleteAxiosFunc = async () => {
    if (deleteIsPending) {
      return;
    }
    // 취소 요청 PUT API 요청
    // bookingId만 전달

    const filteredPaymentData = paymentData
      .filter(({ bookingId, deletable }) => deletable && checkedBookingId.includes(bookingId))
      .map(({ bookingId }) => ({ bookingId }));

    if (filteredPaymentData.length === 0) {
      return;
    }

    await deleteMutate({
      performanceId: Number(performanceId),
      bookingList: filteredPaymentData,
    });
    closeConfirm();
    setCheckedBookingId([]);
    setStatus("DEFAULT");
    setFilterList({
      scheduleNumber: [],
      bookingStatus: [],
    });
    handleToastVisible("예매자가 삭제되었습니다.", "top");
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
    setCheckedBookingId([]);
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
          bookingStatus: [],
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
    setOpenFilter((prev) => !prev);
  };

  const handleFilter = async (scheduleNumber: number[], bookingStatus: string[]) => {
    setCheckedBookingId([]);
    setFilterList({
      scheduleNumber,
      bookingStatus,
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedBookingId([]);
    setSearchWord(event.target.value);
  };

  useEffect(() => {
    if (
      data?.bookingList &&
      filterList.scheduleNumber.length === 0 &&
      filterList.bookingStatus.length === 0
    ) {
      setAllBookings(data.bookingList);
    }
  }, [data, filterList]);

  useEffect(() => {
    if (allBookings) {
      //전체 데이터를 기반으로 csv 추출 데이터 구축
      const tempCSVDataArr: CSVDataType[] = [];

      allBookings.map((item) => {
        const date = item.createdAt.split("T")[0];
        const time = item.createdAt.split("T")[1].slice(0, 5);
        const formattedDate = date?.replace(/-/g, ".");
        const formattedCreateTime = `${formattedDate} ${time}`;

        tempCSVDataArr.push({
          scheduleNumber: `${convertingNumber(item.scheduleNumber)}회차`,
          createdAt: formattedCreateTime,
          bookerName: item.bookerName,
          purchaseTicketCount: `${item.purchaseTicketCount}매`,
          bookerPhoneNumber: item.bookerPhoneNumber,
          bookingStatus: convertingBookingStatus(item.bookingStatus as PaymentType),
        });
      });

      tempCSVDataArr.sort((a, b) => {
        const scheduleDiff = a.scheduleNumber.localeCompare(b.scheduleNumber, "ko", {
          numeric: true,
        });
        if (scheduleDiff !== 0) {
          return scheduleDiff;
        }

        const statusDiff = a.bookingStatus.localeCompare(b.bookingStatus, "ko");
        if (statusDiff !== 0) {
          return statusDiff;
        }

        return a.createdAt.localeCompare(b.createdAt, "ko");
      });

      setCSVDataArr(tempCSVDataArr);
    }
  }, [data, paymentData, allBookings]);

  const navigate = useNavigate();

  // 함수가 선언될 당시의 status값을 클로저로 캡처 -> 최신 값 보장하기 위해 함수형 업데이트 사용
  const handleNavigateBack = () => {
    setCheckedBookingId([]);
    setStatus((prevStatus) => {
      if (prevStatus !== "DEFAULT") {
        setFilterList({
          scheduleNumber: [],
          bookingStatus: [],
        });
        return "DEFAULT";
      }
      navigate("/gig-manage");
      return prevStatus;
    });
  };

  const handleInAppBrowser = () => {
    const redirectToExternalBrowser = () => {
      const targetUrl = "https://www.beatlive.kr/gig-manage";

      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        const safariUrl = `safari://${targetUrl.replace(/https?:\/\//i, "")}`;
        window.location.href = safariUrl;
      } else {
        window.location.href = `intent://${targetUrl.replace(
          /https?:\/\//i,
          ""
        )}#Intent;scheme=http;package=com.android.chrome;end`;
      }
    };

    const userAgent = navigator.userAgent.toLowerCase();

    if (/kakaotalk/i.test(userAgent)) {
      window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(
        "https://www.beatlive.kr/gig-manage"
      )}`;
    } else if (/line/i.test(userAgent)) {
      const targetUrl = "https://www.beatlive.kr/gig-manage";
      window.location.href = targetUrl.includes("?")
        ? `${targetUrl}&openExternalBrowser=1`
        : `${targetUrl}?openExternalBrowser=1`;
    } else if (
      /inapp|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone.*whale|android.*whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill\/[^1]/i.test(
        userAgent
      )
    ) {
      redirectToExternalBrowser();
    }
  };

  const handleCSVDownload = () => {
    if (
      getUA.match(
        /inapp|KAKAOTALK|FBAV|Line|Instagram|wadiz|kakaostory|band|twitter|DaumApps|everytimeapp|whatsApp|electron|aliapp|zumapp|iphone.*whale|android.*whale|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|trill/i
      )
    ) {
      openConfirm({
        title: "해당 브라우저에서는 지원하지 않아요.",
        subTitle: "크롬, 사파리, 삼성 인터넷 등 다른 경로를 이용해 주세요.",
        okText: "다른 경로로 열기",
        noText: "닫기",
        okCallback: () => {
          handleInAppBrowser();
        },
        noCallback: closeConfirm,
      });
    } else {
      if (csvLinkRef.current) {
        csvLinkRef.current.link.click();
      }

      handleToastVisible("예매자 리스트가 다운되었습니다.", "top");
    }
  };

  const { setHeader } = useHeader();

  useEffect(() => {
    if (status === "DEFAULT") {
      setHeader({
        headerStyle: NAVIGATION_STATE.ICON_TITLE_DOWNLOAD,
        title: "예매자 관리",
        subText: "리스트",
        leftOnClick: handleNavigateBack,
        rightOnClick: handleCSVDownload,
      });
    } else {
      setHeader({
        headerStyle: NAVIGATION_STATE.ICON_TITLE,
        title: actions[status]?.text,
        subText: "리스트",
        leftOnClick: handleNavigateBack,
      });
    }
  }, [setHeader, status]);

  const handleCopyClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);
    handleToastVisible("클립보드에 복사되었습니다!", "top");
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
                isFilter={
                  filterList.scheduleNumber.length > 0 || filterList.bookingStatus.length > 0
                }
                hasBooking={allBookings?.length > 0}
              />
              {status === "DELETE" && (
                <S.DeleteGuide>
                  {isFreePerformance ? (
                    <span>※ 환불 요청 중인 예매는 목록에 나타나지 않아요.</span>
                  ) : (
                    <>
                      <span>※ 삭제할 수 있는 예매(입금 전 · 취소 완료)만 보여요.</span>
                      <span>※ 입금 완료 · 환불 요청 중인 예매는 목록에 나타나지 않아요.</span>
                    </>
                  )}
                </S.DeleteGuide>
              )}
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
                        {status !== "DEFAULT" && (status !== "DELETE" || item.deletable) && (
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
              {paymentData?.length > 0 && (
                <Button
                  onClick={handleButtonClick}
                  disabled={status === "DELETE" && checkedBookingId.length === 0}
                >
                  {buttonText}
                </Button>
              )}
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
            <CSVLink
              data={CSVDataArr}
              headers={headers}
              filename={`${data?.performanceTitle}_예매자 목록.csv`}
              ref={csvLinkRef}
            />
            <Toast
              icon={toastConfig.iconType === "error" ? <IconXButton /> : <IconCheck />}
              isVisible={isToastVisible}
              isTop={toastConfig.isTop}
              toastBottom={30}
            >
              {toastConfig.message}
            </Toast>
          </S.TicketHolderListWrpper>
        </>
      )}
    </>
  );
};

export default TicketHolderList;
