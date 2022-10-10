import React from "react";
import { FiTrash2, FiEdit3 } from "react-icons/fi";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useParams, Link } from "react-router-dom";
import Loader from "./Loader";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const PostPage = () => {
  const { loader, posts, handleDelete } = useContext(DataContext);

  // const id = useParams(); /* useParams gives us an array like {id: "2"} 2 is in string */ and this 2 came from browser's searchbar (localhost:3000/post/{anything})

  const { id } = useParams();
  // console.log(id); // typeof string

  const chosenPost = posts.find((post) => post.id.toString() === id);
  // console.log(chosenPost); // if finds returns that object but if not returns undefined

  return (
    <main className="PostPage">
      <div className="wrap">
        {loader ? (
          chosenPost ? (
            <>
              <h2>{chosenPost.title}</h2>
              <p className="post_body"> {chosenPost.body}</p>
              <span className="post_date">{chosenPost.datetime}</span>
              <br />
              <Link to={`/postedit/${chosenPost.id}`}>
                <button className="edit_post_button">
                  <FiEdit3 style={{ marginBottom: -1.5 }} /> Edit
                </button>
              </Link>
              <Link to="/">
                <button className="cancel_post_button">
                  <RiArrowGoBackLine style={{ marginBottom: -1.5 }} /> Back
                </button>
              </Link>
              <button
                onClick={() => handleDelete(chosenPost.id)}
                className="delete_post_button"
              >
                <FiTrash2 style={{ marginBottom: -1.5 }} /> Delete
              </button>
            </>
          ) : (
            <>
              <h2>Post isn't found</h2>
              <p className="post_body">Well, that is disappointing 😞</p>
              <p>
                Visit our{" "}
                <Link to="/">
                  <b style={{ color: "dodgerblue" }}>Home Page.</b>
                </Link>
              </p>
            </>
          )
        ) : (
          <Loader />
        )}
      </div>
    </main>
  );
};

export default PostPage;
