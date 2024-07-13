import { ReactNode, useState } from "react";
import * as S from "./NarrowDropDown.styled";

interface DropdownProps {
  children: ReactNode;
  totalScheduleCount: number;
  schedule: number;
  payment: boolean | undefined;
  setSchedule?: (param: number) => void;
  setPayment?: (param: boolean | undefined) => void;
}

const NarrowDropDown = ({
  children,
  totalScheduleCount,
  schedule,
  payment,
  setSchedule,
  setPayment,
}: DropdownProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isOneChoosed, setIsOneChoosed] = useState(false);

  const handleToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const renderDropdownContent = (count: number, childrenNode: ReactNode) => {
    const items = [];
    const childrenString = childrenNode?.toString();
    if (childrenString === "모든 회차") {
      const handleScheduleAll = () => {
        setSchedule?.(0);
        setIsOneChoosed(false);
        setShowDropdown(false);
      };
      items.push(
        <S.DropdownContentButton
          key={"dropdown-all-schedule"}
          $isLast={false}
          onClick={handleScheduleAll}
        >
          <S.DropdownContentText $selected={schedule === 0}>전체</S.DropdownContentText>
        </S.DropdownContentButton>
      );
      for (let i = 1; i <= count; i++) {
        const handleSchedule = () => {
          setSchedule?.(i);
          setIsOneChoosed(true);
          setShowDropdown(false);
        };

        items.push(
          <S.DropdownContentButton
            key={`dropdown-${i}`}
            $isLast={i === count}
            onClick={handleSchedule}
          >
            <S.DropdownContentText $selected={schedule === i}>{i}회차</S.DropdownContentText>
          </S.DropdownContentButton>
        );
      }
    } else if (childrenString === "입금 상태") {
      const handlePaymentUndefined = () => {
        setPayment?.(undefined);
        setIsOneChoosed(false);
        setShowDropdown(false);
      };

      const handlePaymentFalse = () => {
        setPayment?.(false);
        setIsOneChoosed(true);
        setShowDropdown(false);
      };

      const handlePaymentTrue = () => {
        setPayment?.(true);
        setIsOneChoosed(true);
        setShowDropdown(false);
      };

      items.push(
        <S.DropdownContentButton
          key={"dropdown-all-payment"}
          $isLast={false}
          onClick={handlePaymentUndefined}
        >
          <S.DropdownContentText $selected={payment === undefined}>전체</S.DropdownContentText>
        </S.DropdownContentButton>
      );

      items.push(
        <S.DropdownContentButton key={"dropdown-1"} $isLast={false} onClick={handlePaymentFalse}>
          <S.DropdownContentText $selected={payment === false}>미입금</S.DropdownContentText>
        </S.DropdownContentButton>
      );
      items.push(
        <S.DropdownContentButton key={"dropdown-2"} $isLast={true} onClick={handlePaymentTrue}>
          <S.DropdownContentText $selected={payment === true}>입금완료</S.DropdownContentText>
        </S.DropdownContentButton>
      );
    }

    return items;
  };

  //공연별로 총 회차 값으로 넘겨주기로 함.
  //각 공연별 회차는, DB 테이블 구조에 따라 enum값으로 넘겨주기로 함
  //필터링은 회차 번호(scheduleNumber : FIRST, SECOND, THIRD), 입금 완료 여부는 paymentStatus에 따라 나뉠거임
  //

  let changedChildren;
  if (children === "입금 상태" && payment !== undefined) {
    changedChildren = payment ? "입금완료" : "미입금";
  } else if (children === "모든 회차" && schedule !== 0) {
    changedChildren = `${schedule}차`;
  }

  return (
    <S.DropdownWrapper>
      <S.DropdownButton $isChoosed={isOneChoosed} onClick={handleToggle}>
        <S.DropDownButtonContent>
          <S.ButtonContentSpan>
            {changedChildren === undefined ? children : changedChildren}
          </S.ButtonContentSpan>
          <S.SvgIcon $rotate={showDropdown} />
        </S.DropDownButtonContent>
      </S.DropdownButton>
      <S.DropdownContentWrapper $show={showDropdown}>
        <S.DropdownContentLayout>
          {renderDropdownContent(totalScheduleCount, children)}
        </S.DropdownContentLayout>
      </S.DropdownContentWrapper>
    </S.DropdownWrapper>
  );
};

export default NarrowDropDown;
