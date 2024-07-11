import React, { useState } from "react";
import * as S from "./Main.styled";

import Performance from "./components/performance/Performance";
import Chips from "./components/chips/Chips";

const Main = () => {
  // chips 클릭하면 seGenre 달라지게!
  const [genre, setGenre] = useState("ALL");

  const handleGenre = (value: string) => {
    setGenre(value);
  };

  return (
    <S.MainWrapper>
      <Chips handleGenre={handleGenre} />
      <Performance genre={genre} />
    </S.MainWrapper>
  );
};

export default Main;
