import { useMakerPerformance } from "@apis/domains/performances/queries";
import { Loading } from "@components/commons";
import Button from "@components/commons/button/Button";
import MetaTag from "@components/commons/meta/MetaTag";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bannerNarrow from "../../assets/images/banner_narrow.png";
import * as S from "./MyRegisterdShow.styled";
import RegisteredCard from "./components/registeredcard/RegisteredCard";
import { RegisteredObjProps } from "./constants/myRegisterShow";

const MyRegisterdShow = () => {
  const { setHeader } = useHeader();
  const navigate = useNavigate();

  const handleBackBtn = () => {
    navigate("/main");
  };

  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE,
      title: "내가 등록한 공연",
      leftOnClick: handleBackBtn,
    });
  }, [setHeader]);

  const { data, isLoading } = useMakerPerformance();

  const [isNothing, setIsNothing] = useState(true);

  useEffect(() => {
    if (data?.performances?.length === 0) {
      setIsNothing(true);
    } else {
      setIsNothing(false);
    }
  }, [data]);

  const handleRegisterButton = () => {
    navigate("/gig-register");
  };

  return (
    <>
      <MetaTag title="내가 등록한 공연" />
      {isNothing ? (
        <>
          {/*navigate 위치할 곳 - fix로 예상함*/}
          <S.BodyWrapper $isNothing={isNothing}>
            <S.BodyNothingLayout>
              <S.GrapicImg />
              <S.NothingText>아직 등록한 공연이 없어요.</S.NothingText>
            </S.BodyNothingLayout>
            <S.ButtonWrapper>
              <Button
                size="xlarge"
                variant="primary"
                disabled={false}
                onClick={handleRegisterButton}
              >
                공연 등록하기
              </Button>
            </S.ButtonWrapper>
          </S.BodyWrapper>
        </>
      ) : (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <S.BodyWrapper $isNothing={isNothing}>
              <S.BodyLayout>
                <S.Banner imgsrc={bannerNarrow}>
                  <S.BannerText>새로운 공연을 시작해보세요!</S.BannerText>
                  <Button
                    size="xsmall"
                    variant="primary"
                    disabled={false}
                    onClick={handleRegisterButton}
                  >
                    <S.BannerButtonText>등록하기</S.BannerButtonText>
                  </Button>
                </S.Banner>
                <S.RegisteredCardWrapper>
                  {data?.performances?.map((item: RegisteredObjProps, index: number) => (
                    <RegisteredCard
                      key={item.performanceId}
                      performanceId={item.performanceId}
                      performanceTitle={item.performanceTitle}
                      performancePeriod={item.performancePeriod}
                      genre={item.genre}
                      posterImage={item.posterImage}
                      param={item.performanceId}
                    />
                  ))}
                </S.RegisteredCardWrapper>
              </S.BodyLayout>
            </S.BodyWrapper>
          )}
        </>
      )}
    </>
  );
};

export default MyRegisterdShow;
