import { describe, expect, it, vi } from "vitest";
import { executeTicketUpdate } from "./executeTicketUpdate";

describe("executeTicketUpdate", () => {
  it("입금 처리에 성공하면 성공 콜백만 실행한다", async () => {
    const onSuccess = vi.fn();
    const onError = vi.fn();

    await executeTicketUpdate({
      update: vi.fn().mockResolvedValue(undefined),
      onSuccess,
      onError,
    });

    expect(onSuccess).toHaveBeenCalledOnce();
    expect(onError).not.toHaveBeenCalled();
  });

  it("입금 처리에 실패하면 오류 콜백만 실행한다", async () => {
    const onSuccess = vi.fn();
    const onError = vi.fn();

    await executeTicketUpdate({
      update: vi.fn().mockRejectedValue(new Error("ticket update failed")),
      onSuccess,
      onError,
    });

    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledOnce();
  });
});
