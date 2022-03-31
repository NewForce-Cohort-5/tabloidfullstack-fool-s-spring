import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { TagContext } from "../../providers/TagProvider"

export const TagForm = () => {
    const { addTag, getAllTags } = useContext(TagContext);

    const [tag, setTags] = useState({
        name: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        getAllTags()
    }, [])

    const handleControlledInputChange = (event) => {
        const newTag = { ...tag }
        newTag[event.target.id] = event.target.value
        setTags(newTag)
    }

    const handleSavePost = (event) => {
        event.preventDefault()
        addTag(tag)
            .then(() => navigate("/tags"));
    }

    return (
        <div className="m-5">
            <div className="col-md-10 mx-auto">
                <form className="card bg-light col-sm-12 mx-auto pt-3 pr-3">
                    <div className="form-group row col-md-12 mx-auto mb-3">
                        <label htmlFor="name" className="col-lg-2 col-form-label text-left">Tag Name:</label>
                        <div className="col-lg-10">
                            <input type="text" className="form-control" id="name" placeholder="Enter new tag name here..."
                                onChange={handleControlledInputChange}
                                value={tag.name} />
                        </div>
                    </div>
                    <div className="form-group row col-sm-12 mx-auto mb-3">
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-success text-light" onClick={handleSavePost}>
                                Save
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
