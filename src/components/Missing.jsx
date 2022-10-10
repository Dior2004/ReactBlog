import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <main className="Missing">
      <div className="wrap">
        <h2>Page isn't found</h2>
        <p className="post_body">Well, that is disappointing 😞</p>
        <p>
          Visit our{" "}
          <Link to="/">
            <b style={{ color: "dodgerblue" }}>Home Page.</b>
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Missing;
