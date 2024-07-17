import { BANK_LIST } from "@constants/bankList";
import React from "react";

export const getBankNameKr = (name: string): string => {
  const BANK_MAP = BANK_LIST.reduce(
    (acc, bank) => {
      acc[bank.name] = bank;
      return acc;
    },
    {} as Record<
      string,
      { id: number; name: string; nameKr: string; bankImg: React.FC<React.SVGProps<SVGSVGElement>> }
    >
  );

  const bank = BANK_MAP[name];
  return bank ? bank.nameKr : "";
};
