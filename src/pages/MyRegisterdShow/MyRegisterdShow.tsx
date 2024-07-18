import { useMakerPerformance } from "@apis/domains/performances/queries";
import Button from "@components/commons/button/Button";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks/useHeader";
import { components } from "@typings/api/schema";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bannerNarrow from "../../assets/images/banner_narrow.png";
import * as S from "./MyRegisterdShow.styled";
import RegisteredCard from "./components/registeredcard/RegisteredCard";
import { RegisteredObjProps } from "./constants/myRegisterShow";
const MyRegisterdShow = () => {
  const { setHeader } = useHeader();
  const navigate = useNavigate();

  //추후 공연등록하기 주소(채현) 나오면 변경 예정
  const handleBackBtn = () => {
    //navigate(-1);
    const url = "/main";
    window.location.assign(url);
  };

  //모든 페이지 컴포넌트는 반드시 헤더 설정하기 + useEffect, NAVIGATION_STATE 사용하기
  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE,
      title: "내가 등록한 공연",
      leftOnClick: handleBackBtn,
    });
  }, [setHeader]);

  //추후 API에서 받아온 걸로 set할 예정
  type MakerPerformanceDetail = components["schemas"]["MakerPerformanceDetail"];
  const { data, isLoading } = useMakerPerformance();
  const [showList, setShowList] = useState<MakerPerformanceDetail[] | undefined>(
    data?.performances
  );
  useEffect(() => {
    setShowList(data?.performances);
  }, [data]);

  useEffect(() => {}, [showList]);
  const [isNothing, setIsNothing] = useState(true);

  useEffect(() => {
    if (showList?.length === 0) {
      setIsNothing(true);
    } else {
      setIsNothing(false);
    }
  }, [showList]);

  const handleRegisterButton = () => {
    //register 한다
    navigate("/gig-register");
  };
  return (
    <>
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
          {/*navigate 위치할 곳 - fix로 예상함*/}
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
                {/*Get 요청 받아서 map으로 반복적으로 렌더링할 예정 */}
                {showList?.map((item: RegisteredObjProps, index: number) => (
                  <RegisteredCard
                    key={item.performanceId}
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
        </>
      )}
    </>
  );
};

export default MyRegisterdShow;
