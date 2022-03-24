import React, { useContext } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap/lib/Button";

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
            <>
            </>
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
                    

                    <div>
                        <Button color="danger" onClick={function noRefCheck(){}}>
                            Click Me
                        </Button>
                        <Modal fade={false} toggle={function noRefCheck(){}}>
                            <ModalHeader toggle={function noRefCheck(){}}>
                                Confirm Delete
                            </ModalHeader>
                            <ModalBody>
                                Are you sure you want to delete #{tagProp.name}?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={function noRefCheck(){}}>
                                    Yes, Delete
                                </Button>
                                {' '}
                                <Button onClick={function noRefCheck(){}}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </td>
            </tr>
        </>
    );
};