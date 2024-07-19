import Spacing from "@components/commons/spacing/Spacing";
import * as S from "../Register.styled";
import { ComponentType } from "react";
import { SHOW_TYPE_KEY } from "@pages/gig/constants";

interface Genre {
  id: number;
  genre: SHOW_TYPE_KEY;
  genre_kr: string;
  genreIcon: ComponentType<{ $selected: boolean }>;
}
interface GenreSelectProps {
  title: string;
  genres: Genre[];
  selectedGenre: SHOW_TYPE_KEY;
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
    <S.InputRegisterBox $marginBottom={marginBottom}>
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
              {genre.genre_kr}
            </S.GenreItem>
          );
        })}
      </S.GenreContainer>
    </S.InputRegisterBox>
  );
};

export default GenreSelect;