import React from "react";
import Feed from "./Feed";
import Loader from "./Loader";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Home = () => {
  const { searchResults, search, fetchError, loader } = useContext(DataContext);

  return (
    <main className="Home">
      {!fetchError ? (
        searchResults.length ? (
          loader ? (
            <div className="wrap">
              <Feed />
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
