import Button from "@components/commons/button/Button";
import RoleLayout from "./components/RoleLayout";
import * as S from "./Register.styled";
import { useEffect, useState } from "react";
import { Cast, Staff } from "./typings/gigInfo";
import Spacing from "@components/commons/spacing/Spacing";

interface RegisterMakerProps {
  castList: Cast[];
  staffList: Staff[];
  handleRegisterStep: () => void;
  updateGigInfo: (newInfo: Partial<{ castList: Cast[]; staffList: Staff[] }>) => void;
}

const RegisterMaker = ({
  castList: prevCastList,
  staffList: prevStaffList,
  handleRegisterStep,
  updateGigInfo,
}: RegisterMakerProps) => {
  const [castList, setCastList] = useState<Cast[]>(prevCastList);
  const [staffList, setStaffList] = useState<Staff[]>(prevStaffList);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const allCastFieldsFilled = castList.every((cast) => cast.castName && cast.castRole);

    const allStaffFieldsFilled = staffList.every((staff) => staff.staffName && staff.staffRole);

    setIsButtonDisabled(
      !(
        (castList.length <= 1 &&
          !castList[0]?.castName &&
          !castList[0]?.castRole &&
          !castList[0]?.castPhoto) ||
        allCastFieldsFilled
      ) ||
        !(
          (castList.length <= 1 &&
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
    updateGigInfo({ castList, staffList });
  };

  const handleList = () => {
    // 모든 속성이 비어있는 객체들 필터링
    const filteredCastList = castList.filter(
      (cast) => cast.castName || cast.castRole || cast.castPhoto
    );
    const filteredStaffList = staffList.filter(
      (staff) => staff.staffName || staff.staffRole || staff.staffPhoto
    );

    updateGigInfo({ castList: filteredCastList, staffList: filteredStaffList });
    handleRegisterStep();
  };

  return (
    <>
      <S.RegisterContainer>
        <S.BannerNoti>
          <S.StyledIcNoti width={20} />
          해당 페이지는 선택사항 입니다.
        </S.BannerNoti>
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
      </S.RegisterContainer>
      <S.FooterContainer>
        <Button onClick={handleList} disabled={isButtonDisabled}>
          다음
        </Button>
      </S.FooterContainer>
    </>
  );
};

export default RegisterMaker;
