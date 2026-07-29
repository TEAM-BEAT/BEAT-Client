import { put } from "@apis/index";
import { describe, expect, it, vi } from "vitest";
import { putTicketUpdate, TicketUpdateRequest } from "./api";

vi.mock("@apis/index", () => ({
  get: vi.fn(),
  patch: vi.fn(),
  put: vi.fn(),
}));

describe("putTicketUpdate", () => {
  it("입금 처리 요청이 실패하면 오류를 호출부로 전파한다", async () => {
    const error = new Error("ticket update failed");
    vi.mocked(put).mockRejectedValueOnce(error);

    await expect(putTicketUpdate({} as TicketUpdateRequest)).rejects.toBe(error);
  });
});
