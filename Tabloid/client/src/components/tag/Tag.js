import React, { useContext } from "react";
import { TagContext } from "../../providers/TagProvider";

export const Tag = ({ tagProp }) => {
    const { getAllTags, deleteTag } = useContext(TagContext);
 
    const handleDelete = () => {
        deleteTag(tagProp.id)
        .then(getAllTags);
    }
    //if confirmDelete button is clicked ask if they're sure to delete, then handleDelete button is clicked to confirm then "deleteTag(tagProp.id).then(getAllTags);" then getAllTags
    const confirmDelete = () => {
        return (
            <div className="modal fade" tabindex="-1" role="dialog" id="myModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete #{tagProp.name}?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-success" id="tagProp.id" onClick={handleDelete}>
                            <span>Yes, Delete</span>
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
   

    return (
        <>
            <tr className="row-12">
                <td className="col-10 align-middle">
                    <h5>#{tagProp.name}</h5>
                </td>
                <td className="col-2">

                    <button type="button" className="btn btn-link" id="tagProp.id" data-toggle="modal" data-target="#myModal" onClick={confirmDelete}>
                        <span>&#128465;</span>
                    </button>
                    {/* <button type="button" className="btn btn-link" id="tagProp.id" onClick={handleDelete}>
                        <span>Yes, Delete</span>
                    </button> */}
                </td>
            </tr>
        </>
    );
};