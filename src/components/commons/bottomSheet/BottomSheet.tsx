import * as S from "../bottomSheet/BottomSheetStyle";

export interface BottomSheetPropType {
  title: string;
}

const BottomSheet = ({ title }: BottomSheetPropType) => {
  return (
    <S.BottomSheetWrapper>
      <S.BottomSheetLayout>
        <S.Title>{title}</S.Title>
      </S.BottomSheetLayout>
    </S.BottomSheetWrapper>
  );
};

export default BottomSheet;
