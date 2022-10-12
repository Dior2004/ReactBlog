import "./css/App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import EditPost from "./components/EditPost";
import About from "./components/About";
import Missing from "./components/Missing";
import apiPosts from "./api/posts";
import { useStoreActions } from "easy-peasy";

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const setLoader = useStoreActions((actions) => actions.setLoader);
  const setFetchError = useStoreActions((actions) => actions.setFetchError);

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
  }, [setPosts, setLoader, setFetchError]);

  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/post" element={<NewPost />} />
        <Route path="/postpage/:id" element={<PostPage />} />
        <Route path="/postedit/:id" element={<EditPost />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
