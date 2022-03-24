import React, { useState, createContext } from "react";


export const CommentContext = createContext();

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([]);


    const apiUrl = "https://localhost:5001/api/Comment";

    const getCommentsByPostId = (postId) => {
        fetch(`/api/Comment/getbypost/${postId}`, {
            method: "GET",
        }).then((res) => res.json())

        .then(setComments);
    };
    return (
    <CommentContext.Provider
        value={{
        getCommentsByPostId,
        comments,
        }}
    >
        {props.children}
    </CommentContext.Provider>
    );
};