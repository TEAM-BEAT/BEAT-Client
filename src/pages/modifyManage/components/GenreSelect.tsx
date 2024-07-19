import Spacing from "@components/commons/spacing/Spacing";
import { SHOW_TYPE_KEY } from "@pages/gig/constants";
import { ComponentType } from "react";
import * as S from "../ModifyManage.styled";

interface Genre {
  id: number;
  genre: SHOW_TYPE_KEY;
  genreKor: string;
  genreIcon: ComponentType<{ $selected: boolean }>;
}
interface GenreSelectProps {
  title: string;
  genres: Genre[];
  selectedGenre: string;
  onGenreSelect: (genre: SHOW_TYPE_KEY) => void;
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
          return (
            <S.GenreItem
              key={genre.id}
              onClick={() => onGenreSelect(genre.genre)}
              selected={selectedGenre === genre.genre}
            >
              <genre.genreIcon $selected={selectedGenre === genre.genre} />
              {genre.genreKor}
            </S.GenreItem>
          );
        })}
      </S.GenreContainer>
    </S.InputModifyManageBox>
  );
};

export default GenreSelect;
