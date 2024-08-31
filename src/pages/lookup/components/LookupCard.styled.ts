import styled from "styled-components";
import { IconArrowRight } from "@assets/svgs";

export const LookupCardWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 21.2rem;
  height: 18.8rem;
  padding: 1.1rem 1.6rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border-radius: 0.6rem;
`;

export const LookupTitleWrapper = styled.button`
  display: flex;
  width: 18rem;
`;

export const LookupTitle = styled.div`
  display: block;
  flex: 1;
  width: 17.3rem;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.gray_0};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
  white-space: nowrap;
  text-align: start;
  text-overflow: ellipsis;
`;

export const TitleArrowRightIcon = styled(IconArrowRight)`
  right: 0;
  display: flex;
  width: 1.8rem;
  height: 1.8rem;

  path {
    fill: ${({ theme }) => theme.colors.gray_0};
  }
`;

export const BoxDivider = styled.div`
  display: flex;
  width: 100%;

  color: ${({ theme }) => theme.colors.gray_700};

  border-top: 0.1rem solid;
`;

export const ContextLayout = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  height: 12.2rem;
`;

export const Context = styled.section`
  display: flex;
  gap: 1.2rem;
`;

export const SubTitle = styled.div`
  display: flex;
  width: 4rem;

  ${({ theme }) => theme.fonts["caption2-medi"]};
  color: ${({ theme }) => theme.colors.gray_400};
`;

export const Text = styled.div`
  display: block;
  flex: 1;
  width: 8rem;
  overflow: hidden;

  ${({ theme }) => theme.fonts["caption2-medi"]};
  color: ${({ theme }) => theme.colors.gray_0};
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const DepositLayout = styled.section`
  display: flex;
  gap: 1.3rem;
  align-items: center;
  justify-content: center;
`;

export const CheckingDeposit = styled.div`
  display: flex;

  ${({ theme }) => theme.fonts["caption2-medi"]};
  color: ${({ theme }) => theme.colors.red};
`;

export const CheckedDeposit = styled.div`
  display: flex;

  ${({ theme }) => theme.fonts["caption2-medi"]};
  color: ${({ theme }) => theme.colors.green};
`;

export const AccountLayout = styled.button`
  position: absolute;
  right: 0;
  bottom: -1.3rem;
  display: flex;
  align-items: center;
  width: 5.7rem;
  padding: 0.4rem 0.8rem;

  background-color: ${({ theme }) => theme.colors.gray_700};
  border: 1px solid ${({ theme }) => theme.colors.gray_500};
  border-radius: 0.4rem;
`;

export const Account = styled.div`
  width: 4rem;

  ${({ theme }) => theme.fonts["caption2-medi"]};

  color: ${({ theme }) => theme.colors.gray_100};
`;
