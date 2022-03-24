import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { PostContext } from "../../providers/PostProvider";
import { Container, Table } from "reactstrap";
import Comment from "./Comment";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";

const CommentList = () => {
const { comments, getCommentsByPostId } = useContext(CommentContext);
const { id } = useParams();
useEffect(() => {
    getCommentsByPostId(id);
}, []);

const {singlePost} = useContext(PostContext);

return (
    <>
    {comments.length > 0 ? 
        <>
        <Container className="justify-content-center" fluid={true}>
            <h2>{singlePost.title}</h2>
            <Link to={`/posts/${id}`}>&larr; Return to Post</Link>
                {comments.map((comment, index) => {
                comment.listIndex = index + 1;
                return <Comment key={comment.id} comment={comment} />;
                })}

        </Container>
        </>
: <p className="text-center">No comments yet!</p>
    }
    </>
);
};

export default CommentList;