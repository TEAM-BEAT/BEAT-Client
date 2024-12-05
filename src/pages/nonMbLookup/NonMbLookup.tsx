import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./NonMbLookup.styled";

import Button from "@components/commons/button/Button";
import InputWrapper from "./components/InputWrapper";

import { NAVIGATION_STATE } from "@constants/navigationState";
import MetaTag from "@components/commons/meta/MetaTag";
import { useHeader, useModal } from "@hooks";
import { useLazyPostGuestBookingList } from "@apis/domains/bookings/queries";

const NonMbLookup = () => {
  const navigate = useNavigate();
  const { openAlert } = useModal();
  const { setHeader } = useHeader();
  const { fetchBookingList } = useLazyPostGuestBookingList();

  const [formData, setFormData] = useState({
    name: "",
    birth: "",
    phone: "",
    password: "",
  });
  const [btnActive, setBtnActive] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // 입력 값 변경 핸들러
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 버튼 상태 활성화/비활성화
  useEffect(() => {
    const { name, birth, phone, password } = formData;
    if (name && birth.length === 6 && phone.length === 13 && password.length === 4) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }, [formData]);

  // 버튼 클릭 시 요청 실행
  const handleBtnClick = async () => {
    try {
      setIsFetching(true);

      const bookingData = await fetchBookingList(formData);

      if (bookingData) {
        navigate("/lookup", {
          state: formData,
        });
      } else {
        openAlert({
          title: "일치하는 정보가 없습니다. \n 확인 후 다시 조회해 주세요",
        });
      }
    } catch (error) {
      openAlert({
        title: "오류가 발생했습니다. 다시 시도해 주세요.",
      });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE,
      title: "비회원 예매 조회",
      leftOnClick: () => navigate("/main"),
    });
  }, [setHeader, navigate]);

  return (
    <S.NonMbLookupWrapper>
      <MetaTag title="비회원 예매 조회" />
      <InputWrapper formData={formData} onInputChange={handleInputChange} />
      <S.BtnLayout>
        <Button variant="primary" size="xlarge" disabled={!btnActive} onClick={handleBtnClick}>
          예매내역 확인하기
        </Button>
      </S.BtnLayout>
    </S.NonMbLookupWrapper>
  );
};

export default NonMbLookup;
