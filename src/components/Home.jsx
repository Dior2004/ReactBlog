import React from "react";
import Feed from "./Feed";
import Loader from "./Loader";
import MoreTools from "./MoreTools";
import { useStoreState } from "easy-peasy";

const Home = () => {
  const searchResults = useStoreState((state) => state.searchResults);
  const search = useStoreState((state) => state.search);
  const fetchError = useStoreState((state) => state.fetchError);
  const loader = useStoreState((state) => state.loader);

  return (
    <main className="Home">
      {!fetchError ? (
        searchResults.length ? (
          loader ? (
            <div className="wrap">
              <div className="container">
                <Feed />
              </div>
              <MoreTools />
            </div>
          ) : (
            <Loader />
          )
        ) : loader ? (
          <p style={{ textAlign: "center", marginTop: 16 }}>
            {!searchResults.length && search
              ? "No match is found"
              : "No posts to display yet"}
          </p>
        ) : (
          <Loader />
        )
      ) : (
        <>
          <p
            style={{
              textAlign: "center",
              marginTop: 16,
              padding: "0 30px",
              color: "#f43308f6",
            }}
          >
            {fetchError} 🙁
          </p>
          <p style={{ textAlign: "center" }}>
            Please try to reload the page <br /> after sometime
          </p>
        </>
      )}
    </main>
  );
};

export default Home;
