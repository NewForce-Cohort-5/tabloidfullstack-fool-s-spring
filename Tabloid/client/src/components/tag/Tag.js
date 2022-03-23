import React from "react";

export const Tag = ({ tagProp }) => {
    return (
        <>
            <tr className="row-12">
                <td className="col-10 align-middle">
                    <h5>#{tagProp.name}</h5>
                </td>
                <td className="col-2">
                </td>
            </tr>
        </>
    );
};