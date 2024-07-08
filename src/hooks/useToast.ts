import { useState } from "react";

const useToast = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isToastRunning, setIsToastRunning] = useState(false);

  const showToast = () => {
    if (isToastRunning) {
      return;
    }

    setIsToastRunning(true);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
      setIsToastRunning(false);
    }, 2000);
  };

  return { showToast, isToastVisible };
};

export default useToast;
