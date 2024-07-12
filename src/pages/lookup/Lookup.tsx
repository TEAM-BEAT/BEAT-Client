import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks/useHeader";
import { useEffect } from "react";

const Lookup = () => {
  const { setHeader } = useHeader();

  const handleLeftBtn = () => {
    alert("왼쪽 버튼 클릭!");
  };
  const handleRightBtn = () => {
    alert("오른쪽 버튼 클릭!");
  };
  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE_ICON,
      title: "헤더 테스트!",
      subText: "굿",
      leftOnClick: handleLeftBtn,
      rightOnClick: handleRightBtn,
    });
  }, [setHeader]);
  return <div>Lookup</div>;
};

export default Lookup;
