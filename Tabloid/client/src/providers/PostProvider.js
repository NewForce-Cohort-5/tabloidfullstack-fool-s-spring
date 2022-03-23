import React, { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
  
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    return fetch('/api/post/')
      .then(r => r.json())
      .then(setPosts);
  };
  
  return (
    <PostContext.Provider value={{
      posts, getAllPosts
    }}>
      {props.children}
    </PostContext.Provider>
  );
};