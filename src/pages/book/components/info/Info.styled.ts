import styled from "styled-components";

export const InfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  margin-top: 1.6rem;
`;

export const InfoTop = styled.div`
  display: flex;
`;

export const InfoPoster = styled.img<{ $imgsrc: string }>`
  width: 9.5rem;
  height: 12.8rem;
  margin-right: 1.4rem;

  background-image: url(${({ $imgsrc }) => $imgsrc});
  background-size: 100% 100%;
  border-radius: 4px;
`;

export const InfoTextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoType = styled.p`
  color: ${({ theme }) => theme.colors.gray_500};
  ${({ theme }) => theme.fonts["caption1-semi"]};
`;

export const InfoTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts["body1-normal-semi"]};
`;

export const InfoTeamText = styled.span`
  margin-right: 0.6rem;

  color: ${({ theme }) => theme.colors.gray_400};

  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const InfoTeamName = styled.span`
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const InfoBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
