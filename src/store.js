// resturcturing or refactor our blog using redux based package instead of useContext

import { createStore, action, thunk, computed } from "easy-peasy";
import apiPosts from "./api/posts";
// thunk will support asyncronous functions
// computed is for computed value of states

export default createStore({
  posts: [], // our state with initial value
  setPosts: action((state, payload) => {
    state.posts = payload;
  }),
  postTitle: "",
  setPostTitle: action((state, payload) => {
    state.postTitle = payload;
  }),
  postBody: "",
  setPostBody: action((state, payload) => {
    state.postBody = payload;
  }),
  editTitle: "",
  setEditTitle: action((state, payload) => {
    state.editTitle = payload;
  }),
  editBody: "",
  setEditBody: action((state, payload) => {
    state.editBody = payload;
  }),
  search: "",
  setSearch: action((state, payload) => {
    state.search = payload;
  }),
  searchResults: [],
  setSearchResults: action((state, payload) => {
    state.searchResults = payload;
  }),
  title: "",
  setTitle: action((state, payload) => {
    state.title = payload;
  }),
  fetchError: "",
  setFetchError: action((state, payload) => {
    state.fetchError = payload;
  }),
  loader: "",
  setLoader: action((state, payload) => {
    state.loader = payload;
  }),

  postCount: computed((state) => state.posts.length), // this will give us the number of posts in total

  getPostById: computed((state) => {
    return (id) => state.posts.find((post) => post.id.toString() === id);
  }), // gives us an id of a chosen element\post

  // thunk actions

  // add post
  createPost: thunk(async (actions, newPost, helpers) => {
    const { posts } = helpers.getState(); // now we have our post as whole
    try {
      // CRUD => CR == "POST"
      const response = await apiPosts.post("/posts", newPost);
      actions.setPosts([...posts, response.data]); // we cannot just write setState in easy-peasy we use actions. before our setState
      actions.setPostTitle("");
      actions.setPostBody("");
    } catch (error) {
      actions.setFetchError(`Erroe: ${error.message}`);
    }
  }),

  // delete post
  deletePost: thunk(async (actions, id, helpers) => {
    const { posts } = helpers.getState();
    try {
      await apiPosts.delete(`/posts/${id}`);
      actions.setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      actions.setFetchError(`Erroe: ${error.message}`);
    }
  }),

  // edit post
  editPost: thunk(async (actions, updatedPost, helpers) => {
    const { posts } = helpers.getState(); // should be called induvidually
    const { editTitle } = helpers.getState();
    const { editBody } = helpers.getState();
    const { id } = updatedPost; //

    try {
      const oldPost = posts.filter((e) => e.id === id);
      if (
        oldPost[0].title.trimEnd() === editTitle.trimEnd() &&
        oldPost[0].body.trimEnd() === editBody.trimEnd()
      )
        return;

      const response = await apiPosts.put(`/posts/${id}`, updatedPost);
      actions.setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      ); // mapping through our old array we check if id of our edited post is equal to id we clicked (which comes from our old posts Array). if true we replace that obj with our new updated obj else return olt obj itself
      // plus it automatically creates a new array instead of we creating by ourselves like [...posts, newSmth] then setState(that array)
      actions.setEditTitle("");
      actions.setEditBody("");
    } catch (error) {
      actions.setFetchError(`Erroe: ${error.message}`);
    }
  }),
});
