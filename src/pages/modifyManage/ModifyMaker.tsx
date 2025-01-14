import Button from "@components/commons/button/Button";
import { useEffect, useState } from "react";
import RoleLayout from "./components/RoleLayout";
import * as S from "./ModifyManage.styled";
import { Cast, Staff } from "./typings/gigInfo";
import { IcNoti } from "@assets/svgs";
interface ModifyManageMakerProps {
  castModifyRequests: Cast[];
  staffModifyRequests: Staff[];
  handleModifyManageStep: () => void;
  updateGigInfo: (
    newInfo: Partial<{ castModifyRequests: Cast[]; staffModifyRequests: Staff[] }>
  ) => void;
}

const ModifyManageMaker = ({
  castModifyRequests: prevcastModifyRequests,
  staffModifyRequests: prevstaffModifyRequests,
  handleModifyManageStep,
  updateGigInfo,
}: ModifyManageMakerProps) => {
  const [castModifyRequests, setcastModifyRequests] = useState<Cast[]>(prevcastModifyRequests);
  const [staffModifyRequests, setstaffModifyRequests] = useState<Staff[]>(prevstaffModifyRequests);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const allCastFieldsFilled = castModifyRequests.every((cast) => cast.castName && cast.castRole);

    const allStaffFieldsFilled = staffModifyRequests.every(
      (staff) => staff.staffName && staff.staffRole
    );

    setIsButtonDisabled(
      !(
        (castModifyRequests?.length <= 1 &&
          !castModifyRequests[0]?.castName &&
          !castModifyRequests[0]?.castRole &&
          !castModifyRequests[0]?.castPhoto) ||
        allCastFieldsFilled
      ) ||
        !(
          (castModifyRequests?.length <= 1 &&
            !staffModifyRequests[0]?.staffName &&
            !staffModifyRequests[0]?.staffRole &&
            !staffModifyRequests[0]?.staffPhoto) ||
          allStaffFieldsFilled
        )
    );
  }, [castModifyRequests, staffModifyRequests]);

  const handleUpdateList = (title: string, updatedList: Cast[] | Staff[]) => {
    if (title === "출연진") {
      setcastModifyRequests(updatedList as Cast[]);
    } else if (title === "스태프") {
      setstaffModifyRequests(updatedList as Staff[]);
    }
    updateGigInfo({
      castModifyRequests: castModifyRequests,
      staffModifyRequests: staffModifyRequests,
    });
  };

  const handleList = () => {
    // 모든 속성이 비어있는 객체들 필터링
    const filteredcastModifyRequests = castModifyRequests.filter(
      (cast) => cast.castName || cast.castRole || cast.castPhoto
    );
    const filteredstaffModifyRequests = staffModifyRequests.filter(
      (staff) => staff.staffName || staff.staffRole || staff.staffPhoto
    );

    updateGigInfo({
      castModifyRequests: filteredcastModifyRequests,
      staffModifyRequests: filteredstaffModifyRequests,
    });
    handleModifyManageStep();
  };

  return (
    <>
      <S.ModifyManageContainer>
        <S.BannerNoti>
          <S.StyledIcNoti width={20} />
          해당 페이지는 선택사항 입니다.
        </S.BannerNoti>
        <RoleLayout
          title="출연진"
          list={castModifyRequests}
          updateList={(list) => handleUpdateList("출연진", list)}
        />
        <S.Divider />
        <RoleLayout
          title="스태프"
          list={staffModifyRequests}
          updateList={(list) => handleUpdateList("스태프", list)}
        />
      </S.ModifyManageContainer>
      <S.FooterContainer>
        <S.FooterDivider />
        <Button onClick={handleList} disabled={isButtonDisabled}>
          다음
        </Button>
      </S.FooterContainer>
    </>
  );
};

export default ModifyManageMaker;
