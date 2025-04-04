import { describe, it, expect } from "vitest";
import {
    numericFilter,
    phoneNumberFilter,
    priceFilter,
    nameFilter,
    splitGraphemes,
} from "../../../src/utils/useInputFilter";

describe("Input Filter Utilities", () => {
    describe("numericFilter", () => {
        it("should filter out non-numeric characters", () => {
            expect(numericFilter("abc123")).toBe("123");
            expect(numericFilter("123-456-789")).toBe("123456789");
            expect(numericFilter("$100,000")).toBe("100000");
            expect(numericFilter("")).toBe("");
            expect(numericFilter("abc")).toBe("");
            expect(numericFilter("1a2b3c")).toBe("123");
        });
    });

    describe("phoneNumberFilter", () => {
        it("should format phone numbers correctly", () => {
            expect(phoneNumberFilter("12345678901")).toBe("123-4567-8901");
            expect(phoneNumberFilter("1234567")).toBe("123-4567");
            expect(phoneNumberFilter("123")).toBe("123");
            expect(phoneNumberFilter("12")).toBe("12");
            expect(phoneNumberFilter("010-1234-5678")).toBe("010-1234-5678");
            expect(phoneNumberFilter("abc01012345678")).toBe("010-1234-5678");
        });
    });

    describe("priceFilter", () => {
        it("should format prices with thousands separators", () => {
            expect(priceFilter("1000")).toBe("1,000");
            expect(priceFilter("1000000")).toBe("1,000,000");
            expect(priceFilter("123")).toBe("123");
            expect(priceFilter("0")).toBe("0");
            expect(priceFilter("")).toBe("");
            expect(priceFilter("abc1000")).toBe("1,000");
            expect(priceFilter("1,000,000")).toBe("1,000,000");
        });
    });

    describe("nameFilter", () => {
        it("should filter out non-alphabetic and non-Korean characters", () => {
            expect(nameFilter("홍길동")).toBe("홍길동");
            expect(nameFilter("홍길동123")).toBe("홍길동");
            expect(nameFilter("John Doe")).toBe("JohnDoe");
            expect(nameFilter("John123")).toBe("John");
            expect(nameFilter("123!@#")).toBe("");
            expect(nameFilter("홍길동 John")).toBe("홍길동John");
        });
    });

    describe("splitGraphemes", () => {
        it("should split string into grapheme clusters", () => {
            expect(splitGraphemes("abc")).toEqual(["a", "b", "c"]);
            expect(splitGraphemes("가나다")).toEqual(["가", "나", "다"]);

            // 이모지 테스트 (단일 코드 포인트로 표현되는 이모지)
            expect(splitGraphemes("👍")).toEqual(["👍"]);

            // 조합된 이모지 (여러 코드 포인트로 표현되는 이모지)
            expect(splitGraphemes("👨‍👩‍👧‍👦")).toEqual(["👨‍👩‍👧‍👦"]);

            // 혼합된 문자열
            expect(splitGraphemes("안녕👋세상🌎")).toEqual(["안", "녕", "👋", "세", "상", "🌎"]);
        });
    });
});
