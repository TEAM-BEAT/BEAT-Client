import { TAB_TYPE, TabType } from "@pages/book/constants";
import { useState } from "react";
import MakerIntroduce from "../makerIntroduce/MakerIntroduce";
import PerformanceIntroduce from "../performanceIntroduce/PerformanceIntroduce";
import TabBar from "../tabBar/TabBar";
import * as S from "./Content.styled";
import IntroduceContainer from "./IntroduceContainer";

interface ContentProps {
  description: string;
  contact: string;
}

const Content = ({ description, contact }: ContentProps) => {
  const [activeTab, setActiveTab] = useState<TabType>(TAB_TYPE.PERFORMANCE);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <S.IntroduceWrapper>
      <TabBar activeTab={activeTab} handleTabClick={handleTabClick} />
      <IntroduceContainer>
        {activeTab === TAB_TYPE.PERFORMANCE && (
          <PerformanceIntroduce description={description} contact={contact} />
        )}
        {activeTab === TAB_TYPE.MAKER && <MakerIntroduce />}
      </IntroduceContainer>
    </S.IntroduceWrapper>
  );
};

export default Content;
