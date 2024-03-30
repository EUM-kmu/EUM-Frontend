import { useState } from "react";

import { BottomSheet } from "@/components/common/bottom-sheet";

export const Test = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#d9d9d9",
        height: "100%",
        position: "relative",
        zIndex: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          position: "static",
          height: "30%",
          zIndex: 1,
        }}
      >
        <button onClick={() => setIsOpened(true)}>test</button>
      </div>
      <BottomSheet
        style={{ zIndex: 2 }}
        isOpened={isOpened}
        onChangeIsOpened={() => {
          setIsOpened(false);
        }}
      >
        <div style={{ height: "90px" }}>test</div>
      </BottomSheet>
    </div>
  );
};
