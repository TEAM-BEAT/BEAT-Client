import { Generators } from "@styles/generator";
import styled from "styled-components";

export const CancelLayout = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.6rem 2.4rem;
`;

export const PerformWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: flex-start;
  width: 32.7rem;
  padding: 1.6rem;

  background: ${({ theme }) => theme.colors.gray_900};
  border: 1px solid ${({ theme }) => theme.colors.gray_700};
  border-radius: 6px;
`;

export const PerformBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;

  p {
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts["body1-normal-semi"]}
  }

  table {
    width: 100%;

    border-collapse: separate;
    border-spacing: 0.4rem 0.4rem;
  }

  tr {
    width: 100%;
    height: 2rem;
  }

  th,
  td {
    color: ${({ theme }) => theme.colors.gray_200};
    text-align: left;
    vertical-align: middle;
    ${({ theme }) => theme.fonts["body2-normal-medi"]};
  }

  th {
    width: 4rem;

    color: ${({ theme }) => theme.colors.gray_400};
  }
`;

export const PriceBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 2.4rem;

  p:first-child {
    color: ${({ theme }) => theme.colors.pink_300};
    ${({ theme }) => theme.fonts["body1-normal-semi"]};
  }

  p:last-child {
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts["body1-normal-medi"]};
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 12px;

  background-color: ${({ theme }) => theme.colors.gray_600};
`;

export const Title = styled.h2`
  width: 100%;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts["heading4"]}
`;

export const RadioWrapper = styled.div`
  ${Generators.flexGenerator("column")}
  gap: 1.4rem;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 2.4rem;
`;

export const ToastBox = styled.div`
  ${Generators.flexGenerator()}
`;
