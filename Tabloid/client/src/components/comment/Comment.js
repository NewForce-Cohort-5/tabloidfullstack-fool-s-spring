import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Card,  CardTitle,  CardBody, Badge } from "reactstrap";


const Comment = ({ comment }) => {

var d = new Date(comment.createDateTime);
let createDate = d.toLocaleDateString("en-US");
    return (
    <>
        <Card className="m-4 p-2">
        <Badge>{createDate}</Badge>
        <CardTitle tag="h3">{comment.subject}</CardTitle>
        <CardBody>
            <p>{comment.title}</p>
            <p>{comment.content}</p>
            <p className="text-left">
            Commented by: <em>{comment.userProfile.displayName}</em>
            </p>
        </CardBody>
        </Card>
    </>
    );
};

export default Comment;