import React, { useContext, useEffect, useState } from "react";
import {ListGroup} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import {Link } from "react-router-dom";
import "./Category.css";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useNavigate } from "react-router-dom";

//we're just using the Card component that comes with reactstrap to organize some of the category details.
export const Category = ({CategoryProp}) => {
    const {hardDeleteCategory } = useContext(CategoryContext); 
    
    const navigate = useNavigate();

    const onClickHandler = () => {
        let userinput = prompt("Are you sure you want to delete this? Y/N");
        if (userinput !== null && userinput.toUpperCase() === "Y" ){
        hardDeleteCategory(CategoryProp.id).then((c) => {
            
            navigate("/categories")})} 
            
    };


    return (
        
        <ListGroup.Item id={CategoryProp.id} className="category__flex-container" >
            <div> {CategoryProp.name}</div>
            
            <div> <Button variant="secondary" size="md" onClick={onClickHandler}> 
                Delete
             </Button></div>

            <div> <Button variant="secondary" size="md" onClick={() => navigate(`/categories/edit/${CategoryProp.id}`)}> 
                Edit
             </Button></div>
             
        </ListGroup.Item>
    )
}