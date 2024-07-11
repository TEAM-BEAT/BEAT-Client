import Spacing from "@components/commons/spacing/Spacing";
import * as S from "../Register.styled";
import { ReactNode } from "react";

interface Genre {
  id: number;
  genre: string;
  genreIcon: ReactNode;
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
    <S.InputRegisterBox $marginBottom={marginBottom}>
      <S.InputTitle>{title}</S.InputTitle>
      <Spacing marginBottom={"1.4"} />
      <S.GenreContainer>
        {genres.map((genre) => (
          <S.GenreItem
            key={genre.id}
            onClick={() => onGenreSelect(genre.genre)}
            selected={selectedGenre === genre.genre}
          >
            <genre.genreIcon />
            {genre.genre}
          </S.GenreItem>
        ))}
      </S.GenreContainer>
    </S.InputRegisterBox>
  );
};

export default GenreSelect;
