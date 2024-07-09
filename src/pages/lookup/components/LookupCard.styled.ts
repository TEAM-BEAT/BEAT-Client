import styled from "styled-components";

export const LookupCardWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 21.4rem;
  height: 19.8rem;
  padding: 2rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border-radius: 0.6rem;
`;

export const LookupTitle = styled.h1`
  display: flex;

  color: ${({ theme }) => theme.colors.gray_0};

  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const BoxDivider = styled.div`
  display: flex;
  width: 100%;

  color: ${({ theme }) => theme.colors.gray_700};

  border-top: 0.1rem solid;
`;

export const ContextLayout = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  height: 12.2rem;
`;

export const Context = styled.section`
  display: flex;
  gap: 1.2rem;
`;

export const SubTitle = styled.div`
  display: flex;

  ${({ theme }) => theme.fonts["caption2-medi"]};
  color: ${({ theme }) => theme.colors.gray_400};
`;

export const Text = styled.div`
  display: flex;

  ${({ theme }) => theme.fonts["caption2-medi"]};
  color: ${({ theme }) => theme.colors.gray_0};
`;
