import React, { useState, createContext, useEffect, useContext } from "react";


export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([]);


    const apiUrl = "https://localhost:5001/api/Comment";

    const getCommentsByPostId = (postId) => {
        fetch(`${apiUrl}/getbypost/${postId}`, {
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