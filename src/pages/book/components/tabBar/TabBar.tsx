import { TAB_TYPE, TabType } from "@pages/book/constants";
import * as S from "./TabBar.styled";

interface TabBarProps {
  activeTab: string;
  handleTabClick: (tab: TabType) => void;
}

const TabBar = ({ activeTab, handleTabClick }: TabBarProps) => {
  return (
    <S.TabContainer>
      <S.Tab
        $isActive={activeTab === TAB_TYPE.PERFORMANCE}
        onClick={() => handleTabClick(TAB_TYPE.PERFORMANCE)}
      >
        공연 소개
      </S.Tab>
      <S.Tab
        $isActive={activeTab === TAB_TYPE.MAKER}
        onClick={() => handleTabClick(TAB_TYPE.MAKER)}
      >
        메이커 소개
      </S.Tab>
      <S.Underline $activeTab={activeTab} />
    </S.TabContainer>
  );
};

export default TabBar;
