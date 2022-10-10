import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const trimmedTitle = post.title.split(" ").filter((e) => e !== "");

  return (
    <Link className="post_link" to={`/postpage/${post.id}`}>
      <div className="post">
        <h2>
          {trimmedTitle.length >= 5
            ? `${trimmedTitle.slice(0, 5).join(" ")} ...`
            : post.title}
        </h2>
        <p className="post_body">
          {post.body.length >= 110
            ? `${post.body.slice(0, 110)}...`
            : post.body}
        </p>
        <span className="post_date">{post.datetime}</span>
      </div>
    </Link>
  );
};

export default Post;
