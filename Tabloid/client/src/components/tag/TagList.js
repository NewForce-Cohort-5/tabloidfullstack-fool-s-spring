import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TagContext } from "../../providers/TagProvider";
import { Tag } from "./Tag";

const TagList = () => {
    const { tags, getAllTags } = useContext(TagContext);

    const navigate = useNavigate();

    useEffect(() => {
        getAllTags();
    }, []);

    const handleCreateTag = () => {
        navigate("/tags/add")
    };

    return (
        <div className="container pt-5">
            <h1>Tags</h1>
            <button className="btn btn-success text-light mb-3" onClick={handleCreateTag}>
                New Tag
            </button>
            <table className="table table-striped mt-3">
                <tbody>
                    {tags.map((tag) => (
                        <Tag key={tag.id} tagProp={tag} />
                    )).sort()}
                </tbody>
            </table>
        </div>
    );
};

export default TagList;