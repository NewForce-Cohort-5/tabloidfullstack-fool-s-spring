import React, { useState } from "react";

export const PostTagContext = React.createContext();

export const PostTagProvider = (props) => {
    const [postTags, setPostTags] = useState([]);

    const getAllTagsOnASinglePost = (postId) => {
        return fetch(`api/posttag/${postId}`)
        .then((res) => res.json())
        .then(setPostTags);
    };

    const addTagToPost = (postId) => {
        return fetch(`/api/posttag/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postId),
        })
            .then(getAllTagsOnASinglePost);
    };

    return (
        <PostTagContext.Provider value={{ postTags, getAllTagsOnASinglePost, addTagToPost }}>
            {props.children}
        </PostTagContext.Provider>
    );
}