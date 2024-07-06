import React from "react";

import * as S from "./ContentBoxStyle";
import { contentBoxPropsTypes } from "../../../types/contextBoxPropsTypes";

const ContentBox = ({ className, children, ...rest }: contentBoxPropsTypes) => {
  return <S.ContentBoxWrapper></S.ContentBoxWrapper>;
};

export default ContentBox;
