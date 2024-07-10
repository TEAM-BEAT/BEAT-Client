import Button from "@components/commons/button/Button";
import { useState } from "react";
import Banner from "./components/banner/Banner";
import ManagerCard from "./components/managecard/ManagerCard";
import NarrowDropDown from "./components/narrowdropdown/NarrowDropDown";
import eximg from "./constants/silkagel.png";
import * as S from "./TicketHolderList.styled";

const TicketHolderList = () => {
  const [reservedCount, setReservedCount] = useState(0);
  //이거 판매 완료되었는지 여부에 따라서 렌더링하는거 다르게 할지 물어보기, 색깔도 어떻게 할 지 물어보기
  const [isOutdated, setIsOutdated] = useState(false);
  const [detail, setDetail] = useState(false);
  const [paid, setPaid] = useState(false);

  // 0, undefined 일 때는 전체 렌더링
  const [schedule, setSchedule] = useState(0); //1,2,3 에 따라 필터링
  const [payment, setPayment] = useState<boolean | undefined>(undefined);

  const handleToggleButton = () => {
    setDetail((prop) => !prop);
  };

  const handlePaidButton = () => {
    setPaid((prop) => !prop);
  };

  const count = 5; //나중에 api로 받아와서 반영해야함. state로 바꿀 필요 있을까?
  return (
    <>
      <Banner image={eximg} reservedCount={reservedCount} isOutdated={isOutdated} />
      <S.BodyWrapper>
        <S.BodyLayout>
          <S.LayoutHeaderBox>
            <S.LayoutFilterBox>
              {/*set 함수 직접 넘기는 거 안좋다고 했지만, 내부에서 감싸야 하므로 넘김 */}
              <NarrowDropDown
                totalScheduleCount={count}
                schedule={schedule}
                setSchedule={setSchedule}
              >
                모든 회차
              </NarrowDropDown>
              <NarrowDropDown
                totalScheduleCount={count}
                schedule={schedule}
                setPayment={setPayment}
              >
                입금 상태
              </NarrowDropDown>
            </S.LayoutFilterBox>
            <S.ToggleWrapper>
              {detail ? (
                <>
                  <S.ToggleText>자세히</S.ToggleText>
                  <S.ToggleOnIcon
                    onClick={handleToggleButton}
                    $width={"5.6rem"}
                    $height={"3.3rem"}
                  />
                </>
              ) : (
                <>
                  <S.ToggleText>간략히</S.ToggleText>
                  <S.ToggleOffIcon
                    onClick={handleToggleButton}
                    $width={"5.6rem"}
                    $height={"3.3rem"}
                  />
                </>
              )}
            </S.ToggleWrapper>
          </S.LayoutHeaderBox>
          <ManagerCard isPaid={paid} isDetail={detail} setDetail={handlePaidButton} />
          <span style={{ color: "white" }}>{`현재 눌린 회차 번호 : ${schedule}`}</span>
          <span style={{ color: "white" }}>{`현재 눌린 지불 여부 : ${payment}`}</span>
          <S.FooterButtonWrapper>
            <Button>변경내용 저장하기</Button>
          </S.FooterButtonWrapper>
        </S.BodyLayout>
      </S.BodyWrapper>
    </>
  );
};

export default TicketHolderList;
