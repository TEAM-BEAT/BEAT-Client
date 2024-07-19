declare global {
  interface Window {
    opera?: unknown;
    MSStream?: unknown;
  }
}

export const getDeviceType = (): string => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (typeof userAgent === "string") {
    if (/android/i.test(userAgent)) {
      return "Android";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }
  }

  return "Desktop";
};
