import { describe, it, expect } from "vitest";
import { getBankNameKr } from "../../../src/utils/getBankName";

describe("getBankName Utility", () => {
    it("returns correct Korean bank name for valid bank code", () => {
        expect(getBankNameKr("NH_NONGHYUP")).toBe("NH농협");
        expect(getBankNameKr("KAKAOBANK")).toBe("카카오뱅크");
        expect(getBankNameKr("KB_KOOKMIN")).toBe("KB국민");
        expect(getBankNameKr("TOSSBANK")).toBe("토스뱅크");
        expect(getBankNameKr("SHINHAN")).toBe("신한");
    });

    it("returns empty string for invalid bank code", () => {
        expect(getBankNameKr("INVALID_BANK")).toBe("");
        expect(getBankNameKr("")).toBe("");
    });
});
