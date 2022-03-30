import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";
import { PostTagContext } from "../../providers/PostTagProvider";

export const PostTagList = () => {
    const { tags, getAllTags } = useContext(TagContext)
    const { postTags, addPostTag, getAllTagsOnASinglePost, singlePost } = useContext(PostTagContext);

    // const [ postTag, setPostTag ] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    const manageTags = () => {
        navigate(`/posts/posttag/${id}`)
    };

    useEffect(() => {
        getAllTags().then(() => {
          getAllTagsOnASinglePost(id);
        })
    }, []);
   

    // get single post where postTag.postId === post.id, 
    // get all tags where postTag.tagId === tag.id, 
    // show all associated postTags in a list
    // manage Tags for a post with a button that does what? navigates to another page or shows an edit form within this PostTag or within Post Details? 

    return (
     <>
        <div className="row-12 container p-3 mb-3 ml-2">
            <div className="row text-left ">
                <div className="col-sm-2 mx-2 my-1">
                    <p><b>Tags: </b></p>
                </div>
                {postTags.map(tag => {
                    return(
                    <div key={tag.id} className="col-sm-3 text-left">
                        <p className="p-1 mt-2 btn-sm bg-light text-dark text-center">
                            {tag.name}
                        </p>
                    </div>
                    )
                })}
            </div>
            { currentUserId === singlePost?.userProfileId &&
            <div className="row text-left ml-1">
                <Button onClick={() => manageTags()} className="btn btn-outline-primary bg-white text-primary btn-sm pb-2">Manage Tags</Button>
            </div>}

        </div>

     </>
    )
};


