import styled from "styled-components";
import { BtnModalDelete } from "@assets/svgs";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  background-color: rgb(0 0 0 / 70%);
`;

export const LinkModalWrapper = styled.section`
  position: absolute;
  z-index: 5;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  width: 51.8rem;
  height: 33.8rem;
  padding: 4.8rem 3.2rem 4rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border-radius: 1.2rem;
`;

export const CloseBtn = styled(BtnModalDelete)`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  width: 4rem;
  height: 4rem;
`;

export const Title = styled.div`
  display: flex;

  ${({ theme }) => theme.fonts.heading1};
  color: ${({ theme }) => theme.colors.white};
`;

export const ExternalContainer = styled.section`
  display: flex;
  gap: 20rem;
  margin: 2rem 0;
`;

export const ExternalText = styled.div`
  display: flex;
  ${({ theme }) => theme.fonts.heading4};

  color: ${({ theme }) => theme.colors.gray_300};
`;

export const CheckBox = styled.input`
  display: flex;
  width: 1.8rem;
  height: 1.8rem;

  border: 0.1rem solid;
  border-color: ${({ theme }) => theme.colors.gray_500};
  border-radius: 0.2rem;

  &:checked {
    background-color: ${({ theme }) => theme.colors.pink_400};
    background-repeat: no-repeat;
    border-color: transparent;
  }
`;

export const InputContainer = styled.section`
  display: flex;
  gap: 0.9rem;
  align-items: center;
`;

export const TextField = styled.input`
  display: flex;
  align-items: center;
  width: 36.1rem;
  height: 6.4rem;
  padding: 2rem;

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.gray_900};
  border: 0.2rem solid;
  border-color: ${({ theme }) => theme.colors.gray_600};
  border-radius: 0.8rem;

  ${({ theme }) => theme.fonts.heading4};
`;

export const SaveBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45.4rem;
  height: 6.4rem;
  margin-top: 2.4rem;
  padding: 1.8rem 2.4rem;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.heading3};
  background-color: ${({ theme }) => theme.colors.pink_400};
  border-radius: 6px;
`;
