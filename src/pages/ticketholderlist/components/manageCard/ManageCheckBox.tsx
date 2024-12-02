import * as S from "./ManageCheckBox.styled";

interface ManageCheckBoxProps {
  bookingId: number;
  checkedBookingId: number[];
  handleBookingIdCheck: (bookingId: number) => void;
}

export default function ManageCheckBox({
  bookingId,
  checkedBookingId,
  handleBookingIdCheck,
}: ManageCheckBoxProps) {
  const isChecked = checkedBookingId.includes(bookingId);

  return (
    <S.CheckBoxWrapper>
      <S.CheckBox
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          handleBookingIdCheck(bookingId);
        }}
      />
      {isChecked ? <S.SelectIcon /> : <S.UnSelectIcon />}
    </S.CheckBoxWrapper>
  );
}
