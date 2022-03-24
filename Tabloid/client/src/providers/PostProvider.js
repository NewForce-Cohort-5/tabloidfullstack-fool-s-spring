import React, { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
  
  const [posts, setPosts] = useState([]);

  const [singlePost, setSinglePost] = useState();

  const getAllPosts = () => {
    return fetch('/api/post/')
      .then(r => r.json())
      .then(setPosts);
  };

  const getMyPosts = (id) => {
    return fetch(`/api/post/myposts?id=${id}`)
      .then(r => r.json())
      .then(setPosts);
  };

  const getPostById = (id) => {
    return fetch(`/api/post/${id}`)
      .then(r => r.json())
      .then(setSinglePost);
  };
  
  return (
    <PostContext.Provider value={{
      posts, getAllPosts, getMyPosts, singlePost, getPostById
    }}>
      {props.children}
    </PostContext.Provider>
  );
};