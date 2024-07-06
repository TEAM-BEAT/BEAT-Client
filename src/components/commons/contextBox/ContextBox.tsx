import React from "react";

import * as S from "./ContextBoxStyle";
import { contextBoxPropsTypes } from "../../../types/contextBoxPropsTypes";

const ContextBox = ({ className, padding, children, ...rest }: contextBoxPropsTypes) => {
  return (
    <S.ContextBoxWrapper>
      <S.ContextBoxLayout padding={padding} gap="1.2rem">
        {children}
      </S.ContextBoxLayout>
    </S.ContextBoxWrapper>
  );
};

export default ContextBox;
