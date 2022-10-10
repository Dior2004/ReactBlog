import "./css/App.css";
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
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <DataProvider>
        {/* everything wich should recieve props must be wrapped within DataProvider */}
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
      </DataProvider>
      <Footer />
    </div>
  );
}

export default App;
