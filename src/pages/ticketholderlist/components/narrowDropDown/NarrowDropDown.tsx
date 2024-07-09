import { ReactNode, useState } from "react";
import * as S from "./NarrowDropDown.styled";

interface DropdownProps {
  children: ReactNode;
  totalScheduleCount: number;
  setSchedule?: (param: number) => void;
  setPayment?: (param: boolean) => void;
}

const NarrowDropDown = ({
  children,
  totalScheduleCount,
  setSchedule,
  setPayment,
}: DropdownProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const renderDropdownContent = (count: number, childrenNode: ReactNode) => {
    const items = [];
    const childrenString = childrenNode?.toString();
    if (childrenString === "모든 회차") {
      for (let i = 1; i <= count; i++) {
        const handleSchedule = () => {
          setSchedule?.(i);
        };
        items.push(
          <S.DropdownContentButton onClick={handleSchedule}>
            <S.DropdownContentText>{i}차</S.DropdownContentText>
          </S.DropdownContentButton>
        );
      }
    } else if (childrenString === "입금 상태") {
      const handlePaymentFalse = () => {
        setPayment?.(false);
      };

      const handlePaymentTrue = () => {
        setPayment?.(true);
      };

      items.push(
        <S.DropdownContentButton onClick={handlePaymentFalse}>
          <S.DropdownContentText>미입금</S.DropdownContentText>
        </S.DropdownContentButton>
      );
      items.push(
        <S.DropdownContentButton onClick={handlePaymentTrue}>
          <S.DropdownContentText>입금완료</S.DropdownContentText>
        </S.DropdownContentButton>
      );
    }

    return items;
  };

  //공연별로 총 회차 값으로 넘겨주기로 함.
  //각 공연별 회차는, DB 테이블 구조에 따라 enum값으로 넘겨주기로 함
  //필터링은 회차 번호(scheduleNumber : FIRST, SECOND, THIRD), 입금 완료 여부는 paymentStatus에 따라 나뉠거임
  //

  return (
    <S.DropdownWrapper>
      <S.DropdownButton onClick={handleToggle}>
        <S.DropDownButtonContent>
          <S.ButtonContentSpan>{children}</S.ButtonContentSpan>
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
