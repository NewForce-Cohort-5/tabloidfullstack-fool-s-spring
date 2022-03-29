import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";
import { PostTagContext } from "../../providers/PostTagProvider";

export const PostTagList = () => {
    const { tags, getAllTags } = useContext(TagContext)
    const { postTags, addPostTag, getAllTagsOnASinglePost } = useContext(PostTagContext);

    const [ postTag, setPostTag ] = useState({});
    const { postId } = useParams();
    const navigate = useNavigate();

    const manageTags = () => {
         navigate(`/posts/posttags/${postId}`)
    };

    useEffect(() => {
        getAllTags()
        getAllTagsOnASinglePost(postId);
    }, []);
   

    // get single post where postTag.postId === post.id, 
    // get all tags where postTag.tagId === tag.id, 
    // show all associated postTags in a list
    // manage Tags for a post with a button that does what? navigates to another page or shows an edit form within this PostTag or within Post Details? 

    return (
     <>
        <hr />
        <div className="row">
            <h4 className="col-2">Tags: </h4>
            <div className="col">
                    {tags.filter(tag => tag.Id === postTag.tagId).map(tag => {
                        return  `<p className="col p-2 m-2 bg-light text-dark>{tag.name}</p>`
                    }).sort()}
            </div>
            <div className="col">
                <Button onClick={() => manageTags()} className="btn btn-secondary btn-sm ml-2">Manage Tags</Button>
            </div>
        </div>
     </>
    )
};


