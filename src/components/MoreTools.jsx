import React from "react";
import { useStoreState } from "easy-peasy";

const MoreTools = () => {
  const postCount = useStoreState((state) => state.postCount);

  return (
    <div className="MoreTools">
      <p>{postCount}</p>
    </div>
  );
};

export default MoreTools;
