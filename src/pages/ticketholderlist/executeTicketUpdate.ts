interface TicketUpdateCallbacks {
  update: () => Promise<unknown>;
  onSuccess: () => void;
  onError: () => void;
}

export const executeTicketUpdate = async ({
  update,
  onSuccess,
  onError,
}: TicketUpdateCallbacks) => {
  try {
    await update();
    onSuccess();
  } catch {
    onError();
  }
};
