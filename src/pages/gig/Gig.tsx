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

const Gig = () => {
  const navigate = useNavigate();
  const [, setNavigateUrl] = useAtom(navigateAtom);
  const { setHeader } = useHeader();
  const { isLogin } = useLogin();

  const { performanceId } = useParams<{ performanceId: string }>();
  const { data, isLoading } = useGetPerformanceDetail(Number(performanceId));

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const nowDate = new Date();
  const lastPerformanceDate = new Date(
    data?.scheduleList[data?.scheduleList.length - 1]?.performanceDate
  );
  // 현재 시간이 마지막 공연 시간보다 크면 예매 버튼 비활성화
  const isBookDisabled = nowDate > lastPerformanceDate;

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
    return <Loading isLoading={isLoading} />;
  }

  if (!data) {
    return <NotFound />;
  }

  return (
    <S.ContentWrapper>
      isLoading: {isLoading ? "true" : "false"}
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
        attentionNote={data?.performanceAttentionNote ?? ""}
        contact={data?.performanceContact ?? ""}
        teamName={data?.performanceTeamName ?? ""}
        castList={data?.castList ?? []}
        staffList={data?.staffList ?? []}
      />
      <S.FooterContainer>
        <Button onClick={handleBookClick} disabled={isBookDisabled}>
          {isBookDisabled ? "종료된 공연은 예매할 수 없습니다." : "예매하기"}
        </Button>
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
