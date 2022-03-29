import React, { useContext, useEffect, useState } from "react"
import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom"
import { TagContext } from "../../providers/TagProvider";
import { PostTagContext } from "../../providers/PostTagProvider";

export const PostTagManager = () => {
    const { tags, getAllTags } = useContext(TagContext)
    const { postTags, addPostTag, getAllTagsOnASinglePost } = useContext(PostTagContext);

    const [ postTag, setPostTag ] = useState({});
    const { postId, tagId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getAllTags()
    }, [])

    const handleSavePostTags = (event) => {
        event.preventDefault()
        addPostTag(tagId)
            .then(() => navigate("/{postId}"));
    }

    return (
        <>
            <h3>Add tags to "name of post here"</h3>
            {/* List of all tags: */}
                {tags.map(tag => {
                    return `
                        <div>
                            <p>#{tag.name}</p>
                            
                        </div>
                    `
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