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

export interface PerformanceImageList {
  performanceImageId?: number;
  performanceImage?: string;
}

interface ContentProps {
  description: string;
  performanceImageList: PerformanceImageList[];
  attentionNote: string;
  contact: string;
  teamName: string;
  castList: CastListType[];
  staffList: StaffListType[];
  performanceVenue: string;
  roadAddressName: string;
  placeDetailAddress: string;
  latitude: string;
  longitude: string;
}

const Content = ({
  description,
  performanceImageList,
  attentionNote,
  contact,
  teamName,
  castList,
  staffList,
  performanceVenue,
  roadAddressName,
  placeDetailAddress,
  latitude,
  longitude,
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
            performanceImageList={performanceImageList}
            attentionNote={attentionNote}
            contact={contact}
            performanceVenue={performanceVenue}
            roadAddressName={roadAddressName}
            placeDetailAddress={placeDetailAddress}
            latitude={latitude}
            longitude={longitude}
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
