import styled from "styled-components";
import { IconTextfiedlDelete, IconImg } from "@assets/svgs";

export const AdminBannerWrapper = styled.button`
  display: flex;
  flex-direction: column;
`;

export const Notification = styled.div`
  display: flex;

  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts["body2-long"]};
`;

export const CardBanner = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: 3.2rem;
`;

export const ImgBanner = styled.button`
  position: relative;
  display: flex;
  align-self: stretch;
  width: 39.1rem;
  height: 11rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border-radius: 0.4rem;
`;

export const DeleteIcon = styled(IconTextfiedlDelete)`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  z-index: 2;
  width: 3rem;
  height: 3rem;
`;

export const ImgIcon = styled(IconImg)`
  position: absolute;
  width: 4rem;
  height: 4rem;
  margin: 3.5rem 17.5rem;
`;

export const BannerInputWarpper = styled.section`
  display: flex;
  gap: 1.1rem;
`;
