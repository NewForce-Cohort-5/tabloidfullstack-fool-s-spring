import React from "react";
import { Card, CardBody } from "reactstrap";

export const Tag = ({ tagProp }) => {
    return (
        <>
            <tr class="row-12">
                <td class="col-10 align-middle">
                    <h5>{tagProp.name}</h5>
                </td>
                <td class="col-2">
                    {/* <a asp-action="Edit" asp-route-id="tag.Id" class="btn btn-outline-primary mx-1" title="Edit">
                        <i class="fas fa-pencil-alt"></i>
                    </a>
                    <a asp-action="Delete" asp-route-id="tag.Id" class="btn btn-outline-primary mx-1" title="Delete">
                        <i class="fas fa-trash"></i>
                    </a> */}
                </td>
            </tr>
        </>
    );
};