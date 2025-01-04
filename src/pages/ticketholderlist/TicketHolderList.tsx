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
import { IconCheck } from "@assets/svgs";
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
  const [paymentData, setPaymentData] = useState<BookingListProps[]>();
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
    handleToastVisible("입금 처리되었습니다.", "top");
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

    const filteredPaymentData = paymentData
      .filter(({ bookingId }) => checkedBookingId.includes(bookingId))
      .map(({ bookingId }) => ({ bookingId }));

    refundMutate({
      performanceId: Number(performanceId),
      bookingList: filteredPaymentData,
    });

    closeConfirm();
    handleToastVisible("환불 처리되었습니다.", "top");
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

    const filteredPaymentData = paymentData
      .filter(({ bookingId }) => checkedBookingId.includes(bookingId))
      .map(({ bookingId }) => ({ bookingId }));

    deleteMutate({
      performanceId: Number(performanceId),
      bookingList: filteredPaymentData,
    });
    closeConfirm();
    handleToastVisible("예매자가 삭제되었습니다.", "top");
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
    setOpenFilter((prev) => !prev);
  };

  const handleFilter = async (scheduleNumber: number[], bookingStatus: string[]) => {
    setFilterList({
      scheduleNumber,
      bookingStatus,
    });
  };

  const debouncedQuery = useDebounce(searchWord, 500);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  // 필터 변경될 때마다 GET API 요청
  // 검색될 때마다 GET API 요청
  useEffect(() => {
    const fetchData = async () => {
      const refetchData = await refetch();
      const bookingList = refetchData?.data?.bookingList ?? [];
      setPaymentData(bookingList);

      // 전체 리스트는 필터값 가져오지 않도록
      if (filterList.scheduleNumber.length === 0 && filterList.bookingStatus.length === 0) {
        setAllBookings(bookingList);
      }
    };

    const fetchSearchData = async () => {
      const refetchSearchData = await searchRefetch();
      setPaymentData(refetchSearchData?.data?.bookingList ?? []);
    };

    // TODO : 서버에서 검색어 2글자 이상으로 넘겨줬는데, 기-디에 화면에 어떻게 표현할지 물어보기
    searchWord.length >= 2 ? fetchSearchData() : fetchData();
  }, [filterList, status, debouncedQuery]);

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
  }, [data, paymentData, allBookings]);

  const navigate = useNavigate();

  // 함수가 선언될 당시의 status값을 클로저로 캡처 -> 최신 값 보장하기 위해 함수형 업데이트 사용
  const handleNavigateBack = () => {
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
      // const targetUrl = "https://www.beatlive.kr/gig-manage";
      const targetUrl = window.location.href;

      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = "x-web-search://?";
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
        subTitle: "크롬, 사파리, 삼성 인터넷 등 \n다른 경로를 이용해 주세요.",
        okText: "다른 경로로 열기",
        noText: "닫기",
        okCallback: () => {
          handleInAppBrowser;
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
              {paymentData?.length > 0 && <Button onClick={handleButtonClick}>{buttonText}</Button>}
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
              filename={`${data.performanceTitle}_예매자 목록.csv`}
              ref={csvLinkRef}
            />
            <Toast
              icon={<IconCheck />}
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
