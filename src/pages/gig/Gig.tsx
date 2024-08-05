import { useGetPerformanceDetail } from "@apis/domains/performance/queries";
import ActionBottomSheet from "@components/commons/bottomSheet/actionsBottomSheet/ActionBottomSheet";
import OuterLayout from "@components/commons/bottomSheet/OuterLayout";
import Button from "@components/commons/button/Button";
import Loading from "@components/commons/loading/Loading";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks/useHeader";
import useLogin from "@hooks/useLogin";
import { navigateAtom } from "@stores/navigate";
import { requestKakaoLogin } from "@utils/kakaoLogin";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Content from "./components/content/Content";
import ShowInfo from "./components/showInfo/ShowInfo";
import { SHOW_TYPE_KEY } from "./constants";
import * as S from "./Gig.styled";
import MetaTag from "@components/commons/meta/MetaTag";

const Gig = () => {
  const navigate = useNavigate();
  const [, setNavigateUrl] = useAtom(navigateAtom);
  const { setHeader } = useHeader();
  const { isLogin } = useLogin();

  const { performanceId } = useParams<{ performanceId: string }>();
  const { data, isLoading } = useGetPerformanceDetail(Number(performanceId));

  const [isSheetOpen, setIsSheetOpen] = useState(false);

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
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE,
      title: data?.performanceTitle,
      leftOnClick: () => {
        navigate("/main");
      },
    });
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.ContentWrapper>
      <MetaTag
        title={data?.performanceTitle}
        description={`${data?.performanceTitle} - 심장이 뛰는 곳, BEAT에서 만나보세요.`}
        image={data?.posterImage}
        url={`https://www.beatlive.kr/gig/${performanceId}`}
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
        <Button onClick={handleBookClick}>예매하기</Button>
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
