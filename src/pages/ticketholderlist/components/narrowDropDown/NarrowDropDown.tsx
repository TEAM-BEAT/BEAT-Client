import { useState } from "react";
import * as S from "./NarrowDropDown.styled";

const NarrowDropDown = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleToggle = () => {
    setShowDropdown(!showDropdown);
  };

  //공연별로 총 회차 값으로 넘겨주기로 함.
  //각 공연별 회차는, DB 테이블 구조에 따라 enum값으로 넘겨주기로 함
  //필터링은 회차 번호(scheduleNumber : FIRST, SECOND, THIRD), 입금 완료 여부는 paymentStatus에 따라 나뉠거임
  //
  const GetEXConstant: number = 3;

  return (
    <S.DropdownWrapper>
      <S.DropdownButton onClick={handleToggle}>
        <S.DropDownButtonContent>
          <S.ButtonContentSpan>모든 회차</S.ButtonContentSpan>
          <S.SvgIcon $rotate={showDropdown} />
        </S.DropDownButtonContent>
      </S.DropdownButton>
      <S.DropdownContentWrapper $show={showDropdown}>
        <S.DropdownContentLayout>
          {}
          <S.DropdownContentButton>
            <S.DropdownContentText>1차</S.DropdownContentText>
          </S.DropdownContentButton>
          <S.DropdownContentButton>
            <S.DropdownContentText>2차</S.DropdownContentText>
          </S.DropdownContentButton>
          <S.DropdownContentButton>
            <S.DropdownContentText>3차</S.DropdownContentText>
          </S.DropdownContentButton>
        </S.DropdownContentLayout>
      </S.DropdownContentWrapper>
    </S.DropdownWrapper>
  );
};

export default NarrowDropDown;
