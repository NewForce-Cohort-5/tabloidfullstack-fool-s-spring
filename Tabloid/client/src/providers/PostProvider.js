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

  const getPublishedPostById = (id) => {
    return fetch(`/api/post/${id}`)
      .then(r => r.json())
      .then(r => {
        if (r.status) {
          window.history.back();
        } else {
          setSinglePost(r);
        }
      });
  };

  const getPostById = (id) => {
    return fetch(`/api/post/mine/${id}`)
      .then(r => r.json())
      .then((post) => {
        const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;
        if (post.userProfileId === currentUserId) {
          setSinglePost(post);
          return post;
        }
        return getPublishedPostById(post.id);
      });
      
  };

  const addNewPost = (post) => {
    return fetch('/api/post', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    }).then(r => r.json());
  };

  const editPost = (post) => {
    return fetch(`/api/post/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    }).then(r => r.json());
  };
  
  return (
    <PostContext.Provider value={{
      posts, getAllPosts, getMyPosts, singlePost, getPostById, getPublishedPostById, addNewPost, editPost
    }}>
      {props.children}
    </PostContext.Provider>
  );
};