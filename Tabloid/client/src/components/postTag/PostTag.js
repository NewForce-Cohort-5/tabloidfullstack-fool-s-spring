import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { TagContext } from "../../providers/TagProvider";
import { useNavigate } from "react-router-dom"

export const PostTag = ({ postTag }) => {
    const { getAllTags, deleteTag } = useContext(TagContext);

    const navigate = useNavigate();

    const handleAddTagToPost = () => {
        navigate(`/posttags/add/${postTag.id}`)
    };
    
    const handleDeleteTagFromPost = () => {
        deletePostTag(postTag.id)
        .then(getAllTags);
    }
};

    return (
        <>
            <tr className="row-12">
                <td className="col-10 align-middle">
                    <h5>#{tag.name}</h5>
                </td>
                <td className="col-2 text-right">
                    <button type="button" className="btn btn-link" id="postTag.id" onClick={handleAddTagToPost}>
                        <FontAwesomeIcon icon={faCheckCircle} className="text-success"/>
                    </button>
                    <button type="button" className="btn btn-link" id="postTag.id" onClick={handleDeleteTagFromPost}>
                        <FontAwesomeIcon icon={faTimesCircle} className="text-danger"/>
                    </button>
                </td>  
            </tr>
        </>
    );
};
