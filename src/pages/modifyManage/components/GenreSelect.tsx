import Spacing from "@components/commons/spacing/Spacing";
import { ComponentType } from "react";
import * as S from "../ModifyManage.styled";

interface Genre {
  id: number;
  genre: string;
  genreKor: string;
  genreIcon: ComponentType;
}
interface GenreSelectProps {
  title: string;
  genres: Genre[];
  selectedGenre: string;
  onGenreSelect: (genre: string) => void;
  marginBottom?: number;
}

const GenreSelect = ({
  title,
  genres,
  selectedGenre,
  onGenreSelect,
  marginBottom = 1.6,
}: GenreSelectProps) => {
  return (
    <S.InputModifyManageBox $marginBottom={marginBottom}>
      <S.InputTitle>{title}</S.InputTitle>
      <Spacing marginBottom={"1.4"} />
      <S.GenreContainer>
        {genres.map((genre) => {
          const GenreIcon = S.StyledIcon(genre.genreIcon);
          return (
            <S.GenreItem
              key={genre.id}
              onClick={() => onGenreSelect(genre.genre)}
              selected={selectedGenre === genre.genre}
            >
              <GenreIcon selected={selectedGenre === genre.genre} />
              {genre.genreKor}
            </S.GenreItem>
          );
        })}
      </S.GenreContainer>
    </S.InputModifyManageBox>
  );
};

export default GenreSelect;
