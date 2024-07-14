import { useState } from "react";
import * as S from "./Main.styled";

import MainNavigation from "./components/mainNavigation/MainNavigation";
import Carousel from "./components/carousel/Carousel";
import Chips from "./components/chips/Chips";
import Performance from "./components/performance/Performance";
import Footer from "./components/footer/Footer";

import { dummyData } from "./constants/dummyData";

const Main = () => {
  const [genre, setGenre] = useState("ALL");

  const handleGenre = (value: string) => {
    setGenre(value);
  };

  return (
    <S.MainWrapper>
      <MainNavigation />
      <Carousel promotionList={dummyData.promotionList} />
      <Chips handleGenre={handleGenre} />
      <Performance genre={genre} performanceList={dummyData.performanceList} />
      <Footer />
    </S.MainWrapper>
  );
};

export default Main;
