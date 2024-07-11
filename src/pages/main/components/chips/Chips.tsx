import { useState, useEffect } from "react";
import * as S from "./Chips.styled";

import Chip from "@components/commons/chip/Chip";
import { CHIP_LIST } from "@pages/main/constants/chipList";

const Chips = ({ handleGenre }: { handleGenre: (value: string) => void }) => {
  const [chipState, setChipState] = useState("ALL");

  return (
    <S.ChipsWrapper>
      <S.ChipsLayout>
        <Chip
          label="전체"
          color={chipState === "ALL" ? "white" : "gray"}
          onClick={() => {
            handleGenre("ALL");
            setChipState("ALL");
          }}
        />
        {CHIP_LIST.map((item) => {
          const GenreIcon = item.icon ? item.icon : () => <></>;
          return (
            <Chip
              key={item.genre} // key 세팅하기!!
              label={item.label}
              color={chipState === item.genre ? "white" : "gray"}
              icon={<GenreIcon />}
              iconColor={chipState === item.genre ? "pink" : "gray"}
              onClick={() => {
                handleGenre(item.genre);
                setChipState(item.genre);
              }}
            />
          );
        })}
      </S.ChipsLayout>
    </S.ChipsWrapper>
  );
};

export default Chips;
