import Button from "@components/commons/button/Button";
import { useEffect, useState } from "react";
import RoleLayout from "./components/RoleLayout";
import * as S from "./ModifyManage.styled";
import { Cast, Staff } from "./typings/gigInfo";
interface ModifyManageMakerProps {
  castList: Cast[];
  staffList: Staff[];
  handleModifyManageStep: () => void;
  updateGigInfo: (
    newInfo: Partial<{ castModifyRequests: Cast[]; staffModifyRequests: Staff[] }>
  ) => void;
}

const ModifyManageMaker = ({
  castList: prevCastList,
  staffList: prevStaffList,
  handleModifyManageStep,
  updateGigInfo,
}: ModifyManageMakerProps) => {
  const [castList, setCastList] = useState<Cast[]>(prevCastList);
  const [staffList, setStaffList] = useState<Staff[]>(prevStaffList);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const allCastFieldsFilled = castList.every(
      (cast) => cast.castName && cast.castRole && cast.castPhoto
    );

    const allStaffFieldsFilled = staffList.every(
      (staff) => staff.staffName && staff.staffRole && staff.staffPhoto
    );

    setIsButtonDisabled(
      !(
        (castList?.length <= 1 &&
          !castList[0]?.castName &&
          !castList[0]?.castRole &&
          !castList[0]?.castPhoto) ||
        allCastFieldsFilled
      ) ||
        !(
          (castList?.length <= 1 &&
            !staffList[0]?.staffName &&
            !staffList[0]?.staffRole &&
            !staffList[0]?.staffPhoto) ||
          allStaffFieldsFilled
        )
    );
  }, [castList, staffList]);

  const handleUpdateList = (title: string, updatedList: Cast[] | Staff[]) => {
    if (title === "출연진") {
      setCastList(updatedList as Cast[]);
    } else if (title === "스태프") {
      setStaffList(updatedList as Staff[]);
    }
    updateGigInfo({ castModifyRequests: castList, staffModifyRequests: staffList });
  };

  const handleList = () => {
    // 모든 속성이 비어있는 객체들 필터링
    const filteredCastList = castList.filter(
      (cast) => cast.castName || cast.castRole || cast.castPhoto
    );
    const filteredStaffList = staffList.filter(
      (staff) => staff.staffName || staff.staffRole || staff.staffPhoto
    );

    updateGigInfo({ castModifyRequests: filteredCastList, staffModifyRequests: filteredStaffList });
    handleModifyManageStep();
  };

  return (
    <>
      <S.ModifyManageContainer>
        <RoleLayout
          title="출연진"
          list={castList}
          updateList={(list) => handleUpdateList("출연진", list)}
        />
        <S.Divider />
        <RoleLayout
          title="스태프"
          list={staffList}
          updateList={(list) => handleUpdateList("스태프", list)}
        />
      </S.ModifyManageContainer>
      <S.FooterContainer>
        <S.FooterDivider />
        <S.FooterInfo>공연진 상세정보는 선택사항이며, 이후 수정불가합니다.</S.FooterInfo>
        <Button onClick={handleList} disabled={isButtonDisabled}>
          다음
        </Button>
      </S.FooterContainer>
    </>
  );
};

export default ModifyManageMaker;
