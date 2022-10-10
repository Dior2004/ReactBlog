// instead of drilling props down we will use useContext hook

import { createContext, useState, useEffect } from "react";
import apiPosts from "../api/posts";
import { useNavigate } from "react-router-dom";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  // we have exported directly

  // here are only states and functions which are needed in more then one component

  const [title, setTitle] = useState("Home");
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigateBack = useNavigate(); // function from react-router-dom

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // axios is used like crud we use the same word such as .get
        const response = await apiPosts.get("/posts"); // posts is the name given to an array in our db.json
        //  we don't need to check for status errors like if(!responce.ok) {}. It automatically does that for us, and no need to JSON
        setPosts(response.data); // we just need to what to get from that response
        // console.log(response); // result is like {data: [], status: num, statusText: string, config: {...}, ...}
        setLoader(true);
      } catch (error) {
        setFetchError(`Erroe: ${error.message}`);
      }
    };
    fetchPosts();
  }, []);

  // search function

  useEffect(() => {
    const filteredSearchResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.datetime.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredSearchResults.reverse());
  }, [posts, search]);

  // delete axios CRUD => D == "DELETE"

  const handleDelete = async (id) => {
    try {
      await apiPosts.delete(`/posts/${id}`);
      const postLists = posts.filter((post) => post.id !== id);
      setPosts(postLists);
      navigateBack("/");
      // console.log(navigateBack);
    } catch (error) {
      setFetchError(`Erroe: ${error.message}`);
      navigateBack("/");
    }
  };

  return (
    <DataContext.Provider
      value={{
        title,
        setTitle,
        search,
        setSearch,
        navigateBack,
        searchResults,
        fetchError,
        setFetchError,
        posts,
        setPosts,
        loader,
        handleDelete,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
