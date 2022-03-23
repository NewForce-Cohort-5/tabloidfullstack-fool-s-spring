import React from "react";

export const Tag = ({ tagProp }) => {
    return (
        <>
            <tr class="row-12">
                <td class="col-10 align-middle">
                    <h5>#{tagProp.name}</h5>
                </td>
                <td class="col-2">
                </td>
            </tr>
        </>
    );
};