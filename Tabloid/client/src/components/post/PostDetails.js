import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { PostTagList } from "../postTag/PostTagList";
import PostOptions from "./PostOptions";

const PostDetails = () => {

  const { singlePost, getPostById } = useContext(PostContext);

  const { id } = useParams();

  const navigate = useNavigate();

  const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;

  const manageTags = () => {
    navigate(`/posts/posttag/${id}`)
};

  useEffect(() => {
    getPostById(id);
  }, [id]);

  const viewComments = () => {
    navigate(`/posts/comments/${id}`)
  };

  //? Im rendering React fragment with a conditional inside of it so React doesn't... overReact when singlePost is undefined
  //? The conditional will let the component run it's useEffect when it detects the id in the params.. thankfully..
  //? This is typically what happens when you want to pass state from the context to the component rather than
  //? having a component state with the render where the changes are really going to take place
  //? React is first checking singlePost for the values THEN it will attempt to change
  //? only without the conditional it will throw an error because the singlePost is initially undefined
  
  return (<>
    {singlePost &&
    <Card>
          
      {singlePost.imageLocation && <CardImg src={singlePost.imageLocation} alt={singlePost.title} />}
    
      <CardBody>
         
        <p className="text-left px-2">
          <Link to={`/users/${singlePost.userProfileId}`} style={{display: "flex", flexDirection: "column"}}>
            {singlePost.userProfile.imageLocation && <img width="150" height="150" src={singlePost.userProfile.imageLocation} alt={singlePost.userProfile.fullName} style={{ border: "1px solid #ddd", borderRadius: "50%" }}/> }
            <span className="text-left px-2">{singlePost.userProfile.fullName}</span>
          </Link>
          {new Date(singlePost.publishDateTime).toDateString().slice(3)}
        </p>
                
        <p className="text-left px-2">
          <Link to={`/posts/${singlePost.id}`}>
            <strong>{singlePost.title}</strong>
          </Link>
        </p>
        
        <p className="text-left px-2">{singlePost.category.name}</p>
      <Button onClick= {() => viewComments()}>View Comments</Button>
      { currentUserId === singlePost.userProfileId && <PostOptions id={singlePost.id} /> }
      </CardBody>
      
      <p className="text-left px-4">{singlePost.content}</p>

      <PostTagList />

        {currentUserId === singlePost.userProfileId &&
            <div className="row text-left ml-4 mb-5">
                <Button onClick={() => manageTags()} className="btn btn-outline-primary bg-white text-primary btn-sm pb-2">Manage Tags</Button>
            </div>
        }
      
    </Card>}
  </>);
};

export default PostDetails;