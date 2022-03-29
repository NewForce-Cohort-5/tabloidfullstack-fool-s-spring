import React, { useState } from "react";

export const PostTagContext = React.createContext();

export const PostTagProvider = (props) => {
    const [postTags, setPostTags] = useState([]);

    const getAllTagsOnASinglePost = (postId) => {
        return fetch(`api/post/${postId}`)
        .then((res) => res.json())
        .then(setPostTags);
    };

    const addTagToPost = (postTag) => {
        return fetch(`/api/${postTag}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postTag),
        })
            .then(getAllTagsOnASinglePost);
    };

    return (
        <PostTagContext.Provider value={{ postTags, getAllTagsOnASinglePost, addTagToPost }}>
            {props.children}
        </PostTagContext.Provider>
    );
}