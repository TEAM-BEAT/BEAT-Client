import loading from "@assets/lottie/loading.json";
import Lottie from "react-lottie-player";

const LoadingAnimation = () => {
  return <Lottie animationData={loading} play={true} style={{ width: "150px", height: "150px" }} />;
};

export default LoadingAnimation;
