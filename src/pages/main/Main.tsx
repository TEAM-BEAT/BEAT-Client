import { useState } from "react";
import * as S from "./Main.styled";

import Carousel from "./components/carousel/Carousel";
import Chips from "./components/chips/Chips";
import Footer from "./components/footer/Footer";
import MainNavigation from "./components/mainNavigation/MainNavigation";
import Performance from "./components/performance/Performance";

import Floating from "./components/floating/Floating";
import { dummyData } from "./constants/dummyData";
import { useAtom } from "jotai";
import { navigateAtom } from "@stores/navigate";

const Main = () => {
  const [genre, setGenre] = useState("ALL");

  const handleGenre = (value: string) => {
    setGenre(value);
  };

  const [navigateUrl, setNavigateUrl] = useAtom(navigateAtom);

  console.log("main", navigateUrl);

  return (
    <S.MainWrapper>
      <MainNavigation />
      <Carousel promotionList={dummyData.promotionList} />
      <Chips handleGenre={handleGenre} />
      <Floating />
      <Performance genre={genre} performanceList={dummyData.performanceList} />
      <Footer />
    </S.MainWrapper>
  );
};

export default Main;
