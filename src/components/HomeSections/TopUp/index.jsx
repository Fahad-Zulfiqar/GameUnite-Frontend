import { useEffect } from "react";
import { useClickOutside } from "react-click-outside-hook";

import "./style.css";

function TopUp({ setIsExpanded }) {
  const [parentRef, hasClickedOutside] = useClickOutside();

  useEffect(() => {
    if (hasClickedOutside) setIsExpanded(false);
  }, [hasClickedOutside]);

  return (
    <>
      <div className="genre-biggerBox">
        <div className="grid innerBox" ref={parentRef}></div>
      </div>
    </>
  );
}

export default TopUp;
