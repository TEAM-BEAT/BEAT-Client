import { useEffect, useState } from "react";
import * as S from "./LinkModal.styled";
import AdminButton from "../adminButton/AdminButton";

const LinkModal = ({ updateLink, handleLinkModal, redirectUrl, isExternal, performanceId }) => {
  const [checked, setChecked] = useState(isExternal);
  const [link, setLink] = useState("");

  useEffect(() => {
    setChecked(isExternal);
    if (isExternal) {
      setLink(redirectUrl || "");
    } else {
      setLink(`${import.meta.env.VITE_CLIENT_URL}/gig/${performanceId}`);
    }
  }, [isExternal, redirectUrl]);

  const handleChecked = () => {
    setChecked(!checked);

    if (checked) {
      setLink(`${import.meta.env.VITE_CLIENT_URL}/gig/`);
    } else {
      setLink("");
    }
  };

  const redirectLink = () => {
    window.open(link, "_blank", "noopener, noreferrer");
  };

  const handleInput = (e) => {
    setLink(e.target.value);
  };

  return (
    <S.Overlay>
      <S.LinkModalWrapper>
        <S.CloseBtn
          onClick={() => {
            handleLinkModal(null);
          }}
        />
        <S.Title>캐러셀에 연결할 링크를 삽입해 주세요</S.Title>
        <S.ExternalContainer>
          <S.ExternalText>외부 링크 삽입 시 체크해 주세요.</S.ExternalText>
          <S.CheckBox type="checkbox" checked={checked} onChange={() => handleChecked()} />
        </S.ExternalContainer>
        <S.InputContainer>
          <S.TextField value={link} onChange={handleInput}></S.TextField>
          <AdminButton
            variant="gray"
            onClick={() => {
              redirectLink();
            }}
          >
            링크 확인
          </AdminButton>
        </S.InputContainer>
        <S.SaveBtn
          onClick={() => {
            updateLink(link);
            // TODO : 현재 저장하기 버튼 눌러서 저장하면 리렌더링 다시 안 됨
            handleLinkModal();
          }}
        >
          저장하기
        </S.SaveBtn>
      </S.LinkModalWrapper>
    </S.Overlay>
  );
};

export default LinkModal;
