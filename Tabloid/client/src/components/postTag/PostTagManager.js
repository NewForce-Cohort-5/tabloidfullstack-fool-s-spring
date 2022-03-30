import React, { useContext, useEffect, useState } from "react"
import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom"
import { TagContext } from "../../providers/TagProvider";
import { PostTagContext } from "../../providers/PostTagProvider";
import { PostContext } from "../../providers/PostProvider";

export const PostTagManager = () => {
    const { tags, getAllTags } = useContext(TagContext)
    const { posts, getPostById } = useContext(PostContext)
    const { postTags, addTagToPost, getAllTagsOnASinglePost } = useContext(PostTagContext);

    const [ currentPostTags, setCurrentPostTags ] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getAllTags()
        .then((tagsRes) => {
            getAllTagsOnASinglePost(id)
            .then((postTagsRes) => {
                //debugger;
                const tempObj = {}
                for (const tag of tagsRes) {
                    //debugger;
                    tempObj[tag.id]=false
                } 
                for (const postTag of postTagsRes) {
                    tempObj[postTag.id]=true
                }
                //debugger;
                setCurrentPostTags(tempObj)
            })
        })
    }, [])

    const handleSavePostTags = (event) => {
        event.preventDefault()
        addTagToPost(id, currentPostTags)
            .then(() => navigate(`/posts/${id}`));
    }

    return (
        <>
        <div className="card m-5 p-3">
            <h3 className="text-center">Add tags to post:</h3>
            {/* Get name of post your adding tags to: */}
            {posts.filter(post => {
                return(
                    <h3 key={post.id} className="text-center"><em>{post.name}</em></h3>
                )
            })} 

            {/* Get a list of all available tags: */}
            {tags.map(tag => {
                return(
                    <div key={tag.id} className="mt-2 pl-3">
                        <input htmlFor="tagName" id="tagName" type="checkbox" defaultChecked={currentPostTags[tag.id]}></input>
                        <label name="tagName">&nbsp;{tag.name}</label>
                    </div>
                )
            }).sort()}

            <div className="form-group row col-sm-12 pt-3">
                <div className="col-sm-12">
                    <button type="submit" className="btn btn-success text-light" onClick={handleSavePostTags}>
                        Save
                    </button>
                </div>
            </div>
        </div>
        </>
    );

};