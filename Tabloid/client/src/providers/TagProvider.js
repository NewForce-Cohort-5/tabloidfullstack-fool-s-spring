import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const [tags, setTags] = useState([]);

    const getAllTags = () => {
        return fetch(`/api/tag`)
            .then((res) => res.json())
            .then((tagsRes) => {
                setTags(tagsRes)
                return tagsRes
            });
    };

    const getTagById = (tag) => {
        return fetch(`/api/tag/${tag.id}`)
            .then((res) => res.json());
    };

    const addTag = (tag) => {
        return fetch(`/api/tag`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tag),
        })
            .then(getAllTags);
    };

    const deleteTag = (tagId) => {
        return fetch(`/api/tag/${tagId}`, {
            method: "DELETE"
        })
            .then(getAllTags);
    };

    const updateTag = (tag) => {
        return fetch(`/api/tag/${tag.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tag),
        })
            .then(getAllTags);
    };

    return (
        <TagContext.Provider value={{ tags, getAllTags, getTagById, addTag, deleteTag, updateTag }}>
            {props.children}
        </TagContext.Provider>
    );
}