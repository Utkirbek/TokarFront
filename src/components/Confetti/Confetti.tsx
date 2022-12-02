import React from "react";
import Confetti from "react-confetti";

const ConfettiComponent = () => {
  const [cWindow, setCWindow] = React.useState({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setCWindow({
        width: window?.innerWidth,
        height: window?.innerHeight,
      });
    }
  }, []);
  return <Confetti width={cWindow.width} height={cWindow.height} />;
};

export default ConfettiComponent;
