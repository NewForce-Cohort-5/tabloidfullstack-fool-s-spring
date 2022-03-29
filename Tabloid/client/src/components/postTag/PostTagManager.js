import React, { useContext, useEffect, useState } from "react"
import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom"
import { TagContext } from "../../providers/TagProvider";
import { PostTagContext } from "../../providers/PostTagProvider";

export const PostTagManager = () => {
    const { tags, getAllTags } = useContext(TagContext)
    const { postTags, addPostTag, getAllTagsOnASinglePost } = useContext(PostTagContext);

    const [ currentPostTags, setCurrentPostTags ] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getAllTags()
        .then(() => {
            getAllTagsOnASinglePost(id)
            .then(() => {
                //debugger;
                const tempObj = {}
                for (const tag of tags) {
                    tempObj[tag.id]=false
                } 
                for (const postTag of postTags) {
                    tempObj[postTag.tagId]=true
                }
                debugger;
                setCurrentPostTags(tempObj)
            })
        })
    }, [])

    const handleSavePostTags = (event) => {
        event.preventDefault()
        addPostTag(id)
            .then(() => navigate("/{postId}"));
    }

    return (
        <>
            <h3>Add tags to "name of post here"</h3>
            {/* List of all tags: */}
                {tags.map(tag => {
                    return(
                        <div>
                            <input type="checkbox" checked={currentPostTags[tag.name]}></input>
                            <label key={tag.id}>&nbsp;{tag.name}</label>
                            
                        </div>
                    )
                }).sort()
                }
            <div className="form-group row col-sm-12 mx-auto mb-3">
                <div className="col-sm-12">
                    <button type="submit" className="btn btn-success text-light" onClick={handleSavePostTags}>
                        Save
                    </button>
                </div>
            </div>
        </>
    );

};