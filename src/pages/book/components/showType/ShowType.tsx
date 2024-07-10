import { SHOW_TYPE, ShowTypes } from "@pages/book/constants";
import * as S from "./ShowType.styled";

interface ShowTypeProps {
  type: ShowTypes;
}

const ShowType = ({ type }: ShowTypeProps) => {
  // TODO: 각 공연 타입에 따라 다른 뷰 리턴
  if (type === SHOW_TYPE.BAND) {
    return (
      <S.ShowTypeWrapper>
        {/* TODO: 아이콘 미정 */}
        {/* {icon && <S.ShowTypeIcon>{icon}</S.ShowTypeIcon>} */}
        <S.ShowTypeIcon />
        <S.ShowTypeText>{SHOW_TYPE.BAND}</S.ShowTypeText>
      </S.ShowTypeWrapper>
    );
  }

  return <></>;
};

export default ShowType;
