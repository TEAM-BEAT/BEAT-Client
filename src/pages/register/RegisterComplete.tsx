import Lottie from "react-lottie-player";
import registerComplete from "@assets/lottie/register-complete.json";

const RegisterComplete = () => {
  return (
    <>
      <Lottie loop animationData={registerComplete} play={true} />
    </>
  );
};

export default RegisterComplete;
