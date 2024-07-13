import Button from "@components/commons/button/Button";
import RoleLayout from "./components/RoleLayout";
import * as S from "./Register.styled";
import { useEffect, useState } from "react";
import { Cast, Staff } from "./typings/gigInfo";

interface RegisterMakerProps {
  handleRegisterStep: () => void;
  updateGigInfo: (newInfo: Partial<{ castList: Cast[]; staffList: Staff[] }>) => void;
}

const RegisterMaker = ({ handleRegisterStep, updateGigInfo }: RegisterMakerProps) => {
  const [castList, setCastList] = useState<Cast[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const allCastFieldsFilled = castList.every(
      (cast) => cast.castName && cast.castRole && cast.castPhoto
    );
    const allStaffFieldsFilled = staffList.every(
      (staff) => staff.staffName && staff.staffRole && staff.staffPhoto
    );
    setIsButtonDisabled(
      !(castList.length === 0 || allCastFieldsFilled) ||
        !(staffList.length === 0 || allStaffFieldsFilled)
    );
  }, [castList, staffList]);

  const handleUpdateList = (title: string, updatedList: Cast[] | Staff[]) => {
    if (title === "출연진") {
      setCastList(updatedList as Cast[]);
    } else if (title === "스태프") {
      setStaffList(updatedList as Staff[]);
    }
  };

  const handleList = () => {
    updateGigInfo({ castList, staffList });
    handleRegisterStep();
  };
  return (
    <>
      <S.RegisterContainer>
        <RoleLayout title="출연진" updateList={(list) => handleUpdateList("출연진", list)} />
        <S.Divider />
        <RoleLayout title="스태프" updateList={(list) => handleUpdateList("스태프", list)} />
      </S.RegisterContainer>
      <S.FooterContainer>
        <S.FooterDivider />
        <S.FooterInfo>공연진 상세정보는 선택사항 입니다.</S.FooterInfo>
        <Button onClick={handleList} disabled={isButtonDisabled}>
          다음
        </Button>
      </S.FooterContainer>
    </>
  );
};

export default RegisterMaker;
