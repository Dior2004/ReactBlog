import { React, useState, useContext } from "react";
import { FiPlus } from "react-icons/fi";
import DataContext from "../context/DataContext";
import { format } from "date-fns";
import apiPosts from "../api/posts";

const NewPost = () => {
  const { posts, setPosts, setFetchError, navigateBack } =
    useContext(DataContext);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  // CRUD with axios

  //  create post function

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postBody.length < 3) return;

    // window.location.reload(true);

    const newPostId = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), `MMMM dd, yyyy pp`);
    const newPost = {
      id: newPostId,
      title: postTitle
        .split(" ")
        .filter((e) => e !== "")
        .join(" "),
      body: postBody
        .split(" ")
        .filter((e) => e !== "")
        .join(" "),
      datetime: datetime,
    };
    try {
      // axios CRUD => CR == "POST"
      const response = await apiPosts.post("/posts", newPost);
      const newAllPosts = [...posts, response.data];
      setPosts(newAllPosts);
      setPostTitle("");
      setPostBody("");
      navigateBack("/");
    } catch (error) {
      setFetchError(`Erroe: ${error.message}`);
      navigateBack("/");
    }
  };

  return (
    <main className="NewPost">
      <div className="wrap">
        <h2>Create New Posts</h2>
        <form
          autoComplete="off"
          className="cr_new_post"
          onSubmit={handleSubmit}
        >
          <label htmlFor="postTitle">Post Title:</label>
          <input
            id="postTitle"
            type="text"
            autoFocus
            required
            placeholder="Give it a Title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value.trimStart())}
          />
          <label htmlFor="postBody">Post Content:</label>
          <textarea
            id="postBody"
            placeholder="Compose a Post (at least 3 letters)"
            required
            value={postBody}
            onChange={(e) => setPostBody(e.target.value.trimStart())}
          ></textarea>

          <button
            className={
              postTitle.length && postBody.length >= 3
                ? "create_post_button_okey"
                : "create_post_button"
            }
            type="submit"
          >
            <FiPlus style={{ marginBottom: -1.5 }} /> Create
          </button>
        </form>
      </div>
    </main>
  );
};

export default NewPost;
