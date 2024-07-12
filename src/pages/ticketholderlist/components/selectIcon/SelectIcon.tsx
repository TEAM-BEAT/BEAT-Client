import * as S from "./SelectIcon.styled";

const SelectIcon = ({ isChecked }: { isChecked: boolean }) => {
  return <>{isChecked ? <S.DeleteSelectedIcon /> : <S.DeleteUnselectedIcon />}</>;
};

export default SelectIcon;
