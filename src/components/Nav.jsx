import { React, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Nav = () => {
  const { setTitle, search, setSearch, navigateBack } = useContext(DataContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/post") {
      setTitle("Post");
    } else if (location.pathname === "/about") {
      setTitle("About");
    } else if (location.pathname.includes("/postpage")) {
      setTitle("Post View");
    } else if (location.pathname.includes("/postedit")) {
      setTitle("Post Edit");
    } else {
      setTitle("Home");
    }
  }, [location, setTitle]);

  return (
    <nav className="Nav">
      <div className="wrap">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            id="search"
            type="text"
            placeholder="Search Posts"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (search.length > -1) navigateBack("/");
            }}
          />
          <button>
            <FiSearch style={{ cursor: "pointer" }} />
          </button>
        </form>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/post">Post</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
