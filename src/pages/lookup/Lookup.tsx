import * as S from "./Lookup.styled";
import { dummyData } from "./dummyData";

import NonExistent from "./components/nonExistent/NonExistent";
import LookupWrapper from "./components/LookupWrapper";

const Lookup = () => {
  return (
    <S.LookupWrapper>
      {dummyData.length ? <LookupWrapper></LookupWrapper> : <NonExistent></NonExistent>}
    </S.LookupWrapper>
  );
};

export default Lookup;
