import { useEffect } from "react";

const ScrollToTop = ({ trigger }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [trigger]);

  return null;
};

export default ScrollToTop;
