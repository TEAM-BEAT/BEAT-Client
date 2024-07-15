import { IconSmallBand, IconSmallDance, IconSmallEtc, IconSmallMusical } from "@assets/svgs";
import { SHOW_TYPE, ShowTypes } from "@pages/gig/constants";
import * as S from "./ShowType.styled";

interface ShowTypeProps {
  type: ShowTypes;
}

const ShowType = ({ type }: ShowTypeProps) => {
  switch (type) {
    case SHOW_TYPE.BAND:
      return (
        <S.ShowTypeWrapper>
          <S.ShowTypeIcon>
            <IconSmallBand />
          </S.ShowTypeIcon>
          <S.ShowTypeText>{SHOW_TYPE.BAND}</S.ShowTypeText>
        </S.ShowTypeWrapper>
      );
    case SHOW_TYPE.DANCE:
      return (
        <S.ShowTypeWrapper>
          <S.ShowTypeIcon>
            <IconSmallDance />
          </S.ShowTypeIcon>
          <S.ShowTypeText>{SHOW_TYPE.DANCE}</S.ShowTypeText>
        </S.ShowTypeWrapper>
      );
    case SHOW_TYPE.MUSICAL:
      return (
        <S.ShowTypeWrapper>
          <S.ShowTypeIcon>
            <IconSmallMusical />
          </S.ShowTypeIcon>
          <S.ShowTypeText>{SHOW_TYPE.MUSICAL}</S.ShowTypeText>
        </S.ShowTypeWrapper>
      );
    case SHOW_TYPE.ETC:
      return (
        <S.ShowTypeWrapper>
          <S.ShowTypeIcon>
            <IconSmallEtc />
          </S.ShowTypeIcon>
          <S.ShowTypeText>{SHOW_TYPE.ETC}</S.ShowTypeText>
        </S.ShowTypeWrapper>
      );
    default:
      return null;
  }
};

export default ShowType;
