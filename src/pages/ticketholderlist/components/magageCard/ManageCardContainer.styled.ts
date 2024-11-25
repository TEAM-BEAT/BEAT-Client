import styled, { css } from "styled-components";

export const ManageCardWrapper = styled.section`
  display: flex;
  width: 100%;
  height: 10rem;
`;

export const InfoBox = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1.6rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border-radius: 0.6rem;
`;

export const StatusBox = styled.section<{ $status: string }>`
  display: flex;
  justify-content: center;
  min-width: 7.5rem;
  height: 100%;
  margin-left: 0.2rem;
  padding: 4.2rem 1.6rem;

  ${({ $status }) => {
    switch ($status) {
      case "미입금":
        return css`
          color: ${({ theme }) => theme.colors.pink_200};
        `;
      case "입금 완료":
        return css`
          color: ${({ theme }) => theme.colors.gray_400};
        `;
      case "취소 완료":
        return css`
          color: ${({ theme }) => theme.colors.gray_400};
        `;
      case "환불 요청":
        return css`
          color: ${({ theme }) => theme.colors.red};
        `;
    }
  }}

  ${({ theme }) => theme.fonts["caption2-semi"]};

  background-color: ${({ theme }) => theme.colors.gray_800};
  border-radius: 0.6rem;
`;

export const TextContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const InfoText = styled.div`
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
  color: ${({ theme }) => theme.colors.white};
`;

export const DateText = styled.div`
  ${({ theme }) => theme.fonts["caption1-medi"]};
  color: ${({ theme }) => theme.colors.gray_400};
`;
