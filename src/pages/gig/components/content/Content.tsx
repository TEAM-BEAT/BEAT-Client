import { TAB_TYPE, TabType } from "@pages/gig/constants";
import { useState } from "react";
import MakerIntroduce from "../makerIntroduce/MakerIntroduce";
import PerformanceIntroduce from "../performanceIntroduce/PerformanceIntroduce";
import TabBar from "../tabBar/TabBar";
import * as S from "./Content.styled";
import IntroduceContainer from "./IntroduceContainer";

export type CastListType = {
  castId?: number;
  castName?: string;
  castRole?: string;
  castPhoto?: string;
};

export type StaffListType = {
  staffId?: number;
  staffName?: string;
  staffRole?: string;
  staffPhoto?: string;
};

interface ContentProps {
  description: string;
  attentionNote: string;
  contact: string;
  teamName: string;
  castList: CastListType[];
  staffList: StaffListType[];
}

const Content = ({
  description,
  attentionNote,
  contact,
  teamName,
  castList,
  staffList,
}: ContentProps) => {
  const [activeTab, setActiveTab] = useState<TabType>(TAB_TYPE.PERFORMANCE);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <S.IntroduceWrapper>
      <TabBar activeTab={activeTab} handleTabClick={handleTabClick} />
      <IntroduceContainer>
        {activeTab === TAB_TYPE.PERFORMANCE && (
          <PerformanceIntroduce
            description={description}
            attentionNote={attentionNote}
            contact={contact}
          />
        )}

        {activeTab === TAB_TYPE.MAKER && (
          <MakerIntroduce teamName={teamName} castList={castList} staffList={staffList} />
        )}
      </IntroduceContainer>
    </S.IntroduceWrapper>
  );
};

export default Content;
