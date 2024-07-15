import { IconLargeMusical, IconLargeBand, IconLargeDance, IconLargeEtc } from "@assets/svgs";
import { StyledIcon } from "../Register.styled";

export const GENRE_LIST = [
  { id: 1, genre: "PLAY", genre_kr: "연극/뮤지컬", genreIcon: StyledIcon(IconLargeMusical) },
  { id: 2, genre: "BAND", genre_kr: "밴드", genreIcon: StyledIcon(IconLargeBand) },
  { id: 3, genre: "DANCE", genre_kr: "댄스", genreIcon: StyledIcon(IconLargeDance) },
  { id: 4, genre: "ETC", genre_kr: "기타", genreIcon: StyledIcon(IconLargeEtc) },
];
