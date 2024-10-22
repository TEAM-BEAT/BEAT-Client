import * as S from "./SelectIcon.styled";

const SelectIcon = ({
  onClick,
  isChecked,
  alreadyBookingConfirmed,
}: {
  onClick: () => void;
  isChecked: boolean;
  alreadyBookingConfirmed: boolean;
}) => {
  return (
    <>
      {alreadyBookingConfirmed ? (
        <S.CantSelectedIcon />
      ) : isChecked ? (
        <S.DeleteSelectedIcon onClick={onClick} />
      ) : (
        <S.DeleteUnselectedIcon onClick={onClick} />
      )}
    </>
  );
};

export default SelectIcon;
