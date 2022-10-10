import React from "react";
import Post from "./Post";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Feed = () => {
  const { searchResults } = useContext(DataContext);
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
