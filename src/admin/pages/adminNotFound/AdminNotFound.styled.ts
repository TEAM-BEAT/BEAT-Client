import { Empty } from "@assets/svgs";
import styled from "styled-components";

export const AdminNotFoundWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 144rem;
  height: 96rem;

  background-color: ${({ theme }) => theme.colors.black};
`;

export const EmptyIcon = styled(Empty)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 10rem;
  margin-top: 31rem;
  padding: 0.8rem;
`;

export const Text = styled.div`
  display: flex;
  margin: 1rem 0 3.2rem;

  ${({ theme }) => theme.fonts.heading4};
  color: ${({ theme }) => theme.colors.gray_300};
`;
