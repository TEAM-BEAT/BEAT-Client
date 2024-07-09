import { IconNh } from "@assets/svgs";
import SvgIconArrowDown from "@assets/svgs/IconArrowDown";
import styled from "styled-components";

// BankBottomSheet
export const BankLayout = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;

  display: block;
  width: 100%;
  padding: 4rem 2.4rem 4.5rem;

  background: ${({ theme }) => theme.colors.gray_800};
  border-radius: 20px 20px 0 0;
`;

export const BankTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.heading4}
`;

export const BankWrapper = styled.article`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
`;

export const OutLayout = styled.div`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
`;

// BankBtn
export const BankBtnWrapper = styled.button`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  align-items: center;
  width: 10.2rem;
  height: 10.2rem;
  padding: 1.7rem 0 1.2rem;

  background: ${({ theme }) => theme.colors.gray_700};
  border-radius: 6px;
`;

export const BankImg = styled(IconNh)`
  width: 4rem;
  height: 4rem;
`;

export const BankName = styled.p`
  color: ${({ theme }) => theme.colors.gray_0};
  ${({ theme }) => theme.fonts["caption1-medi"]};
`;

// InputBank
export const InputBank = styled.div`
  position: relative;
  width: 32.7rem;
  height: 4.8rem;
  padding: 1.2rem 1.6rem;

  color: ${({ theme }) => theme.colors.gray_600};

  background: ${({ theme }) => theme.colors.gray_800};
  border-radius: 6px;

  ${({ theme }) => theme.fonts["body2-normal-medi"]}
`;

export const ToggleIcon = styled(SvgIconArrowDown)`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  width: 2.4rem;

  cursor: pointer;
`;

// InputAccountWrapper
export const InputAccountWrapper = styled.section`
  width: 100%;
`;

export const InputAccountLabel = styled.label`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts["body1-normal-semi"]}
`;
