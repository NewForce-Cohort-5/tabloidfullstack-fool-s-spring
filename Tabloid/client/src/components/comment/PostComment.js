import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
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

return (
    <>
    {comments.length > 0 ? 
        <>
        <Container className="justify-content-center" fluid={true}>
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