import * as S from "./SelectIcon.styled";

const SelectIcon = ({ onClick, isChecked }: { onClick: () => void; isChecked: boolean }) => {
  return (
    <>
      {isChecked ? (
        <S.DeleteSelectedIcon onClick={onClick} />
      ) : (
        <S.DeleteUnselectedIcon onClick={onClick} />
      )}
    </>
  );
};

export default SelectIcon;
