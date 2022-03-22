import React from "react";
import { Card, CardBody } from "reactstrap";

export const TagCard = ({ tagProp }) => {
    return (
        <Card className="m-4">
            <CardBody>
                <h4>{tagProp.name}</h4>
            </CardBody>
        </Card>
    );
};