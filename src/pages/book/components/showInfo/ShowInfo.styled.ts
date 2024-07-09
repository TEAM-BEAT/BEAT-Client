import { Generators } from "@styles/generator";
import styled from "styled-components";

export const ShowInfoWrapper = styled.section`
  ${Generators.flexGenerator("column", "center", "flex-start")};
`;

export const Poster = styled.img<{ $imgsrc: string }>`
  width: 14.7rem;
  height: 19.8rem;
  margin: 1.2rem 0;

  background-image: url(${({ $imgsrc }) => $imgsrc});
  background-size: 100% 100%;
  border-radius: 4px;
`;

export const Title = styled.h1`
  margin-bottom: 1.2rem;

  ${({ theme }) => theme.fonts.heading2};
  color: ${({ theme }) => theme.colors.white};
`;

export const Price = styled.p`
  display: inline;

  ${({ theme }) => theme.fonts.heading4};
  color: ${({ theme }) => theme.colors.white};
`;

export const PriceUnit = styled.span`
  margin-left: 0.2rem;

  ${({ theme }) => theme.fonts["caption1-semi"]};
  color: ${({ theme }) => theme.colors.white};
`;

export const PlaceTimeWrapper = styled.section`
  ${Generators.flexGenerator("column", "flex-start", "")};
  gap: 1.4rem;
  margin: 2.4rem 0;
  padding: 1.4rem 1.2rem 1.8rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border-radius: 6px;
`;

export const IconTextTimeContainer = styled.div`
  ${Generators.flexGenerator("row", "center", "space-between")};
  gap: 0.8rem;
  min-width: 30.3rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const RunningTimeText = styled.span`
  margin-right: 0.8rem;
`;

export const Divider = styled.div`
  width: 30.3rem;
  height: 0.1rem;

  background-color: ${({ theme }) => theme.colors.gray_700};
`;

export const ScheduleListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 0 3.1rem;
`;

export const EpisodeBox = styled.p`
  display: flex;
  gap: 6px;
  align-items: center;
  align-self: stretch;
`;

export const EpisodeText = styled.span`
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
  color: ${({ theme }) => theme.colors.gray_500};
`;
