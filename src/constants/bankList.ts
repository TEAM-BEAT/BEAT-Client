import {
  IconBnk,
  IconHanna,
  IconIbk,
  IconIm,
  IconKabank,
  IconKb,
  IconNonghyup,
  IconSaemauel,
  IconSc,
  IconShinhan,
  IconShinhyup,
  IconSoohyup,
  IconToss,
  IconWoochaegook,
  IconWoori,
} from "@assets/svgs";

export const BANK_LIST = [
  {
    id: 1,
    name: "NH_NONHYUP",
    nameKr: "NH농협",
    bankImg: IconNonghyup,
  },
  {
    id: 2,
    name: "KAKAOBANK",
    nameKr: "카카오뱅크",
    bankImg: IconKabank,
  },
  {
    id: 3,
    name: "KB_KOOKMIN",
    nameKr: "KB국민",
    bankImg: IconKb,
  },
  {
    id: 4,
    name: "TOSSBANK",
    nameKr: "토스뱅크",
    bankImg: IconToss,
  },
  {
    id: 5,
    name: "SHINHAN",
    nameKr: "신한",
    bankImg: IconShinhan,
  },
  {
    id: 6,
    name: "WOORI",
    nameKr: "우리",
    bankImg: IconWoori,
  },
  {
    id: 7,
    name: "IBK_GIUP",
    nameKr: "IBK기업",
    bankImg: IconIbk,
  },
  {
    id: 8,
    name: "HANA",
    nameKr: "하나",
    bankImg: IconHanna,
  },
  {
    id: 9,
    name: "SAEMAUL",
    nameKr: "새마을",
    bankImg: IconSaemauel,
  },
  {
    id: 10,
    name: "BUSAN",
    nameKr: "부산",
    bankImg: IconBnk,
  },
  {
    id: 11,
    name: "IMBANK_DAEGU",
    nameKr: "IM뱅크(대구)",
    bankImg: IconIm,
  },
  {
    id: 12,
    name: "SINHYEOP",
    nameKr: "신협",
    bankImg: IconShinhyup,
  },
  {
    id: 13,
    name: "WOOCHAEGUK",
    nameKr: "우체국",
    bankImg: IconWoochaegook,
  },
  {
    id: 14,
    name: "SCJEIL",
    nameKr: "SC제일",
    bankImg: IconSc,
  },
  {
    id: 15,
    name: "SUHYEOP",
    nameKr: "수협",
    bankImg: IconSoohyup,
  },
];

export type BankListTypes = typeof BANK_LIST;
