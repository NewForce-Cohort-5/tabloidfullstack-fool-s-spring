import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";

const PostList = () => {
  
  const { posts, getAllPosts } = useContext(PostContext);


  useEffect(() => {
    getAllPosts();
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