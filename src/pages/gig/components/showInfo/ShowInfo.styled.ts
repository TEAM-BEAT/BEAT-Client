import { ButtonDelete24 } from "@assets/svgs";
import { Generators } from "@styles/generator";
import styled from "styled-components";

export const ShowInfoWrapper = styled.section`
  ${Generators.flexGenerator("column", "center", "flex-start")};
`;

export const Poster = styled.img`
  width: 14.7rem;
  height: 19.8rem;
  margin: 1.2rem 0;
  object-fit: cover;
  object-position: center;

  cursor: pointer;
  border-radius: 4px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  ${Generators.flexGenerator("column")};

  background-color: rgb(15 15 15 / 70%);
`;

export const CloseBtn = styled.section`
  position: absolute;
  top: 1.6rem;
  width: 37rem;

  ${Generators.flexGenerator("row", "center", "end")};
  cursor: pointer;
`;

export const CloseIcon = styled(ButtonDelete24)`
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 1.3rem;
`;

export const ModalContent = styled.img`
  max-width: 37rem;
`;

export const Title = styled.h1`
  margin-bottom: 0.6rem;

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
  padding: 1.4rem 1.2rem 1.6rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border-radius: 6px;
`;

export const IconTextTimeContainer = styled.div`
  ${Generators.flexGenerator("column", "flex-start")};
  gap: 0.8rem;
  min-width: 30.3rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const IconTextTimeBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  gap: 0.6rem;
  padding: 0 3.1rem;
`;

export const EpisodeBox = styled.p`
  display: flex;
  align-items: center;
  align-self: stretch;

  ${({ theme }) => theme.fonts["body2-normal-medi"]};
  color: ${({ theme }) => theme.colors.gray_500};
`;

export const EpisodeText = styled.span`
  min-width: 4rem;
`;
