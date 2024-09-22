import { useState } from "react";
import * as S from "./Promotion.styled";
import Tab from "@admin/compontets/commons/tab/Tab";
import AdminCarousel from "@admin/pages/promotion/components/adminCarousel/AdminCarousel";
import AdminBanner from "@admin/pages/promotion/components/adminBanner/AdminBanner";
import AdminButton from "@admin/compontets/commons/adminButton/AdminButton";

const Promotion = () => {
  const [tab, setTab] = useState("carousel");

  const handleTab = (value) => {
    setTab(value);
  };

  return (
    <S.PromotionWrapper>
      <S.Selector>
        <S.TabContainer>
          <Tab onClick={() => handleTab("carousel")} selected={tab === "carousel"}>
            캐러셀
          </Tab>
          <Tab onClick={() => handleTab("banner")} selected={tab === "banner"}>
            배너
          </Tab>
        </S.TabContainer>

        {/* state 따라서 GET 보내기....!! */}
        <AdminButton variant="primary">저장하기</AdminButton>
      </S.Selector>
      <S.PromotionContent>
        {tab === "carousel" ? <AdminCarousel /> : <AdminBanner />}
      </S.PromotionContent>
    </S.PromotionWrapper>
  );
};

export default Promotion;
