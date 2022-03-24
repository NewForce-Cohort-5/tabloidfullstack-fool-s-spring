import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { TagContext } from "../../providers/TagProvider"

export const TagForm = () => {
    const { updateTag, getTagById } = useContext(TagContext);

    const [tag, setUpdatedTag] = useState({
        name: ""
    });

    const tagId = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        getTagById(tagId)
    }, [])

    const handleControlledInputChange = (event) => {
        const singleUpdatedTag = { ...tag }
        singleUpdatedTag[event.target.id] = event.target.value
        setUpdatedTag(singleUpdatedTag)
    }

    const handleUpdatePost = (event) => {
        event.preventDefault()
        updateTag({
            id: tag.id,
            title: tag.name
        })
            .then(() => navigate("/tags"));
    }

    return (
        <div className="m-5">
            <div className="col-md-10 mx-auto">
                <form className="card bg-light col-sm-12 mx-auto pt-3 pr-3">
                    <div className="form-group row col-md-12 mx-auto mb-3">
                        <label htmlFor="name" className="col-lg-2 col-form-label text-left">Tag Name:</label>
                        <div className="col-lg-10">
                            <input type="text" className="form-control" id="name"
                                onChange={handleControlledInputChange}
                                value={tag.name} />
                        </div>
                    </div>
                    <div className="form-group row col-sm-12 mx-auto mb-3">
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-success text-light" onClick={handleUpdatePost}>
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="text-center mt-2 mx-auto">
                <Link to="/tags" className="nav-link">
                    Return to List
                </Link>
            </div>
        </div>
    )
}

export default TagForm;
