import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardImg, CardBody } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";

const PostDetails = () => {

  const { post, getPostById } = useContext(PostContext);

  const { id } = useParams();

  useEffect(() => {
    getPostById(id);
  }, []);

  return (
    <Card className="mt-4">
          
      <CardImg src={post.imageLocation} alt={post.title} />
    
      <CardBody>
         
        <p className="text-left px-2">
          <Link to={`/users/${post.userProfileId}`} style={{display: "flex", flexDirection: "column"}}>
            <img width="150" height="150" src={post.userProfile.imageLocation} alt={post.userProfile.fullName} style={{ border: "1px solid #ddd", borderRadius: "50%" }}/> 
            <span className="text-left px-2">{post.userProfile.fullName}</span>
          </Link>
        </p>
                
        <p className="text-left px-2">
          <Link to={`/posts/${post.id}`}>
            <strong>{post.title}</strong>
          </Link>
        </p>
        
        <p className="text-left px-2">{post.category.name}</p>

      </CardBody>
      
      <p className="text-left px-4">{post.content}</p>
      
    </Card> 
  );
};

export default PostDetails;