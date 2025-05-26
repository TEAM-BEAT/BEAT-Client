import { useGetPerformanceDetail } from "@apis/domains/performances/queries";
import { ActionBottomSheet, Button, Loading } from "@components/commons";
import OuterLayout from "@components/commons/bottomSheet/OuterLayout";
import MetaTag from "@components/commons/meta/MetaTag";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader, useLogin } from "@hooks";
import NotFound from "@pages/notFound/NotFound";
import { navigateAtom } from "@stores";
import { requestKakaoLogin } from "@utils/kakaoLogin";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Content from "./components/content/Content";
import ShowInfo from "./components/showInfo/ShowInfo";
import { SHOW_TYPE_KEY } from "./constants";
import * as S from "./Gig.styled";
import { Tracking } from "@components/commons/track/Tracking";

//todo: 공연 보는 페이지, 수정 페이지에서도 변경 사항 반영해두기
const Gig = () => {
  const navigate = useNavigate();
  const [, setNavigateUrl] = useAtom(navigateAtom);
  const { setHeader } = useHeader();
  const { isLogin } = useLogin();

  const { performanceId } = useParams<{ performanceId: string }>();
  const { data, isLoading, isError } = useGetPerformanceDetail(Number(performanceId));

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // 공연 예매 가능 여부
  const isBookingAvailable = data?.scheduleList.some((schedule) => schedule.isBooking);

  const handleBookClick = () => {
    if (isLogin) {
      navigate(`/book/${performanceId}`);
      return;
    }
    setIsSheetOpen(true);
  };

  const handleKakaoLogin = (url: string) => {
    setNavigateUrl(url);
    requestKakaoLogin();
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  useEffect(() => {
    if (data) {
      setHeader({
        headerStyle: NAVIGATION_STATE.ICON_TITLE,
        title: data?.performanceTitle,
        leftOnClick: () => {
          navigate("/main");
        },
      });
    }
  }, [data]);

  if (isLoading) {
    return (
      <>
        {!data && (
          <div
            className="deploy-loading"
            style={{
              width: "100vw", // 100% 너비
              height: "100vh", // 100% 높이
              zIndex: 1000, // z-index 값
              top: 0, // 상단 고정
              left: 0, // 좌측 고정
            }}
          />
        )}
        <Loading />
      </>
    );
  }

  if (isError) {
    return <NotFound />;
  }

  return (
    <S.ContentWrapper>
      {data === null && (
        <div
          className="deploy-loading"
          style={{
            width: "100vw", // 100% 너비
            height: "100vh", // 100% 높이
            zIndex: 1000, // z-index 값
            top: 0, // 상단 고정
            left: 0, // 좌측 고정
          }}
        />
      )}
      <MetaTag
        title={data?.performanceTitle}
        ogTitle={data?.performanceTitle}
        description={`${data?.performanceTitle} - 심장이 뛰는 곳, BEAT에서 만나보세요.`}
        image={data?.posterImage}
        keywords={data?.performanceTitle}
        url={`${import.meta.env.VITE_CLIENT_URL}/gig/${performanceId}`}
      />
      <ShowInfo
        posterImage={data?.posterImage ?? ""}
        genre={data?.genre as SHOW_TYPE_KEY}
        title={data?.performanceTitle ?? ""}
        price={data?.ticketPrice ?? 0}
        venue={data?.performanceVenue ?? ""}
        period={data?.performancePeriod ?? ""}
        runningTime={data?.runningTime ?? 0}
        scheduleList={data?.scheduleList ?? []}
      />
      <Content
        description={data?.performanceDescription ?? ""}
        performanceImageList={data?.performanceImageList ?? []}
        attentionNote={data?.performanceAttentionNote ?? ""}
        contact={data?.performanceContact ?? ""}
        teamName={data?.performanceTeamName ?? ""}
        castList={data?.castList ?? []}
        staffList={data?.staffList ?? []}
        performanceVenue={data?.performanceVenue ?? ""}
        roadAddressName={data?.roadAddressName ?? ""}
        placeDetailAddress={data?.placeDetailAddress ?? ""}
        latitude={data?.latitude ?? ""}
        longitude={data?.longitude ?? ""}
      />
      <S.FooterContainer>
        <Tracking
          event="CLICKED_CTA_BOOK"
          properties={{ cta_level: "Primary" }}
          disabled={!isBookingAvailable}
        >
          <Button onClick={handleBookClick} disabled={!isBookingAvailable}>
            {isBookingAvailable ? "예매하기" : "마감된 공연입니다."}
          </Button>
        </Tracking>
      </S.FooterContainer>

      <ActionBottomSheet
        isOpen={isSheetOpen}
        onClickOutside={handleSheetClose}
        title="로그인 후 예매하시겠어요?"
        alignItems="center"
        padding="2rem 2rem 2.4rem 2rem"
      >
        <OuterLayout margin="1.6rem 0 0 0">
          <S.ButtonWrapper>
            <Button
              variant="primary"
              size="xlarge"
              style={{ backgroundColor: "#FEE500", color: "#0F0F0F" }}
              onClick={() => handleKakaoLogin(`/book/${performanceId}`)}
            >
              카카오 로그인
            </Button>
            <Button variant="gray" size="xlarge" onClick={() => navigate(`/book/${performanceId}`)}>
              비회원 예매
            </Button>
          </S.ButtonWrapper>
        </OuterLayout>
      </ActionBottomSheet>
    </S.ContentWrapper>
  );
};

export default Gig;
