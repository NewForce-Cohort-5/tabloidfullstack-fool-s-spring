import React, { useState } from "react";

export const PostTagContext = React.createContext();

export const PostTagProvider = (props) => {
    const [postTags, setPostTags] = useState([]);

    const getAllTagsOnASinglePost = (postId) => {
        return fetch(`/api/posttag?postId=${postId}`)
        .then((res) => res.json())
        .then((postTagsRes) => {
            setPostTags(postTagsRes)
            return postTagsRes
        });
    };

    const addTagToPost = (postId, tags) => {
        return fetch(`/api/posttag?postId=${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tags), 
        })
            .then(() => getAllTagsOnASinglePost(postId));
    };

    return (
        <PostTagContext.Provider value={{ postTags, getAllTagsOnASinglePost, addTagToPost }}>
            {props.children}
        </PostTagContext.Provider>
    );
}