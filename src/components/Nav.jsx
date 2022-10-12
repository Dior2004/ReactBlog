import { React, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

const Nav = () => {
  const posts = useStoreState((state) => state.posts);
  const search = useStoreState((state) => state.search);
  const setSearch = useStoreActions((actions) => actions.setSearch);
  const setSearchResults = useStoreActions(
    (actions) => actions.setSearchResults
  );
  const setTitle = useStoreActions((actions) => actions.setTitle);
  const location = useLocation();
  const navigateBack = useNavigate();

  // search function

  useEffect(() => {
    const filteredSearchResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.datetime.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredSearchResults.reverse());
  }, [posts, search, setSearchResults]);

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
