import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";

const PostList = () => {
  
  const { posts, getMyPosts } = useContext(PostContext);

  const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));

  useEffect(() => {
    getMyPosts(currentUser.id);
  }, []);

  return (
    <div className="container">
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default PostList;