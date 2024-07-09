import { useState } from "react";
import * as S from "./NarrowDropDown.styled";

const NarrowDropDown = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleToggle = () => {
    setShowDropdown(!showDropdown);
  };

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
          <S.DropdownContentBox>
            <S.DropdownContentText>1차</S.DropdownContentText>
          </S.DropdownContentBox>
          <S.DropdownContentBox>
            <S.DropdownContentText>2차</S.DropdownContentText>
          </S.DropdownContentBox>
          <S.DropdownContentBox>
            <S.DropdownContentText>3차</S.DropdownContentText>
          </S.DropdownContentBox>
        </S.DropdownContentLayout>
      </S.DropdownContentWrapper>
    </S.DropdownWrapper>
  );
};

export default NarrowDropDown;
