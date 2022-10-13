import { React, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import Loader from "./Loader";
import { format } from "date-fns";
import { useStoreState, useStoreActions } from "easy-peasy";

const EditPost = () => {
  const navigateBack = useNavigate();

  const posts = useStoreState((state) => state.posts);
  const loader = useStoreState((state) => state.loader);
  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);

  const editPost = useStoreActions((actions) => actions.editPost); // function that adds new post
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle); // it is used inside of the form
  const setEditBody = useStoreActions((actions) => actions.setEditBody); // it is used inside of the form
  const deletePost = useStoreActions((actions) => actions.deletePost); // delete function
  const getPostById = useStoreState((state) => state.getPostById);

  const { id } = useParams();
  const postArr = getPostById(id);

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

    const oldPost = posts.filter((e) => e.id === id);
    if (
      oldPost[0].title.trimEnd() === editTitle.trimEnd() &&
      oldPost[0].body.trimEnd() === editBody.trimEnd()
    )
      return;

    editPost(updatedPost);
    navigateBack("/");
  };

  const handleCancel = (id) => {
    setEditTitle("");
    setEditBody("");
    navigateBack(`/postpage/${id}`);
  };

  const handleDelete = (id) => {
    // we dont need async because in easy-peasy store.js we have already used it
    deletePost(id); // function id is a parameter
    navigateBack("/");
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
