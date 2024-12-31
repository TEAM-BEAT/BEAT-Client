import { useToast } from "@hooks";
import { useState } from "react";

interface ToastConfigProps {
  message: string;
  isTop: boolean;
}

//top & bottom, 혹은 메세지를 변경해야하는 경우 사용해야하는 훅
const useToastHandler = () => {
  const { showToast, isToastVisible } = useToast();
  const [toastConfig, setToastConfig] = useState<ToastConfigProps>({
    message: "클립보드에 복사되었습니다!",
    isTop: true,
  });

  //토스트 메세지, 위치를 정하는 유틸 함수
  const handleToastVisible = (message: string, position: "top" | "bottom") => {
    const isTop = position === "top" ? true : false;
    setToastConfig({ message, isTop });
    showToast();
  };

  /*
  toastConfig: Toast 속성에 사용,
  isToastVisible : Toast의 isVisible 속성에 사용
  handleToastVisible : Toast를 사용하기 위한 함수
  */
  return { toastConfig, isToastVisible, handleToastVisible };
};

export default useToastHandler;
