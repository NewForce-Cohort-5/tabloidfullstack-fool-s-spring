import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const [tags, setTags] = useState([]);

    const getAllTags = () => {
        return fetch(`/api/tag`)
            .then((res) => res.json())
            .then(setTags);
    };

    const getTagById = (id) => {
        return fetch(`/api/tag/${id}`)
            .then((res) => res.json());
    };

    const addTag = (tag) => {
        return fetch(`/api/tag`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tag),
        }).then(getAllTags);
      };

    return (
        <TagContext.Provider value={{ tags, getAllTags, getTagById, addTag }}>
            {props.children}
        </TagContext.Provider>
    );
}