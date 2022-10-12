import React from "react";
import Post from "./Post";
import { useStoreState } from "easy-peasy";

const Feed = () => {
  const searchResults = useStoreState((state) => state.searchResults);

  // as we are not drilling props down we won't need posts instead we need the actual array itself
  return (
    <>
      {searchResults.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default Feed;
