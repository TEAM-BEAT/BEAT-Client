import * as S from "./ManagerCard.styled";

const ManagerCard = ({
  isPaid,
  isDetail,
  setDetail,
}: {
  isPaid: boolean;
  isDetail: boolean;
  setDetail: () => void;
}) => {
  return (
    <S.ManagerCardWrapper $isDetail={isDetail}>
      <S.ManagerCardLayout $isDetail={isDetail} />
      <S.ManagerCardRadioLayout $isDetail={isDetail} $isPaid={isPaid}>
        <S.ManagerCardRadioBox onClick={setDetail}>
          {isPaid ? <S.SelectedIcon /> : <S.UnselectedIcon />}
          <S.ManagerCardRadioText>{isPaid ? "입금 완료" : "미입금"}</S.ManagerCardRadioText>
        </S.ManagerCardRadioBox>
      </S.ManagerCardRadioLayout>
    </S.ManagerCardWrapper>
  );
};

export default ManagerCard;
