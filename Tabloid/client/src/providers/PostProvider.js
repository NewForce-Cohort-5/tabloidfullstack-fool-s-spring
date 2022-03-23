import React, { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
  
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    return fetch('/api/post/')
      .then(r => r.json())
      .then(setPosts);
  };

  const getMyPosts = (id) => {
    return fetch(`/api/post/myposts?id${id}`)
      .then(r => r.json())
      .then(setPosts);
  };
  
  return (
    <PostContext.Provider value={{
      posts, getAllPosts, getMyPosts
    }}>
      {props.children}
    </PostContext.Provider>
  );
};