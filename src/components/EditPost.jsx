import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import Loader from "./Loader";
import { useContext } from "react";
import DataContext from "../context/DataContext";
import { format } from "date-fns";
import apiPosts from "../api/posts";

const EditPost = () => {
  const { posts, setPosts, handleDelete, navigateBack, loader, setFetchError } =
    useContext(DataContext);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { id } = useParams();
  const postArr = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (postArr) {
      setEditTitle(postArr.title);
      setEditBody(postArr.body);
    }
  }, [postArr, setEditBody, setEditTitle]);

  // edit axios CRUD => U == "PATCH" but we use "PUT" instead bcoz we are replaceing the whole array

  const handleEdit = async (id) => {
    if (editBody.trimEnd().length < 3 || editTitle.trimEnd().length < 1) return;

    const datetime = format(new Date(), `MMMM dd, yyyy pp`);
    const updatedPost = {
      id: id,
      title: editTitle
        .split(" ")
        .filter((e) => e !== "")
        .join(" "),
      body: editBody
        .split(" ")
        .filter((e) => e !== "")
        .join(" "),
      datetime: datetime,
    };

    try {
      const oldPost = posts.filter((e) => e.id === id);
      if (
        oldPost[0].title.trimEnd() === editTitle.trimEnd() &&
        oldPost[0].body.trimEnd() === editBody.trimEnd()
      )
        return;

      const response = await apiPosts.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      ); // mapping through our old array we check if id of our edited post is equal to id we clicked (which comes from our old posts Array). if true we replace that obj with our new updated obj else return olt obj itself
      // plus it automatically creates a new array instead of we creating by ourselves like [...posts, newSmth] then setState(that array)
      setEditTitle("");
      setEditBody("");
      navigateBack("/");
    } catch (error) {
      setFetchError(`Erroe: ${error.message}`);
      navigateBack("/");
    }
  };

  const handleCancel = (id) => {
    setEditTitle("");
    setEditBody("");
    navigateBack(`/postpage/${id}`);
  };

  return (
    <main className="EditPost">
      {loader ? (
        <div className="wrap">
          {postArr && (
            <form onSubmit={(e) => e.preventDefault()}>
              <textarea
                className="edit_title"
                required
                placeholder="Should have a title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              ></textarea>
              <textarea
                autoFocus
                className="edit_body"
                required
                placeholder="Post should be at least 3 letters"
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
              >
                {}
              </textarea>
              <div className="btns">
                <button
                  type="submit"
                  className={
                    editBody.trimEnd().length >= 3 &&
                    editTitle.trimEnd().length &&
                    (postArr.title !== editTitle.trimEnd() ||
                      postArr.body !== editBody.trimEnd())
                      ? "edit_post_button"
                      : "edit_button_not_ok"
                  }
                  onClick={() => handleEdit(postArr.id)}
                >
                  <FiEdit3 style={{ marginBottom: -1.5 }} /> Edit
                </button>
                <button
                  type="button"
                  className="cancel_post_button"
                  onClick={() => handleCancel(postArr.id)}
                >
                  <MdOutlineCancel style={{ marginBottom: -1.5 }} /> Cancel
                </button>
                <button
                  type="button"
                  className="delete_post_button"
                  onClick={() => handleDelete(postArr.id)}
                >
                  <FiTrash2 style={{ marginBottom: -1.5 }} /> Delete
                </button>
              </div>
            </form>
          )}
          {!postArr && (
            <>
              <h2>Post isn't found</h2>
              <p className="post_body">We feel sorry 😞</p>
              <p>
                Visit our{" "}
                <Link to="/">
                  <b style={{ color: "dodgerblue" }}>Home Page.</b>
                </Link>
              </p>
            </>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default EditPost;
