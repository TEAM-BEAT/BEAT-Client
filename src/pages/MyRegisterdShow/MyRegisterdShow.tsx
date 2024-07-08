import Button from "@components/commons/button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bannerNarrow from "../../assets/images/banner_narrow.png";
import * as S from "./MyRegisterdShow.styled";
import RegisteredCard from "./components/RegisteredCard";
import { MY_REGISTERED_SHOW, RegisteredObjProps } from "./constants/myRegisterShow";

const MyRegisterdShow = () => {
  const navigate = useNavigate();
  //추후 공연등록하기 주소(채현) 나오면 변경 예정
  const handleBtn = () => {
    navigate("/");
  };

  const [isNothing, setIsNothing] = useState<boolean>(false);

  return (
    <>
      {isNothing ? (
        <>
          {/*navigate 위치할 곳 - fix로 예상함*/}
          <S.BodyWrapper>
            <S.BodyNothingLayout>
              <S.GrapicImg />
              <S.NothingText>아직 등록한 공연이 없어요.</S.NothingText>
            </S.BodyNothingLayout>
          </S.BodyWrapper>
          <S.ButtonWrapper>
            <Button size="xlarge" variant="primary" disabled={false} onClick={handleBtn}>
              공연 등록하기
            </Button>
          </S.ButtonWrapper>
        </>
      ) : (
        <>
          {/*navigate 위치할 곳 - fix로 예상함*/}
          <S.BodyWrapper>
            <S.BodyLayout>
              <S.Banner imgsrc={bannerNarrow}>
                <S.BannerText>새로운 공연을 시작해보세요!</S.BannerText>
                <Button size="xsmall" variant="primary" disabled={false}>
                  <S.BannerButtonText>등록하기</S.BannerButtonText>
                </Button>
              </S.Banner>
              <S.RegisteredCardWrapper>
                {/*Get 요청 받아서 map으로 반복적으로 렌더링할 예정 */}
                {MY_REGISTERED_SHOW.data?.map((item: RegisteredObjProps, index: number) => (
                  <RegisteredCard
                    key={item.id}
                    title={item.title}
                    period={item.period}
                    genre={item.genre}
                    image={item.image}
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
