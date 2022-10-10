import React from "react";
import { BiLoaderAlt } from "react-icons/bi";
// import loaderIcon from "../images/icons8-loading-sign-96.png";

const Loader = () => {
  return (
    <>
      <div className="loader">
        {/* <img
          style={{ width: "100%", height: "100%" }}
          src={loaderIcon} // giving an img its path like so
          alt="loader"
        /> */}
        <BiLoaderAlt style={{ color: "#34495ecc", fontSize: 65 }} />
      </div>
      <p style={{ textAlign: "center" }}>Loading...</p>
    </>
  );
};

export default Loader;
