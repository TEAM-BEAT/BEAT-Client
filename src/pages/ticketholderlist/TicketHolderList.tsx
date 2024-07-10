import Button from "@components/commons/button/Button";
import { useEffect, useState } from "react";
import Banner from "./components/banner/Banner";
import ManagerCard from "./components/managercard/ManagerCard";
import NarrowDropDown from "./components/narrowDropDown/NarrowDropDown";
import eximg from "./constants/silkagel.png";
import { RESPONSE_TICKETHOLDER } from "./constants/ticketholderlist";
import * as S from "./TicketHolderList.styled";

const TicketHolderList = () => {
  const [reservedCount, setReservedCount] = useState(0);
  //이거 판매 완료되었는지 여부에 따라서 렌더링하는거 다르게 할지 물어보기, 색깔도 어떻게 할 지 물어보기
  const [isOutdated, setIsOutdated] = useState(false);
  const [detail, setDetail] = useState(false);

  // 0, undefined 일 때는 전체 렌더링 (필터링을 위한 state들)
  const [schedule, setSchedule] = useState(0); //1,2,3 에 따라 필터링
  const [payment, setPayment] = useState<boolean | undefined>(undefined);

  const handleToggleButton = () => {
    setDetail((prop) => !prop);
  };

  const handlePaidButton = () => {
    //개별 ManagerCard에서 입금 여부를 갱신하는 axios 요청 로직을 담고 있을 예정
    //그럼, ..... 흠.... 아 일단 요청은 다른 버튼 하나로 한번에 보내기로 했고
    //버튼 하나 하나 누를 떄마다 정보가 저장되었다가,  나중에 보내야하니까 배열이 필요할 듯?
    //그리고 즉시 상태 변경도 필요하고 ..~
  };

  const count = RESPONSE_TICKETHOLDER.data.totalScheduleCount; //나중에 api로 받아와서 반영해야함. state로 바꿀 필요 있을까?
  const response_data = RESPONSE_TICKETHOLDER.data.bookingList; // 나중에 state로 관리해주기

  //도영이가 axios 사용하면 useEffect 필요없다고 했는데, 나중에 리팩토링 할 수도 있음.
  useEffect(() => {
    const totalCount = response_data.reduce(
      (totalSum, obj) => obj.purchaseTicketCount + totalSum,
      0
    );
    setReservedCount(totalCount);
  }, [response_data]);
  //이해하기 어려울 것 같아 주석 남깁니다. 모든 회차, 입금 상태 2가지 필터를 사용하여 원하는 결과만 가져오는 형식입니다.
  //schedule ===0 일 경우는 전체 회차, payment === undefined 일 경우는 전체 입금 여부(입금했든 안했든 렌더링)을 의미합니다.
  const filteredData = response_data.filter((obj) => {
    const isScheduleMatched =
      schedule === 0 ||
      (obj.scheduleNumber === "FIRST" && schedule === 1) ||
      (obj.scheduleNumber === "SECOND" && schedule === 2) ||
      (obj.scheduleNumber === "THIRD" && schedule === 3);
    const isPaymentMatched = payment === undefined || obj.isPaymentCompleted === payment;

    return isScheduleMatched && isPaymentMatched;
  });
  return (
    <>
      <Banner image={eximg} reservedCount={reservedCount} isOutdated={isOutdated} />
      <S.BodyWrapper>
        <S.BodyLayout>
          <S.LayoutHeaderBox>
            <S.LayoutFilterBox>
              {/*set 함수 직접 넘기는 거 안좋다고 했지만, 내부에서 감싸야 하므로 넘김 */}
              <NarrowDropDown
                schedule={schedule}
                payment={payment}
                totalScheduleCount={count}
                setSchedule={setSchedule}
              >
                모든 회차
              </NarrowDropDown>
              <NarrowDropDown
                schedule={schedule}
                payment={payment}
                totalScheduleCount={count}
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
          {filteredData.map((obj, index) => (
            <ManagerCard
              key={`managerCard-${index}`}
              isPaid={obj.isPaymentCompleted}
              isDetail={detail}
              setDetail={handlePaidButton}
              bookername={obj.bookerName}
              purchaseTicketeCount={obj.purchaseTicketCount}
              scheduleNumber={obj.scheduleNumber}
              bookerPhoneNumber={obj.bookerPhoneNumber}
              createAt={obj.createdAt}
            />
          ))}
          {/*
          <span style={{ color: "white" }}>{`현재 눌린 회차 번호 : ${schedule}`}</span>
          <span style={{ color: "white" }}>{`현재 눌린 지불 여부 : ${payment}`}</span>
          */}

          <S.FooterButtonWrapper>
            <Button>변경내용 저장하기</Button>
          </S.FooterButtonWrapper>
        </S.BodyLayout>
      </S.BodyWrapper>
    </>
  );
};

export default TicketHolderList;
