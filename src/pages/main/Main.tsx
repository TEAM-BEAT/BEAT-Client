import React, { useState } from "react";
import * as S from "./Main.styled";

import Performance from "./components/performance/Performance";

const Main = () => {
  // chips 클릭하면 seGenre 달라지게!
  const [genre, setGenre] = useState("ALL");

  return (
    <S.MainWrapper>
      <Performance genre={genre} />
    </S.MainWrapper>
  );
};

export default Main;
