import { BOOKING_STATUS } from "../../../../src/constants/bookingStatus";
import { isFormValid, requiresRefund } from "../../../../src/pages/cancel/utils";
import { describe, expect, it } from "vitest";

describe("예매 취소 폼", () => {
  describe("requiresRefund", () => {
    it("유료 예매 확정 상태는 입금 여부 선택 없이 환불이 필요하다", () => {
      expect(requiresRefund(null, BOOKING_STATUS.BOOKING_CONFIRMED, 20000)).toBe(true);
    });

    it("유료 입금 확인 중 상태에서 입금 전을 선택하면 환불이 필요하지 않다", () => {
      expect(requiresRefund(false, BOOKING_STATUS.CHECKING_PAYMENT, 20000)).toBe(false);
    });

    it("유료 입금 확인 중 상태에서 입금 완료를 선택하면 환불이 필요하다", () => {
      expect(requiresRefund(true, BOOKING_STATUS.CHECKING_PAYMENT, 20000)).toBe(true);
    });

    it("무료 예매는 예매 확정 상태여도 환불이 필요하지 않다", () => {
      expect(requiresRefund(null, BOOKING_STATUS.BOOKING_CONFIRMED, 0)).toBe(false);
    });
  });

  describe("isFormValid", () => {
    it("유료 예매 확정 상태는 환불 계좌를 모두 입력해야 한다", () => {
      expect(isFormValid(null, "", "", "", BOOKING_STATUS.BOOKING_CONFIRMED, 20000)).toBe(false);
      expect(
        isFormValid(
          null,
          "KAKAOBANK",
          "1234567890",
          "비트",
          BOOKING_STATUS.BOOKING_CONFIRMED,
          20000
        )
      ).toBe(true);
    });

    it("유료 입금 확인 중 상태는 입금 여부를 선택해야 한다", () => {
      expect(isFormValid(null, "", "", "", BOOKING_STATUS.CHECKING_PAYMENT, 20000)).toBe(false);
      expect(isFormValid(false, "", "", "", BOOKING_STATUS.CHECKING_PAYMENT, 20000)).toBe(true);
    });

    it("유료 입금 확인 중 상태에서 입금 완료를 선택하면 환불 계좌를 모두 입력해야 한다", () => {
      expect(isFormValid(true, "", "", "", BOOKING_STATUS.CHECKING_PAYMENT, 20000)).toBe(false);
      expect(
        isFormValid(true, "KAKAOBANK", "1234567890", "비트", BOOKING_STATUS.CHECKING_PAYMENT, 20000)
      ).toBe(true);
    });

    it("무료 예매는 환불 계좌 없이 취소할 수 있다", () => {
      expect(isFormValid(null, "", "", "", BOOKING_STATUS.BOOKING_CONFIRMED, 0)).toBe(true);
    });
  });
});
