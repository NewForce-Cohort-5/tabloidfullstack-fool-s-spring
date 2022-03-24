import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { TagContext } from "../../providers/TagProvider";
import { useNavigate } from "react-router-dom"

export const Tag = ({ tagProp }) => {
    const { getAllTags, deleteTag } = useContext(TagContext);

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/tags/edit/")
    };
    
    const handleDelete = () => {
        var confirmDelete = window.confirm("Are you sure you want to delete the tag: " + (tagProp.name) + "?")
        if (confirmDelete) {
            deleteTag(tagProp.id)
            .then(getAllTags);;
        } else {
            getAllTags();
        };
        
        //Use this code if you're doing a straight delete without a confirmation window:
        // const handleDelete = () => {
            //     deleteTag(tagProp.id)
            //     .then(getAllTags);
            // }
    };

    return (
        <>
            <tr className="row-12">
                <td className="col-10 align-middle">
                    <h5>#{tagProp.name}</h5>
                </td>
                <td className="col-2 text-right">
                    <button type="button" className="btn btn-link" id="tagProp.id" onClick={handleEdit}>
                        <FontAwesomeIcon icon={faPencilAlt} className="text-secondary"/>
                    </button>
                    <button type="button" className="btn btn-link" id="tagProp.id" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrashAlt} className="text-secondary"/>
                    </button>
                </td>  
            </tr>
        </>
    );
};
