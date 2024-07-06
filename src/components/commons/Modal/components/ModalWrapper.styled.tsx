import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 27.9rem;
  padding: 40px 16px 16px;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border-radius: 6px;
`;

export const ModalTextWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
`;

export const ModalTitle = styled.span`
  ${({ theme }) => theme.fonts.heading4};
  color: ${({ theme }) => theme.colors.white};
`;

export const ModalSubTitle = styled.span`
  ${({ theme }) => theme.fonts.body2Normal};
  color: ${({ theme }) => theme.colors.gray_300};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
