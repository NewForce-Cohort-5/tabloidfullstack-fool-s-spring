import React, { useContext, useEffect } from "react";
import { TagContext } from "../../providers/TagProvider";
import { Tag } from "./Tag";

const TagList = () => {
    const { tags, getAllTags } = useContext(TagContext);

    useEffect(() => {
        getAllTags();
    }, []);

    return (
        <div className="container pt-5">
            <h1>Tags</h1>
            <p>
                <a class="btn btn-success text-light" asp-action="Create">New Tag</a>
            </p>
            <table class="table table-striped mt-3">
                <tbody>
                    {tags.map((tag) => (
                        <Tag key={tag.id} tagProp={tag} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TagList;