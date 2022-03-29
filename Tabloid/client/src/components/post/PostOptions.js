import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const PostOptions = ({ id }) => {

  const { deletePost } = useContext(PostContext);

  const navigate = useNavigate();

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete post?')) {
      deletePost(postId).then(() => navigate("/myposts"));
    }
  };

  return (
    <>
      {' '}
      <Link to={`/posts/${id}/edit`} className="btn btn-warning">
        <FontAwesomeIcon icon={faPencilAlt} />
      </Link>
      {' '}
      <Button className="btn btn-danger" onClick={() => handleDelete(id)} >
        <FontAwesomeIcon icon={faTrashAlt} />
      </Button>
    </>
  );
};

export default PostOptions;